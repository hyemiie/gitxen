"use client";
import Head from "next/head";
import { useEffect, useState } from "react";
import {
  AiOutlinePlus,
  AiOutlineSend,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineMenu,
} from "react-icons/ai";
import "./demo.css";
import axios from "axios";
import Addnew from "./Addnew";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";

export default function Home() {
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [visibility, setVisibility] = useState(true);
  const [userID, setUserID] = useState("");
  const [loading, setLoading] = useState(false);
  const [resultLoading, setResultLoading] = useState(false);
  const [error, setError] = useState(null);
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hello! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [repo, setRepo] = useState("");
  const [showAddRepo, setShowAddRepo] = useState(false);
  const [chatHistory, setChatHistory] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileOverlay, setShowMobileOverlay] = useState(false);

  const steps = ["Cloning...", "Analyzing...", "Checking...", "Thinking..."];
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    if (resultLoading) {
      let i = 0;
      const interval = setInterval(() => {
        if (i < steps.length - 1) {
          i++;
          setStepIndex(i);
        }
      }, 1500); // 1.5s per step
      return () => clearInterval(interval);
    } else {
      setStepIndex(0);
    }
  }, [resultLoading]);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth <= 768) {
        setVisibility(false);
      } else {
        setVisibility(true);
        setShowMobileOverlay(false);
      }
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      setShowMobileOverlay(!showMobileOverlay);
    } else {
      setVisibility(!visibility);
    }
  };

  const closeMobileSidebar = () => {
    if (isMobile) {
      setShowMobileOverlay(false);
    }
  };

  const send_message = async () => {
    setResultLoading(true)
    if (!input.trim() || !repo) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    const currentInput = input;
    setInput("");

    if (activeChat) {
      await saveChatMessage(activeChat.id, "user", currentInput);
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/embed-repo", {
        repo_path: repo,
        query: currentInput,
      });

      const summary = response.data.result.summary;
      const aiMessage = { sender: "ai", text: summary };

      setMessages((prev) => [...prev, aiMessage]);
      setResultLoading(false);

      if (activeChat) {
        await saveChatMessage(activeChat.id, "ai", summary);
      }
    } catch (error) {
      setResultLoading(false);
      console.error("Error sending message:", error);
      const errorMessage = {
        sender: "ai",
        text: "⚠️ Something went wrong while processing your request.",
      };
      setMessages((prev) => [...prev, errorMessage]);

      if (activeChat) {
        await saveChatMessage(activeChat.id, "ai", errorMessage.text);
      }
    }
  };

  const saveChatMessage = async (repoId, sender, messageText) => {
    const user_id = parseInt(userID);

    try {
      const response = await axios.post(
        "https://git-chat.zeabur.app/chat/add",
        {
          user_id: user_id,
          repo_id: repoId,
          sender: sender,
          message_text: messageText,
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error adding message:", error);
      console.warn("Chat message not saved, but continuing...");
    }
  };

  const loadChatHistory = async (repoId) => {
    try {
      const response = await axios.post(
        "https://git-chat.zeabur.app/chat/list",
        {
          repo_id: parseInt(repoId),
        }
      );

      if (response.data.status === "success" && response.data.data.length > 0) {
        const messages = response.data.data.map((msg) => ({
          sender: msg.sender,
          text: msg.text,
        }));

        setMessages(messages);
        return messages;
      }

      return [];
    } catch (error) {
      console.error("Error loading chat history:", error);
      return [];
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    let decoded;
    try {
      decoded = jwtDecode(token);
    } catch (err) {
      localStorage.removeItem("token");
      window.location.href = "/login";
      return;
    }

    let user_id = parseInt(decoded.sub, 10);
    if (isNaN(user_id)) {
      user_id = parseInt(decoded.user?.id, 10);
    }

    if (user_id) {
      fetchRepos(user_id);
      setUserID(user_id);
    } else {
      console.warn("No valid user ID found in token");
    }
  }, []);

  const fetchRepos = async (user_id) => {
    console.log("user id", user_id);
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        "https://git-chat.zeabur.app/repos/list",
        {
          params: {
            user_id: parseInt(user_id),
          },
        }
      );
      console.log("fcvgbhn", response);

      setChats(response.data.repos);
    } catch (err) {
      if (err.response) {
        setError(err.response.data.detail || "Something went wrong.");
      } else {
        setError("Network error.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRepoSelection = async (chat) => {
    setActiveChat(chat);
    setRepo(chat.repo_link);
    setShowAddRepo(false);

    if (isMobile) {
      setShowMobileOverlay(false);
    }

    await loadChatHistory(chat.id);
  };

  const handleRepoAdded = (newRepo) => {
    fetchRepos(newRepo.user_id);
    // setChats((prev) => [...prev, newRepo]);
    setRepo(newRepo.repo_link);
    setActiveChat(newRepo);
    setMessages([
      {
        sender: "ai",
        text: `Repository "${newRepo.name}" added successfully! How can I help you?`,
      },
    ]);
    setShowAddRepo(false);

    if (isMobile) {
      setShowMobileOverlay(false);
    }
  };

  const startNewChat = () => {
    if (chats.length > 0) {
      const firstRepo = chats[0];
      setActiveChat(firstRepo);
      setRepo(firstRepo.repo_link);
      setMessages([
        {
          sender: "ai",
          text: `New chat started with ${firstRepo.repo_name}. How can I help you?`,
        },
      ]);
      setShowAddRepo(false);
    } else {
      setShowAddRepo(true);
    }
  };

  return (
    <div className="app">
      <Head>
        <title>Gitxen Copilot</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {isMobile && (
        <div
          className={`mobile-overlay ${showMobileOverlay ? "active" : ""}`}
          onClick={closeMobileSidebar}
        />
      )}

      <div className="layout">
        {(visibility && !isMobile) || (isMobile && showMobileOverlay) ? (
          <aside
            className={`sidebar ${
              isMobile && showMobileOverlay ? "mobile-visible" : ""
            }`}
          >
            <div className="side-head">
              <div className="logo">
                <Link href="/home">Gitxen</Link>
              </div>
              <button
                onClick={toggleSidebar}
                className="mobile-menu-button"
                aria-label="Toggle menu"
              >
                {isMobile ? (
                  <AiOutlineArrowLeft />
                ) : visibility ? (
                  <AiOutlineArrowLeft />
                ) : (
                  <AiOutlineArrowRight />
                )}
              </button>
            </div>

            <div className="sidebar-header">
              <button
                onClick={() => setShowAddRepo(true)}
                style={{ marginTop: "10px" }}
              >
                <AiOutlinePlus /> Add Repo
              </button>
            </div>

            <ul className="chat-list">
              {loading && <li>Loading repositories...</li>}
              {error && <li className="error">Error: {error}</li>}
              {chats.length === 0 ? (
                <li>No repo yet</li>
              ) : (
                chats.map((chat, i) => (
                  <li
                    key={i}
                    className={
                      chat.repo_name === activeChat?.repo_name ? "active" : ""
                    }
                    onClick={() => handleRepoSelection(chat)}
                  >
                    {chat.repo_name}
                  </li>
                ))
              )}
            </ul>
          </aside>
        ) : (
          <div className="sidebar-mini">
            <button
              onClick={toggleSidebar}
              className="maxi"
              aria-label="Open menu"
            >
              <AiOutlineArrowRight />
              {/* {isMobile ? <AiOutlineMenu /> : <AiOutlineArrowRight />} */}
            </button>
          </div>
        )}

        <div className="middle">
          <div className="chat-header">
            {isMobile && !showMobileOverlay && (
              <button
                onClick={toggleSidebar}
                className="mobile-menu-button"
                style={{ position: "absolute", left: "10px" }}
                aria-label="Open menu"
              >
                {/* <AiOutlineMenu /> */}
              </button>
            )}

            {activeChat ? (
              <h3>Chatting with: {activeChat.repo_name}</h3>
            ) : (
              <h3>Select a repository to start chatting</h3>
            )}
          </div>

          {showAddRepo ? (
            <div className="chat-areas">
              <Addnew onRepoAdded={handleRepoAdded} userId={userID} />
              {/* <button
                className="mt-4 text-sm text-blue-600 underline"
                onClick={() => setShowAddRepo(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#2563eb',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  marginTop: '1rem'
                }}
              >
                ← Back to Chat
              </button> */}
            </div>
          ) : (
            <main className="chat-area">
              <div className="chat-div">
                <div className="messages">
                  {messages.length > 0 ? (
                    messages.map((msg, i) => (
                      <div key={i} className={`message ${msg.sender}`}>
                        {msg.text}
                      </div>
                    ))
                  ) : (
                    <div>No Repo links yet</div>
                  )}
                </div>
              </div>
              <div className="input-div">
                {resultLoading ? (
                  <p className="loading-text">{steps[stepIndex]}</p>
                ) : (
                  null
                )}

                <div className="input-area">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && send_message()}
                    placeholder={
                      activeChat
                        ? "Send a message..."
                        : "Select a repository first..."
                    }
                    disabled={!activeChat}
                  />
                  <button
                    onClick={send_message}
                    disabled={!activeChat || !input.trim()}
                  >
                    <AiOutlineSend />
                  </button>
                </div>
              </div>
            </main>
          )}
        </div>
      </div>
    </div>
  );
}

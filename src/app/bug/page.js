"use client";
import { Editor, loader } from "@monaco-editor/react";
import React, { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import axios from "axios";
import "./bug.css";
import defineGreenThemes from "./monacotheme";
import MyEditor from "./monacotheme";
import Link from "next/link";

const BugPage = () => {
  const [code, setCode] = useState("");
  const [bugSuggestions, setBugSuggestions] = useState("");
  const [bugType, setBugType] = useState("");
  const [bugResult, setBugResult] = useState(false);
  const [codeDescription, setCodeDescription] = useState("");
  const [correctedCode, setCorrectedCode] = useState("");
  const [showCorrected, setShowCorrected] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("python");
  const [isLight, setIsLight] = useState(false);
  const [loading, setLoading] = useState(false);

  const languages = [
    { label: "Python", value: "python" },
    { label: "JavaScript", value: "javascript" },
    { label: "C++", value: "cpp" },
    { label: "Java", value: "java" },
  ];

  const toggleTheme = () => {
    document.body.classList.toggle("light-theme");
    setIsLight(!isLight);
  };

  const get_code_review = async () => {
    setLoading(true);

    const lineCount = code.split("\n").length;
    if (lineCount > 30) {
      setLoading(false);
      return alert("❌ Your code snippet exceeds the 30-line limit.");
    }

    try {
      const response = await axios.post(
        "https://bug-identifier.zeabur.app/find-bug",
        {
          code_snippet: code,
          language: selectedLanguage,
        },
        { timeout: 240000 }
      );

      const data = response.data.data.data;
      setBugSuggestions(data.suggestion);
      setBugType(data.bug_type);
      setCodeDescription(data.description);
      setCorrectedCode(data.corrected_code || "");
      setBugResult(true);
      setShowCorrected(false);
    } catch (error) {
      if (error.code === "ECONNABORTED") {
        alert("⏳ Request timed out after 4 minutes. Please try again.");
      } else {
        console.error(error);
        alert("❌ An error occurred while reviewing your code.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loader.init().then((monaco) => {
      monaco.editor.defineTheme("customDark", {
        base: "vs-dark",
        inherit: true,
        rules: [],
        colors: {
          "editor.background": "#606b65ff",
          "editor.foreground": "#ffffff",
          "editorLineNumber.foreground": "#9d7cd8",
          "editor.selectionBackground": "#68766eff",
          "editor.lineHighlightBackground": "#68766eff",
        },
      });

      monaco.editor.defineTheme("customLight", {
        base: "vs",
        inherit: true,
        rules: [],
        colors: {
          "editor.background": "#c1cac7ff",
          "editorLineNumber.foreground": "#7c3aed",
          "editor.selectionBackground": "#d9fff0ff",
          "editor.lineHighlightBackground": "#ebfffaff",
        },
      });
    });
  }, []);

  return (
    <div className="bug-page">
      <div className="bug-heading">
        <div className="logo"><Link href="/demo">🐞 Buggie</Link>
        </div> 
        <div>
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
          >
            {languages.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>
        <div
          onClick={toggleTheme}
          style={{ cursor: "pointer", fontSize: "1.3rem" }}
        >
          {isLight ? <FaMoon /> : <FaSun />}
        </div>
      </div>

      <div className="bug-center">
        <div className={`code-input ${bugResult ? "with-results" : "full"}`}>

          <Editor
            height="400px"
            language={selectedLanguage}
            value={code}
            theme={isLight ? "customLight" : "customDark"}
            onChange={(value) => setCode(value)}
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              automaticLayout: true,
            }}
          />

          <div className="bug-btns">
            {!loading ? (
              <button onClick={get_code_review}>Run Code</button>
            ) : (
            <div aria-label="Loading..." role="status" className="loader">
  <svg className="icon" viewBox="0 0 256 256">
    <line
      x1="128"
      y1="32"
      x2="128"
      y2="64"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="24"
    ></line>
    <line
      x1="195.9"
      y1="60.1"
      x2="173.3"
      y2="82.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="24"
    ></line>
    <line
      x1="224"
      y1="128"
      x2="192"
      y2="128"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="24"
    ></line>
    <line
      x1="195.9"
      y1="195.9"
      x2="173.3"
      y2="173.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="24"
    ></line>
    <line
      x1="128"
      y1="224"
      x2="128"
      y2="192"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="24"
    ></line>
    <line
      x1="60.1"
      y1="195.9"
      x2="82.7"
      y2="173.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="24"
    ></line>
    <line
      x1="32"
      y1="128"
      x2="64"
      y2="128"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="24"
    ></line>
    <line
      x1="60.1"
      y1="60.1"
      x2="82.7"
      y2="82.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="24"
    ></line>
  </svg>
  <span className="loading-text">Loading...</span>
</div>

            )}
           {bugResult ?
             <button onClick={() => setShowCorrected(!showCorrected)}>
              {showCorrected ? "Hide Corrected Code" : "Show Corrected Code"}
            </button>
            : ""
            }
          </div>

          {showCorrected && correctedCode && (
            <div className="fix-result">
              <Editor
                height="400px"
                language={selectedLanguage}
                value={correctedCode}
                theme={isLight ? "customLight" : "customDark"}
                options={{
                  fontSize: 14,
                  minimap: { enabled: false },
                  readOnly: true,
                  automaticLayout: true,
                }}
              />
            </div>
          )}
        </div>

        {bugResult && (
          <div className="result-input">
            <div className="result-section">
              <h3>Bug Type</h3>
              <p>{bugType}</p>
            </div>
            <div className="result-section">
              <h3>Description</h3>
              <p>{codeDescription}</p>
            </div>
            <div className="result-section">
              <h3>Suggestion</h3>
              <p>{bugSuggestions}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BugPage;

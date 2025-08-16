"use client";
import { useState } from "react";
import "./login.css";
import Link from "next/link";
import { FaArrowUp } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";
import axios from "axios";

const AuthComponent = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const endpoint = isLogin ? "/login" : "/signup";
      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : { email: formData.username, password: formData.password };

      const response = await axios.post(
        `https://git-chat.zeabur.app${endpoint}`,
        payload
      );
      const result = response.data;

      console.log("API response:", result);

      if (result.status === "success") {
        if (endpoint === "/signup") {
          setMessage(result.message);
          setTimeout(() => {
            setIsLogin(true);
            window.location.href = "/login";
          }, 3000);

          return;
        }

        if (endpoint === "/login") {
          localStorage.setItem("token", result.token);
          setMessage(result.message);
          window.location.href = "/demo";

          return;
        }
      }
      setMessage(result.message);
    } catch (error) {
      setMessage("Network error. Please try again.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "https://git-chat.zeabur.app/google/login";
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ username: "", email: "", password: "" });
    setMessage("");
  };

  return (
    <div className="auth-container">
      {/* <NavBar/> */}
      <div className="animatedDiv">
        <div className="inputDiv">
          <div className="inputtext">
            <div style={{ position: "relative", width: "100%" }}>
              <input
                className="homeinput"
                type="text"
                onFocus={() => setIsFocused(true)}
                onBlur={(e) => {
                  if (!e.target.value) setIsFocused(false);
                }}
                disabled
              />

              {!isFocused && (
                <div className="placeholderAnim">
                  <h3 className="pretext">Ask Gitxen to </h3>
                  <TypeAnimation
                    sequence={[
                      "Show all commits that touched the login logic..",
                      2000,
                      "Summarize the purpose of the auth module",
                      2000,
                    ]}
                    speed={50}
                    deletionSpeed={60}
                    wrapper="span"
                    repeat={Infinity}
                  />
                </div>
              )}
            </div>

            <div className="sendBtn">
              <button>
                <FaArrowUp />
              </button>
            </div>
          </div>
          <h3 className="subtext">
            Join thousands creating AI-powered meeting experiences
          </h3>
        </div>
      </div>
      <div className="auth-Div">
        <div className="auth-card">
          <h2 className="auth-logo">
            <Link href="/home" className="logo-link">
              Gitxen.ai
            </Link>
          </h2>
          <h2 className="auth-title">
            {isLogin
              ? "Welcome back. Please sign in to your account"
              : "Create a new Account"}
          </h2>

          <form onSubmit={handleSubmit} className="auth-form">
            {!isLogin && (
              <div className="input-group">
                <label htmlFor="username" className="input-label">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="form-input"
                  required={!isLogin}
                  placeholder="Enter your username"
                />
              </div>
            )}

            {isLogin && (
              <div className="input-group">
                <label htmlFor="email" className="input-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                  required={isLogin}
                  placeholder="Enter your email"
                />
              </div>
            )}

            <div className="input-group">
              <label htmlFor="password" className="input-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="form-input"
                required
                placeholder="Enter your password"
                minLength="5"
              />
            </div>

            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? "Please wait..." : isLogin ? "Sign In" : "Sign Up"}
            </button>
          </form>

          <div className="auth-divider">
            <span>or</span>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="google-button"
            disabled={loading}
          >
            <svg
              className="google-icon"
              viewBox="0 0 24 24"
              width="20"
              height="20"
            >
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>

          {message && (
            <div
              className={`auth-message ${
                message.includes("success") ? "success" : "error"
              }`}
            >
              {message}
            </div>
          )}

          <p className="toggle-text">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={toggleMode}
              className="toggle-button"
              disabled={loading}
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthComponent;

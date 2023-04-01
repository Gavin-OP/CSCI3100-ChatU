import React, { useState } from "react";
import "./ChatRoom.css";

export function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() !== "") {
      setMessages([
        ...messages,
        { message: inputValue, sender: "You", time: new Date() },
      ]);
      setInputValue("");
    }
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="chat-room">
      <div className="chat-header">
        <img
          src="https://via.placeholder.com/40"
          alt="Profile"
          className="profile-pic"
        />
        <div className="user-info">
          <h3 className="user-name">John Doe</h3>
          <span className="user-status">Online</span>
        </div>
        <div className="chat-actions">
          <i className="fas fa-phone"></i>
          <i className="fas fa-video"></i>
          <i className="fas fa-ellipsis-v"></i>
        </div>
      </div>
      <div className="chat-history">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chat-message ${
              message.sender === "You" ? "outgoing" : "incoming"
            }`}
          >
            <p>{message.message}</p>
            <span className="message-time">
              {message.time.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        ))}
      </div>
      <form className="chat-input" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type your message here..."
          value={inputValue}
          onChange={handleChange}
        />
        <button type="submit">
          Send
        </button>
      </form>
    </div>
  );
}
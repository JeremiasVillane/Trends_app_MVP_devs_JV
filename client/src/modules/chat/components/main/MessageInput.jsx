import React, { useState } from "react";
import { BsEmojiSmile, BsSendFill } from "react-icons/bs";
import { EmojiSelector } from ".";
import styles from "./MessageInput.module.css";

export const MessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleEmojiSelection = (event) => {
    setMessage(message + event.native);
  };

  const handleSendClick = () => {
    if (message.trim() !== "") {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendClick();
    }
  };

  return (
    <div className={styles.message_input}>
      <input
        type="text"
        name="message_input"
        value={message}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        placeholder="Escribe tu mensaje..."
        autoComplete="off"
      />
      <button className={styles.send_button}>
        <BsSendFill onClick={handleSendClick} title="Enviar" />
      </button>
      <button
        className={styles.emoji_button}
        onClick={() => setShowEmoji(!showEmoji)}
        title="Emojis"
      >
        <BsEmojiSmile />
      </button>
      {showEmoji && <EmojiSelector onSelect={handleEmojiSelection} />}
    </div>
  );
};

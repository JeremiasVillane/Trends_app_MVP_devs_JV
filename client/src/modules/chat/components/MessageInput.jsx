import React, { useState } from "react";
import { BsEmojiSmile, BsSendFill } from "react-icons/bs";
import EmojiSelector from "./EmojiSelector";
import styles from "./MessageInput.module.css";
import { useTypingIndicatorContext } from "./TypingIndicatorContext";

const MessageInput = ({ userId, onSendMessage }) => {
  const [message, setMessage] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const { startTyping, stopTyping, isTyping } = useTypingIndicatorContext();

  const handleInputChange = (event) => {
    setMessage(event.target.value);

    // Indicador de "está escribiendo"
    if (event.target.value.trim() !== "") {
      startTyping(userId);
    } else {
      stopTyping(userId);
    }
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
        value={message}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        placeholder="Escribe tu mensaje..."
      />
      <button className={styles.send_button} onClick={handleSendClick}>
        <BsSendFill onClick={handleSendClick} title="Enviar" />
      </button>
      <button
        className={styles.emoji_button}
        onClick={() => setShowEmoji(!showEmoji)}
      >
        <BsEmojiSmile />
      </button>
      {showEmoji && <EmojiSelector onSelect={handleEmojiSelection} />}
    </div>
  );
};

export default MessageInput;

// <MessageInput onSendMessage={(message) => handleSendMessage(message)} />

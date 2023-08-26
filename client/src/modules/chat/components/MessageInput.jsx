import React, { useEffect, useRef, useState } from "react";
import EmojiSelector from "./EmojiSelector";
import styles from "./MessageInput.module.css";
import { useTypingIndicatorContext } from "./TypingIndicatorContext";

const MessageInput = ({ userId, onSendMessage }) => {
  const [message, setMessage] = useState("");
  const { startTyping, stopTyping, isTyping } = useTypingIndicatorContext();  
  const inputRef = useRef(null); // Ref al input field

  const handleInputChange = (event) => {
    setMessage(event.target.value);

    // Indicador de "está escribiendo"
    if (event.target.value.trim() !== "") {
      startTyping(userId);
    } else {
      stopTyping(userId);
    }
  };

  const handleSendClick = () => {
    if (message.trim() !== "") {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleEmojiSelection = (emoji) => {
    // Se toma la representación nativa del emoji
    const emojiNative = emoji.native;

    // Se toma la posición actual del cursor
    const cursorPosition = inputRef.current.selectionStart;

    // Se inserta el emoji en la posición del cursor
    const newMessage =
      message.slice(0, cursorPosition) +
      emojiNative +
      message.slice(cursorPosition);

    setMessage(newMessage);

    // Se mueve el cursor después del emoji
    inputRef.current.selectionStart = cursorPosition + emojiNative.length;
    inputRef.current.selectionEnd = cursorPosition + emojiNative.length;
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendClick();
    }
  };

  return (
    <div className={styles.message_input}>
      <textarea
        ref={inputRef} // Se establece el ref al input
        rows="3"
        value={message}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        placeholder="Escribe tu mensaje..."
      />
      <button onClick={handleSendClick}>Send</button>
      {/* <EmojiSelector onSelect={handleEmojiSelection} /> */}
    </div>
  );
};

export default MessageInput;

// <MessageInput onSendMessage={(message) => handleSendMessage(message)} />

/**
 *
 * const handleSendMessage = () => {
 *   // Logic to send the message
 *
 *   // Stop typing indicator
 *   stopTyping(userId);
 *   setMessage('');
 * };
 *
 */

import React from "react";
import styles from "./ConversationButtons.module.css";

const ConversationButtons = ({ onCreatePrivateChat, onCreateGroup }) => {
  return (
    <div className={styles.buttons_container}>
      <button onClick={onCreatePrivateChat}>Chat privado</button>
      <button onClick={onCreateGroup}>Chat grupal</button>
    </div>
  );
};

export default ConversationButtons;

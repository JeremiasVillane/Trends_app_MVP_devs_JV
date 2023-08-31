import React from "react";
import styles from "./ConversationButtons.module.css";

const ConversationButtons = ({ onCreateGroup }) => {
  return (
    <div className={styles.buttons_container}>
      <button>Chat privado</button>
      <button onClick={onCreateGroup}>Chat grupal</button>
    </div>
  );
};

export default ConversationButtons;

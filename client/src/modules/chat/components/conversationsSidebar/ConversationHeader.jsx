import React, { useState } from "react";
import { BiSolidMessageAdd } from "react-icons/bi";
import { useSelector } from "react-redux";
import { selectDarkMode } from "../../../../redux/uiSlice";
import styles from "./ConversationHeader.module.css";

export const ConversationHeader = ({
  onCreatePrivateChat,
  onCreateGroup,
  isSmallerThan590,
}) => {
  const darkMode = useSelector(selectDarkMode);
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className={styles.header_container}>
      <p>Chats</p>
      <div className={styles.options_button}>
        <BiSolidMessageAdd
          size={isSmallerThan590 ? 25 : 23}
          color={darkMode ? "#f5f5f5" : "#383836"}
          style={{ cursor: "pointer" }}
          title="Nueva conversación"
          onClick={() => setShowOptions((curr) => !curr)}
        />
        {showOptions && (
          <div className={styles.message_options}>
            <ul onClick={() => setShowOptions((curr) => !curr)}>
              <li onClick={onCreatePrivateChat}>Chat privado</li>
              <li onClick={onCreateGroup}>Chat grupal</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

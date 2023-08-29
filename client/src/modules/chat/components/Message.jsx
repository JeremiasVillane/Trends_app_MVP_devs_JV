import React, { useState } from "react";
import ThreadSidebar from "./ThreadSidebar";
import styles from "./Message.module.css";
import Timestamp from "./Timestamp";
import { useSelector } from "react-redux";
import { selectUserProfile } from "../../../redux/UsersSlice";

const Message = ({
  author,
  avatar,
  messageId,
  timestamp,
  content,
  parentMessage,
  messages,
}) => {
  const user = useSelector(selectUserProfile);
  const [showThreadSidebar, setShowThreadSidebar] = useState(false);
  const messageStyle =
    user.username === author ? "message_sent" : "message_received";

  const handleReplyInThreadClick = () => {
    setShowThreadSidebar(true);
  };

  return (
    <div className={styles.message}>
      <div className={`${styles[`${messageStyle}_avatar`]} ${styles.avatar}`}>
        <img src={avatar} />
      </div>

      <div className={`${styles.message} ${styles[messageStyle]}`}>
        <div
          className={`${styles[`${messageStyle}`]} ${
            styles[`${messageStyle}_content`]
          }`}
        >
          <p>{content}</p>
        </div>
        <span className={`${styles[`${messageStyle}_timestamp`]}`}>
          <Timestamp timestamp={timestamp} />
        </span>
        {parentMessage && (
          <button
            className={styles.reply_button}
            onClick={handleReplyInThreadClick}
          >
            Responder en hilo
          </button>
        )}
      </div>
      {showThreadSidebar && (
        <ThreadSidebar
          messages={messages}
          setShowThreadSidebar={setShowThreadSidebar}
        />
      )}
    </div>
  );
};

export default Message;

/**
 *
 * <Message
 * message={message}
 * onSelectThread={() => setSelectedParentMessage(message)}
 *  // Set selectedParentMessage
 * />
 *
 *
 */

import React, { useState } from "react";
import ThreadSidebar from "./ThreadSidebar";
import styles from "./Message.module.css";
import Timestamp from "./Timestamp";

const Message = ({ content, author, timestamp, parentMessage, messages }) => {
  const [showThreadSidebar, setShowThreadSidebar] = useState(false);

  const handleReplyInThreadClick = () => {
    setShowThreadSidebar(true);
  };

  return (
    <div className={styles.message}>
      <div className={styles.message_received_avatar}>
        <img src="https://i.postimg.cc/J4QGQWmr/user-default.png" />
      </div>

      <div className={styles.message_received}>
        <div className={styles.message_received_content}>
          <p>{content}</p>
        </div>
        <span className={styles.message_received_timestamp}>
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

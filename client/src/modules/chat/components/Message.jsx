import React, { useState } from "react";
import ThreadSidebar from "./ThreadSidebar"; // Import the ThreadSidebar component

const Message = ({ content, author, timestamp, parentMessage, messages }) => {
  const [showThreadSidebar, setShowThreadSidebar] = useState(false);

  const handleReplyInThreadClick = () => {
    setShowThreadSidebar(true);
  };

  return (
    <div className="message">
      <div className="message-content">
        <div className="message-text">{content}</div>
        <div className="message-author">{author}</div>
        <div className="message-timestamp">{timestamp}</div>
        {parentMessage && (
          <button onClick={handleReplyInThreadClick}>Responder en hilo</button>
        )}
      </div>
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

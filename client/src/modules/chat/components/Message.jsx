import React, { useState } from "react";
import ThreadSidebar from "./ThreadSidebar";
import styles from "./Message.module.css";
import Timestamp from "./Timestamp";
import { useDispatch, useSelector } from "react-redux";
import { selectDarkMode, selectUserProfile } from "../../../redux/UsersSlice";
import MessageActions from "./MessageActions";
import { deleteMessage, loadConversations } from "../../../redux/chatSlice";
import Avatar from "./Avatar";
import { useNavigate } from "react-router-dom";

const Message = ({
  socket,
  author,
  authorName,
  authorId,
  avatar,
  userStatus,
  messageId,
  timestamp,
  content,
  messageStatus,
  parentMessage,
  messages,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUserProfile);
  const darkMode = useSelector(selectDarkMode);
  const activeConversation = useSelector(
    (state) => state.chat.activeConversation
  );
  const [showThreadSidebar, setShowThreadSidebar] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const messageStyle =
    user.username === author ? "message_sent" : "message_received";

  const handleProfile = () => {
    navigate(`/user/profile/${authorId}`);
  };

  const handleMouseEnter = () => {
    setShowActions(true);
  };

  const handleMouseLeave = () => {
    setShowActions(false);
  };

  const handleReplyInThreadClick = () => {
    setShowThreadSidebar(true);
  };

  const handleDelete = (messageId) => {
    if (socket && activeConversation) {
      socket.emit("updateMessage", messageId);

      dispatch(deleteMessage(activeConversation, messageId));
    }
  };

  return (
    <div className={styles.message}>
      <div
        className={`${styles[`${messageStyle}_avatar`]} ${styles.avatar}`}
        onClick={user.id !== authorId ? handleProfile : null}
        style={{ cursor: user.id !== authorId ? "pointer" : "default" }}
      >
        <Avatar
          imageUrl={avatar}
          altText={author}
          size={"50px"}
          status={userStatus}
        />
      </div>

      <div
        className={`${styles.message} ${styles[messageStyle]}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <p className={styles.message_author}>{authorName}</p>

        <div
          className={`${styles[`${messageStyle}`]} ${
            styles[`${messageStyle}_content`]
          }`}
        >
          {user.username === author &&
            messageStatus !== "deleted" &&
            showActions && (
              <MessageActions onDeleteMessage={() => handleDelete(messageId)} />
            )}
          <p
            style={
              messageStatus === "deleted"
                ? {
                    fontStyle: "italic",
                    backgroundColor: "transparent",
                    boxShadow: "none",
                    color: darkMode ? "#999" : "#646464",
                    userSelect: "none",
                    padding: ".3rem 0",
                  }
                : null
            }
          >
            {content}
          </p>
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

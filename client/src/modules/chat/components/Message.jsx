import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteMessage } from "../../../redux/chatSlice";
import { selectDarkMode, selectUserProfile } from "../../../redux/UsersSlice";
import Avatar from "./Avatar";
import styles from "./Message.module.css";
import MessageActions from "./MessageActions";
import Timestamp from "./Timestamp";

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
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUserProfile);
  const darkMode = useSelector(selectDarkMode);
  const activeConversation = useSelector(
    (state) => state.chat.activeConversation
  );
  const [showActions, setShowActions] = useState(false);
  const messageStyle = {
    flexDirection: user.id === authorId ? "row-reverse" : "row",
    alignItems: user.id === authorId ? "flex-end" : "flex-start",
    messageColor:
      user.id === authorId
        ? {
            background: darkMode ? "#9d9d9d" : "#3085d6",
            color: darkMode ? "#242424" : "#f5f5f5",
          }
        : { background: darkMode ? "#383636" : "#777", color: "#d1d1d1" },
  };

  const handleProfile = () => {
    navigate(`/user/profile/${authorId}`);
  };

  const handleMouseEnter = () => {
    setShowActions(true);
  };

  const handleMouseLeave = () => {
    setShowActions(false);
  };

  const handleDelete = (messageId) => {
    if (socket && activeConversation) {
      socket.emit("updateMessage");

      dispatch(deleteMessage(activeConversation, messageId));
    }
  };

  return (
    <div
      className={styles.message_container}
      style={{ flexDirection: messageStyle.flexDirection }}
    >
      <div
        className={styles.message_avatar}
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
        className={styles.message}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ alignItems: messageStyle.alignItems }}
      >
        <p className={styles.message_author}>{authorName}</p>

        <div className={styles.message_content}>
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
                    marginBottom: "-0.7rem",
                  }
                : messageStyle.messageColor
            }
          >
            {content}
          </p>
        </div>
        <span className={styles.message_timestamp}>
          <Timestamp timestamp={timestamp} />
        </span>
      </div>
    </div>
  );
};

export default Message;

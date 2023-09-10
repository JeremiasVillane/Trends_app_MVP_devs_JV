import React, { useState } from "react";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Avatar, MessageActions, Timestamp } from ".";
import useMediaQuery from "../../../../hooks/useMediaQuery";
import {
  deleteMessage,
  editMessage,
  selectActiveConversation,
} from "../../../../redux/chatSlice";
import { selectDarkMode } from "../../../../redux/uiSlice";
import { selectUserProfile } from "../../../../redux/usersSlice";
import styles from "./Message.module.css";

export const Message = ({
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
  const textareaRef = React.useRef(null);
  const user = useSelector(selectUserProfile);
  const darkMode = useSelector(selectDarkMode);
  const activeConversation = useSelector(selectActiveConversation);
  const [showActions, setShowActions] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const isSmallerThan590 = useMediaQuery("(max-width: 590px)");

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
    deletedMessage: {
      fontStyle: "italic",
      backgroundColor: "transparent",
      boxShadow: "none",
      color: darkMode ? "#999" : "#646464",
      userSelect: "none",
      padding: ".3rem 0",
      marginBottom: "-0.7rem",
      whiteSpace: "nowrap",
    },
  };

  const handleProfile = () => {
    navigate(`/user/profile/${authorId}`);
  };

  const handleDelete = (messageId) => {
    if (socket && activeConversation) {
      socket.emit("updateMessage");

      dispatch(deleteMessage(activeConversation, messageId));
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = (event) => {
    setEditedContent(event.target.value);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  };

  const handleSave = () => {
    if (editedContent !== content) {
      dispatch(
        editMessage(user.id, activeConversation, messageId, editedContent)
      );
      setIsEditing(false);
    } else {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedContent(content);
    setIsEditing(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSave();
    } else if (event.key === "Escape") {
      handleCancel();
    } else return;
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
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
        onTouchStart={() => setShowActions((curr) => !curr)}
        style={{ alignItems: messageStyle.alignItems }}
      >
        <p className={styles.message_author}>{authorName}</p>

        {isEditing ? (
          <>
            <textarea
              ref={textareaRef}
              cols={isSmallerThan590 ? "20" : "40"}
              className={styles.message_edit}
              value={editedContent}
              onChange={handleUpdate}
              onKeyDown={handleKeyDown}
              autoFocus
            ></textarea>
            <div style={{ display: "flex" }}>
              <button
                onClick={handleSave}
                style={{ margin: "0 .3rem" }}
                title="Guardar"
              >
                <AiFillCheckCircle
                  size={isSmallerThan590 ? 33 : 25}
                  color={darkMode ? "#d9d9d9" : "#202020"}
                />
              </button>
              <button
                onClick={handleCancel}
                style={{ margin: "0 .3rem" }}
                title="Descartar"
              >
                <AiFillCloseCircle
                  size={isSmallerThan590 ? 33 : 25}
                  color={darkMode ? "#d9d9d9" : "#202020"}
                />
              </button>
            </div>
          </>
        ) : (
          <div className={styles.message_content}>
            {user.username === author &&
              messageStatus !== "deleted" &&
              showActions && (
                <MessageActions
                  onEditMessage={() => handleEdit()}
                  onDeleteMessage={() => handleDelete(messageId)}
                />
              )}
            <p
              style={
                messageStatus === "deleted"
                  ? messageStyle.deletedMessage
                  : messageStyle.messageColor
              }
            >
              {content}
            </p>
          </div>
        )}
        <span className={styles.message_timestamp}>
          <Timestamp timestamp={timestamp} />
        </span>
      </div>
    </div>
  );
};

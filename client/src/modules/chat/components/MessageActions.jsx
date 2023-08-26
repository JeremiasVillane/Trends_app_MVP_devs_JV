import React from "react";

const MessageActions = ({ onEdit, onDelete }) => {
  return (
    <div className="message-actions">
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default MessageActions;

/**
 *
 * <MessageActions
 * onEdit={() => handleEdit(messageId)}
 * onDelete={() => handleDelete(messageId)}
 * />
 *
 */

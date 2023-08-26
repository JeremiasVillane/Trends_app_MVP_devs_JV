import React, { useState } from "react";

const EditableMessage = ({ initialContent, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(initialContent);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedContent(initialContent);
  };

  const handleSaveClick = () => {
    onSave(editedContent);
    setIsEditing(false);
  };

  return (
    <div className="editable-message">
      {isEditing ? (
        <textarea
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
        />
      ) : (
        <div className="message-content">{initialContent}</div>
      )}
      {isEditing ? (
        <div className="edit-actions">
          <button onClick={handleSaveClick}>Save</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </div>
      ) : (
        <button onClick={handleEditClick}>Edit</button>
      )}
    </div>
  );
};

export default EditableMessage;

/**
 *
 * <EditableMessage
 * initialContent="Hello, world!"
 * onSave={(editedContent) => handleSaveMessage(messageId, editedContent)}
 * />
 *
 */

import React from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import styles from "./MessageActions.module.css";

const MessageActions = ({ onEdit, onDelete }) => {
  return (
    <div className={styles.message_actions}>
      <button onClick={onEdit} title="Editar">
        <AiFillEdit size={18} />
      </button>
      
      <button onClick={onDelete} title="Eliminar">
        <AiFillDelete size={18} />
      </button>
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

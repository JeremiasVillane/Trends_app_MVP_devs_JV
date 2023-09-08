import React from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import styles from "./MessageActions.module.css";

export const MessageActions = ({ onEditMessage, onDeleteMessage }) => {
  return (
    <div className={styles.message_actions}>
      <button onClick={onEditMessage} onTouchStart={onEditMessage} title="Editar">
        <AiFillEdit size={18} />
      </button>

      <button onClick={onDeleteMessage} onTouchStart={onDeleteMessage} title="Eliminar">
        <AiFillDelete size={18} />
      </button>
    </div>
  );
};

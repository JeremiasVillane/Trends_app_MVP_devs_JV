import React from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import styles from "./MessageActions.module.css";

const MessageActions = ({ onDeleteMessage }) => {
  return (
    <div className={styles.message_actions}>
      {/* <button onClick={onEdit} title="Editar">
        <AiFillEdit size={18} />
      </button> */}

      <button onClick={onDeleteMessage} title="Eliminar">
        <AiFillDelete size={18} />
      </button>
    </div>
  );
};

export default MessageActions;

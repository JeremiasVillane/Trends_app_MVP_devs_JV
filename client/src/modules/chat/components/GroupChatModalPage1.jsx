import { useState } from "react";
import styles from "./GroupChatModal.module.css";

const GroupChatModalPage1 = ({ onNext, setShowGroupChatModal }) => {
  const [groupName, setGroupName] = useState("");
  const [groupImage, setGroupImage] = useState("");

  const handleNext = () => {
    // Realiza validaciones y procesamiento necesario
    onNext();
  };

  return (
    <div className={styles.modal_page}>
      <div className={styles.modal_header}>
        <h2>Crear nuevo grupo de chat</h2>
      </div>
      <div className={styles.modal_content}>
        <input
          type="text"
          placeholder="Nombre del grupo"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Imagen del grupo"
          value={groupImage}
          onChange={(e) => setGroupImage(e.target.value)}
        />
        <div className={styles.buttons_container}>
          <button className={styles.page_button} onClick={handleNext}>
            Siguiente
          </button>
          <button
            className={styles.cancel_button}
            onClick={() => setShowGroupChatModal(false)}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupChatModalPage1;

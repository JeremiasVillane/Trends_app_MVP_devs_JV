import React, { useEffect, useRef, useState } from "react";
import styles from "./CreateGroupModal.module.css";

const CreateGroupModal = ({ setShowCreateGroupModal }) => {
  const ref = useRef();

  useEffect(() => {
    const handleKeydown = (e) =>
      e.key === "Escape" && setShowCreateGroupModal(false);
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  const handleOverlayClick = (e) => {
    const { current } = ref;
    if (current === e.target) {
      setShowCreateGroupModal(false);
    }
  };

  return (
    <div
      className={styles.modal_overlay}
      ref={ref}
      onClick={handleOverlayClick}
    >
      <div className={styles.modal_container}>
        <div className={styles.modal_header}>
          <h2>Crear nuevo grupo</h2>
        </div>
        <div className={styles.modal_content}>
        <button onClick={() => setShowCreateGroupModal(false)}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default CreateGroupModal;

import React, { useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { GoBackModalStyles } from "./GoBackModal.styles";
import styles from "./GoBackModal.module.css"

Modal.setAppElement("#root");

function GoBackModal() {
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(true);

  const closeModal = () => {
    setModalIsOpen(false);
    navigate(-1);
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Back Button Modal"
      style={GoBackModalStyles}
    >
      <h2 className={styles.h2}>
        <b>¡Ups!</b>
        <br />
        <br />
        No tienes acceso
        <br />a esta página.
      </h2>
      <button onClick={closeModal} className={styles.goBackButton}>
        Regresar
      </button>
    </Modal>
  );
}

export default GoBackModal;

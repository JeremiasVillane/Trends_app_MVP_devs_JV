import React, { useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "400px",
    width: "90%",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.2)",
    backgroundColor: "#fff",
    textAlign: "center",
    color: "#242424",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 9999,
  },
  h2: {
    fontSize: "22px",
    marginBottom: "33px",
    marginTop: "21px",
    lineHeight: "2rem",
  },
  p: {
    fontSize: "16px",
    marginBottom: "20px",
  },
  button: {
    fontSize: "16px",
    padding: "10px 20px",
    backgroundColor: "#9ac2ef",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

function BackButtonModal() {
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
      style={customStyles}
    >
      <h2 style={customStyles.h2}>
        <b>¡Ups!</b>
        <br />
        <br />
        No tienes acceso
        <br />a esta página.
      </h2>
      {/* <p style={customStyles.p}>Por favor, regresa a la página anterior.</p> */}
      <button onClick={closeModal} style={customStyles.button}>
        Regresar
      </button>
    </Modal>
  );
}

export default BackButtonModal;

import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import useMediaQuery from "../../../hooks/useMediaQuery";
import { removeGroupMember } from "../../../redux/chatSlice";
import { selectDarkMode } from "../../../redux/uiSlice";
import styles from "./GroupChatModal.module.css";

export const RemoveParticipantModal = ({
  groupId,
  groupName,
  userId,
  userName,
  ownerId,
  setShowRemoveParticipantModal,
  setShowParticipantInfo,
}) => {
  const dispatch = useDispatch();
  const ref = useRef();
  const isSmallerThan590 = useMediaQuery("(max-width: 590px)");
  const darkMode = useSelector(selectDarkMode);

  useEffect(() => {
    const handleKeydown = (e) =>
      e.key === "Escape" && setShowRemoveParticipantModal(false);
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  const handleOverlayClick = (e) => {
    const { current } = ref;
    if (current === e.target) {
      setShowRemoveParticipantModal(false);
    }
  };

  const handleAccept = () => {
    setShowParticipantInfo(false);
    dispatch(removeGroupMember(groupId, userId, ownerId));
    setShowRemoveParticipantModal(false);
    Swal.fire({
      icon: "success",
      position: "top-end",
      toast: true,
      title: "Grupo eliminado",
      text: `Se quitó correctamente a ${userName} de "${groupName}"`,
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: false,
      background: darkMode ? "#383636" : "#FFF",
      color: darkMode ? "#FFF" : "#545454",
    });
  };

  return (
    <div
      className={styles.modal_overlay}
      ref={ref}
      onClick={handleOverlayClick}
    >
      <div
        className={styles.modal_container}
        style={isSmallerThan590 ? { width: "90vw" } : { width: "400px" }}
      >
        <div className={styles.modal_header}>
          <h2>Quitar integrante</h2>
        </div>
        <div className={styles.modal_content}>
          <p>
            ¿Estás seguro que deseas quitar a <em>{userName}</em> de{" "}
            <strong>{groupName}</strong>?
          </p>
          <div className={styles.buttons_container}>
            <button className={styles.page_button} onClick={handleAccept}>
              Aceptar
            </button>
            <button
              className={styles.cancel_button}
              onClick={() => setShowRemoveParticipantModal(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

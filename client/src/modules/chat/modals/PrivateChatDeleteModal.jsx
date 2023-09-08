import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import useMediaQuery from "../../../hooks/useMediaQuery";
import { deletePrivateChat } from "../../../redux/chatSlice";
import { selectDarkMode } from "../../../redux/uiSlice";
import { selectUserProfile } from "../../../redux/usersSlice";
import styles from "./GroupChatModal.module.css";

export const PrivateChatDeleteModal = ({
  chatId,
  contactName,
  setShowDeleteChatModal,
  setShowInfo,
}) => {
  const dispatch = useDispatch();
  const ref = useRef();
  const isSmallerThan590 = useMediaQuery("(max-width: 590px)");
  const user = useSelector(selectUserProfile);
  const darkMode = useSelector(selectDarkMode);

  useEffect(() => {
    const handleKeydown = (e) =>
      e.key === "Escape" && setShowDeleteChatModal(false);
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  const handleOverlayClick = (e) => {
    const { current } = ref;
    if (current === e.target) {
      setShowDeleteChatModal(false);
    }
  };

  const handleAccept = () => {
    dispatch(deletePrivateChat(user.id, chatId));
    setShowInfo(false);
    setShowDeleteChatModal(false);
    Swal.fire({
      icon: "success",
      position: "top-end",
      toast: true,
      title: "Chat eliminado",
      text: `Se eliminó correctamente el chat con "${contactName}"`,
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
        style={isSmallerThan590 ? { width: "90vw" } : { width: "370px" }}
      >
        <div className={styles.modal_header}>
          <h2>Eliminar chat</h2>
        </div>
        <div className={styles.modal_content}>
          <p>
            ¿Estás seguro que deseas eliminar el chat con{" "}
            <strong>{contactName}</strong>?
          </p>
          <div className={styles.buttons_container}>
            <button className={styles.page_button} onClick={handleAccept}>
              Aceptar
            </button>
            <button
              className={styles.cancel_button}
              onClick={() => setShowDeleteChatModal(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  deleteChatGroup,
  setActiveConversation,
} from "../../../redux/chatSlice";
import { selectDarkMode, selectUserProfile } from "../../../redux/UsersSlice";
import styles from "./GroupChatModal.module.css";

const GroupChatDeleteModal = ({
  groupId,
  groupName,
  setShowDeleteGroupModal,
  setShowInfo,
}) => {
  const dispatch = useDispatch();
  const ref = useRef();
  const user = useSelector(selectUserProfile);
  const darkMode = useSelector(selectDarkMode);

  useEffect(() => {
    const handleKeydown = (e) =>
      e.key === "Escape" && setShowDeleteGroupModal(false);
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  const handleOverlayClick = (e) => {
    const { current } = ref;
    if (current === e.target) {
      setShowDeleteGroupModal(false);
    }
  };

  const handleAccept = () => {
    dispatch(deleteChatGroup(user.id, groupId));
    setShowInfo(false);
    setShowDeleteGroupModal(false);
    Swal.fire({
      icon: "success",
      position: "top-end",
      toast: true,
      title: "Grupo eliminado",
      text: `Se eliminó correctamente el grupo "${groupName}"`,
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
      <div className={styles.modal_container} style={{ width: "370px" }}>
        <div className={styles.modal_header}>
          <h2>Eliminar grupo</h2>
        </div>
        <div className={styles.modal_content}>
          <p>
            ¿Estás seguro que deseas eliminar el grupo{" "}
            <strong>{groupName}</strong>?
          </p>
          <div className={styles.buttons_container}>
            <button className={styles.page_button} onClick={handleAccept}>
              Aceptar
            </button>
            <button
              className={styles.cancel_button}
              onClick={() => setShowDeleteGroupModal(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupChatDeleteModal;

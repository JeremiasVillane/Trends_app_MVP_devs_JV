import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { addGroupImage, createNewChatGroup } from "../../../redux/chatSlice";
import { selectDarkMode } from "../../../redux/uiSlice";
import { selectUserProfile } from "../../../redux/usersSlice";
import styles from "./GroupChatModal.module.css";

export const GroupChatModalPage1 = ({ onNext, setShowGroupChatModal }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserProfile);
  const darkMode = useSelector(selectDarkMode);
  const [groupName, setGroupName] = useState("");
  const [groupImage, setGroupImage] = useState(null);
  const [showPreviewImage, setShowPreviewImage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleNext = async () => {
    if (groupImage) {
      const formData = new FormData();
      formData.append("image", groupImage);

      const urlImage = dispatch(addGroupImage(formData));

      urlImage
        .then((result) => {
          dispatch(createNewChatGroup(user.id, groupName, result));
        })
        .catch((error) => {
          console.error("Error al obtener la URL de la imagen:", error);
        });
    } else {
      dispatch(createNewChatGroup(user.id, groupName));
    }

    onNext();
  };

  const handleFileChange = (file) => {
    if (file) {
      if (file.type.startsWith("image/")) {
        setGroupImage(file);
        setShowPreviewImage(true);
        setErrorMessage("");
      } else {
        setErrorMessage("Solo se permiten imágenes: jpg, jpeg, png, gif, svg");
      }
    }
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileChange(files[0]);
    }
  };

  if (errorMessage) {
    Swal.fire({
      icon: "error",
      position: "top-end",
      toast: true,
      title: "Formato incorrecto",
      text: errorMessage,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      background: darkMode ? "#383636" : "#FFF",
      color: darkMode ? "#FFF" : "#545454",
    });
  }

  return (
    <div className={styles.modal_page}>
      <div className={styles.modal_header}>
        <h2>Crear nuevo grupo</h2>
      </div>
      <div className={styles.modal_content}>
        <input
          type="text"
          name="groupName"
          autoComplete="off"
          placeholder="Nombre del grupo"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />

        {showPreviewImage ? (
          <div className={styles.preview}>
            <button
              onClick={() => {
                setShowPreviewImage(false);
                setGroupImage(null);
              }}
              title="Eliminar"
            >
              &#128473;
            </button>
            <img
              src={groupImage ? URL.createObjectURL(groupImage) : null}
              alt="Vista previa"
              className={styles.preview_image}
            />
          </div>
        ) : (
          <div className={styles.image_input}>
            <div
              className={styles.drop_zone}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleFileDrop}
            >
              <label
                htmlFor="img_up"
                style={{
                  cursor: "pointer",
                  color: darkMode ? "#d9d9d9" : "#383836",
                }}
              >
                Suelta una imagen o haz clic aquí
                <br />
                <br />
                <i
                  className="fa fa-2x fa-camera"
                  style={{ color: darkMode ? "#fff" : "#383836" }}
                ></i>
              </label>
              <input
                id="img_up"
                type="file"
                accept="image/jpeg, image/jpg, image/png, image/gif, image/svg+xml"
                name="groupImage"
                onChange={(e) => handleFileChange(e.target.files[0])}
                style={{ display: "none" }}
              />
            </div>
          </div>
        )}

        <div className={styles.buttons_container}>
          <button
            className={styles.page_button}
            onClick={handleNext}
            disabled={!groupName || errorMessage}
            autoFocus
          >
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

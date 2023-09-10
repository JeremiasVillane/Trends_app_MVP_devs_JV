import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { addGroupImage, editChatGroup } from "../../../redux/chatSlice";
import { selectDarkMode } from "../../../redux/uiSlice";
import { selectUserProfile } from "../../../redux/usersSlice";
import styles from "./GroupChatModal.module.css";

export const GroupChatEditModal = ({
  currentGroupId,
  currentGroupName,
  currentGroupImage,
  setShowGroupChatEditModal,
}) => {
  const dispatch = useDispatch();
  const ref = useRef();
  const user = useSelector(selectUserProfile);
  const darkMode = useSelector(selectDarkMode);
  const [groupName, setGroupName] = useState(currentGroupName);
  const [groupImage, setGroupImage] = useState(currentGroupImage);
  const [showPreviewImage, setShowPreviewImage] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isNameEdited, setIsNameEdited] = useState(false);
  const [isImageEdited, setIsImageEdited] = useState(false);

  useEffect(() => {
    const handleKeydown = (e) =>
      e.key === "Escape" && setShowGroupChatEditModal(false);
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  const handleOverlayClick = (e) => {
    const { current } = ref;
    if (current === e.target) {
      setShowGroupChatEditModal(false);
    }
  };

  const handleAccept = async () => {
    if (groupImage && isImageEdited) {
      const formData = new FormData();
      formData.append("image", groupImage);

      const urlImage = dispatch(addGroupImage(formData));

      urlImage
        .then((result) => {
          dispatch(editChatGroup(user.id, currentGroupId, groupName, result));
        })
        .catch((error) => {
          console.error("Error al obtener la URL de la imagen:", error);
        });
    } else if (groupName && isNameEdited) {
      dispatch(editChatGroup(user.id, currentGroupId, groupName));
    } else {
      setShowGroupChatEditModal(false);
    }

    setShowGroupChatEditModal(false);
  };

  const handleFileChange = (file) => {
    setIsImageEdited(true);

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

  const getImageSrc = (image) => {
    if (typeof image === "string") {
      return image;
    } else if (typeof image === "object") {
      try {
        const imageURL = URL.createObjectURL(image);

        return imageURL;
      } catch (error) {
        return;
      }
    } else {
      return "";
    }
  };

  return (
    <div
      className={styles.modal_overlay}
      ref={ref}
      onClick={handleOverlayClick}
    >
      <div className={styles.modal_container} style={{ width: "350px" }}>
        <div className={styles.modal_page}>
          <div className={styles.modal_header}>
            <h2>Editar grupo</h2>
          </div>
          <div className={styles.modal_content}>
            <input
              type="text"
              name="groupName"
              autoComplete="off"
              placeholder="Nombre del grupo"
              value={groupName}
              onChange={(e) => {
                setGroupName(e.target.value);
                setIsNameEdited(true);
              }}
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
                  src={getImageSrc(groupImage)}
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
                onClick={handleAccept}
                disabled={
                  !groupName ||
                  !groupImage ||
                  (!isImageEdited && !isNameEdited) ||
                  errorMessage
                }
                autoFocus
              >
                Aceptar
              </button>
              <button
                className={styles.cancel_button}
                onClick={() => setShowGroupChatEditModal(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

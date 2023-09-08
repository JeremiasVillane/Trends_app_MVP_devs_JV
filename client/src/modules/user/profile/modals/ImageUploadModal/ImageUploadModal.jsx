import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { selectDarkMode } from "../../../../../redux/uiSlice";
import {
  selectUserProfile,
  updateUserProfile,
  uploadImage,
} from "../../../../../redux/usersSlice";
import styles from "../../../../chat/modals/GroupChatModal.module.css";

export const ImageUploadModal = ({
  currentProfileImage,
  setShowImageUploadModal,
}) => {
  const dispatch = useDispatch();
  const ref = useRef();
  const user = useSelector(selectUserProfile);
  const darkMode = useSelector(selectDarkMode);
  const [profileImage, setProfileImage] = useState(currentProfileImage);
  const [showPreviewImage, setShowPreviewImage] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isImageEdited, setIsImageEdited] = useState(false);

  useEffect(() => {
    const handleKeydown = (event) =>
      event.key === "Escape" && setShowImageUploadModal(false);
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  const handleOverlayClick = (event) => {
    const { current } = ref;
    if (current === event.target) {
      setShowImageUploadModal(false);
    }
  };

  const handleAccept = async () => {
    if (profileImage && isImageEdited) {
      const formData = new FormData();
      formData.append("image", profileImage);

      const urlImage = dispatch(uploadImage(formData));

      urlImage
        .then((result) => {
          dispatch(updateUserProfile({ id: user.id, profile_image: result }));
          Swal.fire({
            icon: "success",
            position: "top-end",
            toast: true,
            title: "Foto de perfil actualizada",
            text: "La imagen se ha subido correctamente.",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: false,
            background: darkMode ? "#383636" : "#FFF",
            color: darkMode ? "#FFF" : "#545454",
          });
        })
        .catch((error) => {
          console.error("Error al obtener la URL de la imagen:", error);
        });
    } else {
      setShowImageUploadModal(false);
    }

    setShowImageUploadModal(false);
  };

  const handleFileChange = (file) => {
    setIsImageEdited(true);

    if (file) {
      if (file.type.startsWith("image/")) {
        setProfileImage(file);
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
      timer: 2500,
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
        <div className={styles.modal_header}>
          <h2 className={styles.modal_title}>
            Cambiar
            <br />
            foto de perfil
          </h2>
        </div>
        <div className={styles.modal_content}>
          {showPreviewImage ? (
            <div className={styles.preview}>
              <button
                onClick={() => {
                  setShowPreviewImage(false);
                  setProfileImage(null);
                }}
                title="Eliminar"
              >
                &#128473;
              </button>
              <img
                src={getImageSrc(profileImage)}
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
                  name="profileImage"
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
              disabled={!profileImage || !isImageEdited || errorMessage}
              autoFocus
            >
              Aceptar
            </button>
            <button
              className={styles.cancel_button}
              onClick={() => setShowImageUploadModal(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

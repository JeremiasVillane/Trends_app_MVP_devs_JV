import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addGroupImage, createNewChatGroup } from "../../../redux/chatSlice";
import { selectUserProfile } from "../../../redux/UsersSlice";
import styles from "./GroupChatModal.module.css";

const GroupChatModalPage1 = ({ onNext, setShowGroupChatModal }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserProfile);
  const [groupName, setGroupName] = useState("");
  // const [groupImage, setGroupImage] = useState("");

  const [groupImage, setGroupImage] = useState(null);
  const [showPreviewImage, setShowPreviewImage] = useState(false);
  // const [uploading, setUploading] = useState(false);

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

  const handleFileChange = (event) => {
    setGroupImage(event.target.files[0]);
    setShowPreviewImage(true);
  };

  const handleUpload = async () => {
    if (groupImage) {
      const formData = new FormData();
      formData.append("image", groupImage);
      // try {
      //   setUploading(true);
      //   await axios.post(URLImage, formData, {
      //     withCredentials: "include",
      //   });
      //   updater();
      //   setShowPreviewImage(false);
      //   setUploading(false);
      // } catch (error) {
      //   console.error("Error uploading image:", error);
      //   setUploading(false);
      // }
    }
  };

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
        <input
          type="file"
          accept="image/*"
          name="groupImage"
          placeholder="Imagen del grupo"
          // value={groupImage}
          // onChange={(e) => setGroupImage(e.target.value)}
          onChange={handleFileChange}
        />
        {showPreviewImage && (
          <div className="preview">
            <button onClick={() => setShowPreviewImage(false)}>x</button>
            <img
              src={URL.createObjectURL(groupImage)}
              alt="Preview"
              className="preview_image"
            />
          </div>
        )}
        <div className={styles.buttons_container}>
          <button
            className={styles.page_button}
            onClick={handleNext}
            disabled={!groupName}
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

export default GroupChatModalPage1;

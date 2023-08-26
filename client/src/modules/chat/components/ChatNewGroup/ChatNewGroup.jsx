import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { createNewGroup } from "../../../../redux/chatSlice";
import styles from "./ChatNewGroup.module.css";

export const ChatNewGroup = () => {
  const dispatch = useDispatch();

  const [groupImage, setGroupImage] = useState(
    "https://archive.org/download/placeholder-image/placeholder-image.jpg"
  );
  const [groupName, setGroupName] = useState("");
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setGroupImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleCreate = () => {
    dispatch(createNewGroup({ name: groupName }));
    //! HACER DISPATCH PARA CAMBIAR LA IMAGEN
  };

  return (
    <form className={styles.mainContainer}>
      <img
        src={groupImage}
        alt="group-image"
        className={styles.groupImage}
        onClick={handleImageClick}
      />
      <div className={styles.inputDiv}>
        <input
          placeholder="Nombre del grupo"
          className={styles.input}
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
      </div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept="image/*"
        onChange={handleImageChange}
      />
      <button className={styles.createButton} onClick={handleCreate}>
        Crear grupo
      </button>
    </form>
  );
};

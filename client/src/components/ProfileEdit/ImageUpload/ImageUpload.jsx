import axios from "axios";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import { getUserInfo } from "../../../Redux/UsersSlice";
import style from "./ImageUpload.module.css";
const { VITE_URL } = import.meta.env;

const ImageUpload = ({ handleCancelButton }) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const URLImage = `${VITE_URL}/images/profile`;

  const onDrop = useCallback((acceptedFiles) => {
    const selectedImage = acceptedFiles[0];
    setImage({
      file: selectedImage,
      preview: URL.createObjectURL(selectedImage),
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleImageDeleteButton = () => {
    setImage(null);
  };

  const handleUploadButton = async () => {
    if (image) {
      const formData = new FormData();
      formData.append("image", image.file);

      try {
        await axios
          .post(URLImage, formData, {
            withCredentials: "include",
          })
          .then(() => {
            dispatch(getUserInfo());
          });

        setImage(null);
        handleCancelButton();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className={style.mainDiv}>
      <div
        className={style.blackContainer}
        onClick={() => handleCancelButton()}
      ></div>
      <div className={style.whiteContainer}>
        <div className={style.TopContainer}>
          <h2 className={style.Title}>Cambiar foto de perfil</h2>
        </div>

        <div className={style.ImageContainer}>
          {image ? (
            <div className={style.previewImageContainer}>
              <div className={style.Background}>
                <img src={image.preview} className={style.previewImage} />
                <button
                  className={style.previewImageDeleteButton}
                  onClick={() => handleImageDeleteButton()}
                >
                  X
                </button>
              </div>
            </div>
          ) : (
            <div {...getRootProps()} className={style.dropzoneBox}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <p className={style.dropzoneText}>Suelta tu foto aquí...</p>
              ) : (
                <p className={style.dropzoneText}>
                  Arrastra y suelta una foto aquí.
                  <br /><br /><br />
                  O haz clic para cargar una imagen.
                </p>
              )}
            </div>
          )}
        </div>
        <div className={style.buttonDiv}>
          <button className={style.saveButton} onClick={handleUploadButton}>
            Subir
          </button>
          <button className={style.cancelButton} onClick={handleCancelButton}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export { ImageUpload };

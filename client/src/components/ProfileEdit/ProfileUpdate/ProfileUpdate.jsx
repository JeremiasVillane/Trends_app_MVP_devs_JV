import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUserProfile,
  updateUserProfile,
} from "../../../Redux/UsersSlice";
import style from "./ProfileUpdate.module.css";

const ProfileUpdate = ({ handleCancelButton }) => {
  const dispatch = useDispatch();
  const userData = useSelector(selectUserProfile);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    setEditData({ ...userData });
  }, []);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    if (name === "info_skills") {
      setEditData((prevData) => ({
        ...prevData,
        [name]: value.split(", "),
      }));
    } else {
      setEditData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await dispatch(updateUserProfile(editData)).then((data) => {
      setEditData(data);
    });

    handleCancelButton();
  };

  return (
    <div className={style.mainDiv}>
      <div
        className={style.blackContainer}
        onClick={() => handleCancelButton()}
      ></div>
      <div className={`${style.whiteContainer} ${style.GeneralContainer}`}>
        <div className={style.TopContainer}>
          <h2 className={style.Title}>Editar información de perfil</h2>
          <button onClick={handleCancelButton}>X</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={`${style.ImageContainer} ${style.InfoContainer}`}>
            <div className={style.Option}>
              <label htmlFor="username"> Nombre de usuario*</label>
              <input
                name="username"
                id="username"
                value={editData.username}
                type="text"
                onChange={handleOnChange}
              />
            </div>
            <div className={style.Option}>
              <label htmlFor="name"> Nombre completo*</label>
              <input
                name="name"
                id="name"
                value={editData.name}
                type="text"
                onChange={handleOnChange}
              />
            </div>

            <div className={style.Option}>
              <label htmlFor="email"> Correo electrónico*</label>
              <input
                name="email"
                id="email"
                value={editData.email}
                type="text"
                onChange={handleOnChange}
              />
            </div>
            <div className={style.Option}>
              <label htmlFor="info_skills"> Habilidades*</label>
              <input
                name="info_skills"
                id="info_skills"
                value={
                  editData.info_skills ? editData.info_skills.join(", ") : null
                }
                type="text"
                onChange={handleOnChange}
              />
            </div>

            <div className={style.Option}>
              <label htmlFor="profile_country"> País*</label>
              <input
                name="profile_country"
                id="profile_country"
                value={editData.profile_country}
                type="text"
                onChange={handleOnChange}
              />
            </div>

            <div className={style.Option}>
              <label htmlFor="profile_city"> Ciudad*</label>
              <input
                name="profile_city"
                id="profile_city"
                value={editData.profile_city}
                type="text"
                onChange={handleOnChange}
              />
            </div>

            <div className={style.Option}>
              <label htmlFor="profile_bio">Biografía</label>
              <textarea
                name="profile_bio"
                id="profile_bio"
                value={editData.profile_bio}
                type="text"
                className={style.BioInput}
                onChange={handleOnChange}
              />
            </div>

            <h4 className={style.SubTitle}>Estudios</h4>
            <div className={style.Option}>
              <label htmlFor="academic_formation">Formación</label>
              <input
                name="academic_formation"
                id="academic_formation"
                value={editData.academic_formation}
                type="text"
                onChange={handleOnChange}
              />
            </div>

            <div className={style.Option}>
              <label htmlFor="academic_institution">Institución</label>
              <input
                name="academic_institution"
                id="academic_institution"
                value={editData.academic_institution}
                type="text"
                onChange={handleOnChange}
              />
            </div>

            <div className={style.Option}>
              <label htmlFor="academic_level">Nivel académico</label>
              <input
                name="academic_level"
                id="academic_level"
                value={editData.academic_level}
                type="text"
                onChange={handleOnChange}
              />
            </div>

            <div className={style.Option}>
              <label htmlFor="graduation">Año de graduación</label>
              <input
                name="graduation"
                id="graduation"
                value={editData.graduation}
                type="text"
                onChange={handleOnChange}
              />
            </div>
          </div>
          <div className={style.buttonDiv}>
            <button className={style.saveButton} type="submit">
              SUBIR
            </button>
            <button className={style.cancelButton} onClick={handleCancelButton}>
              CANCELAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export { ProfileUpdate };

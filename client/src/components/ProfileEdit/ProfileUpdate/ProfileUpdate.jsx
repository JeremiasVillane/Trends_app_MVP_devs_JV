import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  selectDarkMode,
  selectUserProfile,
  updateUserProfile,
} from "../../../Redux/UsersSlice";
import profileCompletionPercentage from "../../../utils/profileCompletionPercentage.js";
import style from "./ProfileUpdate.module.css";

const ProfileUpdate = ({ handleCancelButton }) => {
  const dispatch = useDispatch();
  const userData = useSelector(selectUserProfile);
  const darkMode = useSelector(selectDarkMode);
  const [editData, setEditData] = useState({});
  const MySwal = withReactContent(Swal);

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

    const completionPercentage = profileCompletionPercentage(userData);

    const updatedKind =
      Number(completionPercentage) >= 80 ? "complete" : completionPercentage;

    await dispatch(updateUserProfile({ ...editData, kind: updatedKind })).then(
      (data) => {
        setEditData(data);
      }
    );

    handleCancelButton();

    MySwal.fire({
      icon: "success",
      position: "top-end",
      toast: true,
      title:
        completionPercentage < 93
          ? `Perfil actualizado \n(${completionPercentage}% completo)`
          : "Perfil actualizado",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: false,
      background: darkMode ? "#383636" : "#FFF",
      color: darkMode ? "#FFF" : "#545454",
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
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
          {/* <button onClick={handleCancelButton}>X</button> */}
        </div>

        <form onSubmit={handleSubmit}>
          <div className={`${style.ImageContainer} ${style.InfoContainer}`}>
            <h4 className={style.SubTitle}>Información de la cuenta</h4>
            <div className={style.Option}>
              <label htmlFor="username">Nombre de usuario*</label>
              <input
                name="username"
                id="username"
                value={editData?.username}
                type="text"
                disabled={true}
                onChange={handleOnChange}
              />
            </div>

            <div className={style.Option}>
              <label htmlFor="email">Correo electrónico*</label>
              <input
                name="email"
                id="email"
                value={editData?.email}
                type="text"
                disabled={true}
                onChange={handleOnChange}
              />
            </div>

            <div className={style.Option}>
              <label htmlFor="name">Nombre completo*</label>
              <input
                name="name"
                id="name"
                value={editData?.name}
                type="text"
                onChange={handleOnChange}
              />
            </div>

            <div className={style.Option}>
              <label htmlFor="profile_country">País*</label>
              <input
                name="profile_country"
                id="profile_country"
                value={editData?.profile_country}
                type="text"
                onChange={handleOnChange}
              />
            </div>

            <div className={style.Option}>
              <label htmlFor="profile_city"> Ciudad*</label>
              <input
                name="profile_city"
                id="profile_city"
                value={editData?.profile_city}
                type="text"
                onChange={handleOnChange}
              />
            </div>

            <div className={style.Option}>
              <label htmlFor="profile_bio">Biografía</label>
              <textarea
                name="profile_bio"
                id="profile_bio"
                value={editData?.profile_bio}
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
                value={editData?.academic_formation}
                type="text"
                onChange={handleOnChange}
              />
            </div>

            <div className={style.Option}>
              <label htmlFor="academic_institution">Institución</label>
              <input
                name="academic_institution"
                id="academic_institution"
                value={editData?.academic_institution}
                type="text"
                onChange={handleOnChange}
              />
            </div>

            <div className={style.Option}>
              <label htmlFor="academic_level">Nivel académico</label>
              <input
                name="academic_level"
                id="academic_level"
                value={editData?.academic_level}
                type="text"
                onChange={handleOnChange}
              />
            </div>

            <div className={style.Option}>
              <label htmlFor="info_career">Carrera</label>
              <input
                name="info_career"
                id="info_career"
                value={editData?.info_career}
                type="text"
                onChange={handleOnChange}
              />
            </div>

            <div className={style.Option}>
              <label htmlFor="academic_graduation">Año de graduación</label>
              <input
                name="academic_graduation"
                id="academic_graduation"
                value={editData?.academic_graduation}
                type="text"
                onChange={handleOnChange}
              />
            </div>

            <div className={style.Option}>
              <label htmlFor="info_languages">Idiomas</label>
              <input
                name="info_languages"
                id="info_languages"
                value={editData?.info_languages}
                type="text"
                onChange={handleOnChange}
              />
            </div>

            <div className={style.Option}>
              <label htmlFor="info_interests">Intereses</label>
              <input
                name="info_interests"
                id="info_interests"
                value={editData?.info_interests}
                type="text"
                onChange={handleOnChange}
              />
            </div>

            <div className={style.Option}>
              <label htmlFor="info_skills">Habilidades*</label>
              <input
                name="info_skills"
                id="info_skills"
                value={
                  editData?.info_skills
                    ? editData?.info_skills.join(", ")
                    : null
                }
                type="text"
                onChange={handleOnChange}
              />
            </div>

            <div className={style.Option}>
              <label htmlFor="info_goals">Objetivos</label>
              <input
                name="info_goals"
                id="info_goals"
                value={editData?.info_goals}
                type="text"
                onChange={handleOnChange}
              />
            </div>

            <div className={style.Option}>
              <label htmlFor="info_problematic">Problemática</label>
              <input
                name="info_problematic"
                id="info_problematic"
                value={editData?.info_problematic}
                type="text"
                onChange={handleOnChange}
              />
            </div>

            <h4 className={style.SubTitle}>Búsqueda laboral</h4>
            <div className={style.Option}>
              <label htmlFor="info_contract">
                Tipo de contratación buscada
              </label>
              <input
                name="info_contract"
                id="info_contract"
                value={editData?.info_contract}
                type="text"
                onChange={handleOnChange}
              />
            </div>

            <div className={style.Option}>
              <label htmlFor="info_availability">Disponibilidad</label>
              <input
                name="info_availability"
                id="info_availability"
                value={editData?.info_availability}
                type="text"
                onChange={handleOnChange}
              />
            </div>
          </div>
          <div className={style.buttonDiv}>
            <button className={style.saveButton} type="submit">
              ACTUALIZAR
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

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { selectDarkMode } from "../../../../../redux/uiSlice";
import {
  selectUserProfile,
  updateUserProfile,
} from "../../../../../redux/usersSlice";
import {
  academicFormation,
  academicLevel,
  checkboxInterests,
  checkboxProfessionalGoals,
  checkboxProfessionalProbleatics,
  checkboxStudentGoals,
  checkboxStudentProbleatics,
  infoAvailability,
  infoContract,
} from "../../../../auth/data";
import { profileCompletionPercentage } from "../../utils";
import styles from "./ProfileUpdateModal.module.css";

export const ProfileUpdateModal = ({ handleCancelButton }) => {
  const ref = useRef();
  const dispatch = useDispatch();
  const userData = useSelector(selectUserProfile);
  const darkMode = useSelector(selectDarkMode);
  const [editData, setEditData] = useState({});
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [selectedGoals, setSelectedGoals] = useState([]);
  const [selectedProblematics, setSelectedProblematics] = useState([]);
  const MySwal = withReactContent(Swal);

  const checkboxGoals =
    userData?.type === "student"
      ? checkboxStudentGoals
      : checkboxProfessionalGoals;

  const checkboxProblematics =
    userData?.type === "student"
      ? checkboxStudentProbleatics
      : checkboxProfessionalProbleatics;

  useEffect(() => {
    const handleKeydown = (event) =>
      event.key === "Escape" && handleCancelButton();
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  const handleOverlayClick = (event) => {
    const { current } = ref;
    if (current === event.target) {
      handleCancelButton();
    }
  };

  useEffect(() => {
    setEditData({ ...userData });
    setSelectedInterests(userData?.info_interests);
    setSelectedGoals(userData?.info_goals);
    setSelectedProblematics(userData?.info_problematic);
  }, []);

  useEffect(() => {
    setEditData((prevEditData) => ({
      ...prevEditData,
      info_interests: selectedInterests,
      info_goals: selectedGoals,
      info_problematic: selectedProblematics,
    }));
  }, [selectedInterests, selectedGoals, selectedProblematics]);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    if (
      [
        "academic_area",
        "info_skills",
        "info_languages",
        "info_career",
      ]?.includes(name)
    ) {
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

  const handleCheckboxChange = (event, field) => {
    const fieldId = parseInt(event.target.value);
    const checkboxField =
      field === "interest"
        ? checkboxInterests
        : field === "goal"
        ? checkboxGoals
        : field === "problematic"
        ? checkboxProblematics
        : null;
    const selectedOptions =
      field === "interest"
        ? selectedInterests
        : field === "goal"
        ? selectedGoals
        : field === "problematic"
        ? selectedProblematics
        : null;
    const setSelectedOptions =
      field === "interest"
        ? setSelectedInterests
        : field === "goal"
        ? setSelectedGoals
        : field === "problematic"
        ? setSelectedProblematics
        : null;

    const selectedOption = checkboxField.find((field) => field.id === fieldId);

    if (selectedOptions.includes(selectedOption.label)) {
      setSelectedOptions(
        selectedOptions.filter((field) => field !== selectedOption.label)
      );
    } else {
      setSelectedOptions([...selectedOptions, selectedOption.label]);
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
    <div
      className={styles.modal_overlay}
      ref={ref}
      onClick={handleOverlayClick}
    >
      <div className={styles.modal_container}>
        <div className={styles.modal_header}>
          <h2 className={styles.modal_title}>Editar información de perfil</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.modal_content}>
            <h4 className={styles.subtitle}>Información de la cuenta</h4>
            <div className={styles.option}>
              <label htmlFor="username">Nombre de usuario</label>
              <input
                name="username"
                id="username"
                value={editData?.username || ""}
                type="text"
                disabled={true}
                style={{
                  cursor: "not-allowed",
                  outline: "none",
                  background: darkMode ? "#bbb" : "#e0e0e0",
                  color: "#202020",
                }}
                onChange={handleOnChange}
              />
            </div>

            <div className={styles.option}>
              <label htmlFor="email">Correo electrónico</label>
              <input
                name="email"
                id="email"
                value={editData?.email || ""}
                type="text"
                disabled={true}
                style={{
                  cursor: "not-allowed",
                  outline: "none",
                  background: darkMode ? "#bbb" : "#e0e0e0",
                  color: "#202020",
                }}
                onChange={handleOnChange}
              />
            </div>

            <div className={styles.option}>
              <label htmlFor="name">Nombre completo</label>
              <input
                name="name"
                id="name"
                value={editData?.name || ""}
                type="text"
                autoComplete="given-name"
                onChange={handleOnChange}
              />
            </div>

            <div className={styles.option}>
              <label htmlFor="profile_country">País</label>
              <input
                name="profile_country"
                id="profile_country"
                value={editData?.profile_country || ""}
                type="text"
                onChange={handleOnChange}
              />
            </div>

            <div className={styles.option}>
              <label htmlFor="profile_city">Ciudad</label>
              <input
                name="profile_city"
                id="profile_city"
                value={editData?.profile_city || ""}
                type="text"
                onChange={handleOnChange}
              />
            </div>

            <div className={styles.option}>
              <label htmlFor="profile_bio">Biografía</label>
              <textarea
                name="profile_bio"
                id="profile_bio"
                value={editData?.profile_bio}
                type="text"
                className={styles.bio_field}
                onChange={handleOnChange}
                autoComplete="off"
              />
            </div>

            <h4 className={styles.subtitle}>Estudios</h4>
            <div className={styles.option}>
              <label htmlFor="academic_formation">Formación</label>
              <select
                name="academic_formation"
                onChange={handleOnChange}
                value={editData?.academic_formation || ""}
              >
                {academicFormation.map((element, index) => (
                  <option key={index}>{element}</option>
                ))}
              </select>
            </div>

            <div className={styles.option}>
              <label htmlFor="academic_level">Nivel académico</label>
              <select
                name="academic_level"
                onChange={handleOnChange}
                value={editData?.academic_level || ""}
              >
                {academicLevel.map((element, index) => (
                  <option key={index}>{element}</option>
                ))}
              </select>
            </div>

            <div className={styles.option}>
              <label htmlFor="academic_institution">Institución</label>
              <input
                name="academic_institution"
                id="academic_institution"
                value={editData?.academic_institution || ""}
                type="text"
                onChange={handleOnChange}
              />
            </div>

            <div className={styles.option}>
              <label htmlFor="info_career">
                Carrera <em>(separadas por coma)</em>
              </label>
              <input
                name="info_career"
                id="info_career"
                value={editData?.info_career || ""}
                type="text"
                onChange={handleOnChange}
              />
            </div>

            <div className={styles.option}>
              <label htmlFor="academic_graduation">Año de graduación</label>
              <input
                name="academic_graduation"
                id="academic_graduation"
                value={editData?.academic_graduation || ""}
                type="number"
                style={{ cursor: "pointer" }}
                onChange={handleOnChange}
              />
            </div>

            <div className={styles.option}>
              <label htmlFor="info_languages">
                Idiomas <em>(separados por coma)</em>
              </label>
              <input
                name="info_languages"
                id="info_languages"
                value={editData?.info_languages?.join(", ") || ""}
                type="text"
                onChange={handleOnChange}
              />
            </div>

            <div className={styles.option}>
              <label>
                Habilidades <em>(separadas por coma)</em>
              </label>
              <input
                name="info_skills"
                id="info_skills"
                value={
                  editData?.info_skills ? editData?.info_skills.join(", ") : ""
                }
                type="text"
                onChange={handleOnChange}
              />
            </div>

            <h4 className={styles.subtitle}>Perfil</h4>
            <div className={styles.option}>
              <label htmlFor="info_interests">Intereses</label>
            </div>
            <details
              name="info_interests"
              style={{
                margin: "-1rem 0 1rem 1rem",
                color: darkMode ? "#b8b8b8" : "black",
              }}
            >
              <summary
                style={{
                  color: darkMode ? "#b8b8b8" : "black",
                  cursor: "pointer",
                }}
              >
                <em>Mostrar</em>
              </summary>
              <div className={styles.checkboxes_list}>
                {checkboxInterests.map((interest) => (
                  <label key={interest.id} style={{ cursor: "pointer" }}>
                    <div className={styles.Options}>
                      <div>
                        <input
                          type="checkbox"
                          className={styles.ui_checkbox}
                          value={interest.id}
                          checked={selectedInterests?.includes(interest.label)}
                          onChange={(event) =>
                            handleCheckboxChange(event, "interest")
                          }
                        />
                        {interest.label}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </details>

            <div className={styles.option}>
              <label>Objetivos</label>
            </div>
            <details
              name="info_goals"
              style={{
                margin: "-1rem 0 1rem 1rem",
                color: darkMode ? "#b8b8b8" : "black",
              }}
            >
              <summary
                style={{
                  color: darkMode ? "#b8b8b8" : "black",
                  cursor: "pointer",
                }}
              >
                <em>Mostrar</em>
              </summary>
              <div className={styles.checkboxes_list}>
                {checkboxGoals.map((goal) => (
                  <label key={goal.id} style={{ cursor: "pointer" }}>
                    <div className={styles.Options}>
                      <div>
                        <input
                          type="checkbox"
                          className={styles.ui_checkbox}
                          value={goal.id}
                          checked={selectedGoals?.includes(goal.label)}
                          onChange={(event) =>
                            handleCheckboxChange(event, "goal")
                          }
                        />
                        {goal.label}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </details>

            <div className={styles.option}>
              <label>Problemática</label>
            </div>
            <details
              name="info_problematic"
              style={{
                margin: "-1rem 0 1rem 1rem",
                color: darkMode ? "#b8b8b8" : "black",
              }}
            >
              <summary
                style={{
                  color: darkMode ? "#b8b8b8" : "black",
                  cursor: "pointer",
                }}
              >
                <em>Mostrar</em>
              </summary>
              <div className={styles.checkboxes_list}>
                {checkboxProblematics.map((problematic) => (
                  <label key={problematic.id} style={{ cursor: "pointer" }}>
                    <div className={styles.Options}>
                      <div>
                        <input
                          type="checkbox"
                          className={styles.ui_checkbox}
                          value={problematic.id}
                          checked={selectedProblematics?.includes(
                            problematic.label
                          )}
                          onChange={(event) =>
                            handleCheckboxChange(event, "problematic")
                          }
                        />
                        {problematic.label}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </details>

            <h4 className={styles.subtitle}>Búsqueda laboral</h4>
            <div className={styles.option}>
              <label htmlFor="info_contract">
                Tipo de contratación buscada
              </label>
              <select
                name="info_contract"
                onChange={handleOnChange}
                value={editData?.info_contract || ""}
              >
                {infoContract.map((element, index) => (
                  <option key={index}>{element}</option>
                ))}
              </select>
            </div>

            <div className={styles.option}>
              <label htmlFor="info_availability">Disponibilidad</label>
              <select
                name="info_availability"
                onChange={handleOnChange}
                value={editData?.info_availability || ""}
              >
                {infoAvailability.map((element, index) => (
                  <option key={index}>{element}</option>
                ))}
              </select>
            </div>
          </div>
          <div className={styles.buttons_container}>
            <button className={styles.ok_button} type="submit">
              Actualizar
            </button>
            <button
              className={styles.cancel_button}
              onClick={handleCancelButton}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

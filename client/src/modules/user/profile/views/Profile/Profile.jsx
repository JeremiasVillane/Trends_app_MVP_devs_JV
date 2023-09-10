import { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Animate } from "react-simple-animate";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { ImageUploadModal, ProfileUpdateModal } from "../../modals";
import { selectDarkMode } from "../../../../../redux/uiSlice";
import {
  getUserInfo,
  selectUserProfile,
  updateUserProfile,
} from "../../../../../redux/usersSlice";
import { translateUserType } from "../../../../../utils/helpers";
import { Avatar } from "../../../../chat/components/main";
import styles from "./Profile.module.css";

const Profile = () => {
  const MySwal = withReactContent(Swal);
  const dispatch = useDispatch();
  const userData = useSelector(selectUserProfile);
  const darkMode = useSelector(selectDarkMode);
  const [userStatus, setUserStatus] = useState(userData?.status || "online");
  const [image, setImage] = useState(null);
  const [showImageUploadModal, setShowImageUploadModal] = useState(false);
  const [isEditing, setIsEditing] = useState({
    image: false,
    general: false,
  });
  const lightColor = "#232323";
  const darkColor = "#FFF";

  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  useEffect(() => {
    if (userData.profile_image) {
      setImage(userData.profile_image);
    }
  }, [userData]);

  useEffect(() => {
    userData?.kind !== undefined &&
      userData?.kind !== "complete" &&
      MySwal.fire({
        icon: "info",
        position: "top-end",
        toast: true,
        title: "Completa tu perfil",
        text:
          userData?.kind === "incomplete"
            ? "Completa tu datos en 1 minuto para poder mejorar nuestras recomendaciones."
            : userData?.kind === "ongoing"
            ? "Tu perfil está incompleto. Termina de completarlo para poder mejorar nuestras recomendaciones."
            : `Tu perfil está un ${userData?.kind}% completo. Termina de completarlo para poder mejorar nuestras recomendaciones.`,
        confirmButtonText: "Completar",
        confirmButtonColor: "#3085d6",
        showCancelButton: true,
        cancelButtonText: "Saltar",
        background: darkMode ? "#383636" : "#FFF",
        color: darkMode ? "#FFF" : "#545454",
        timer: 5555,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      }).then((result) => {
        if (result.isConfirmed) {
          handleGeneralEdit();
        }
      });
  }, []);

  const handleGeneralChangeButton = () => {
    setIsEditing((prevState) => ({ ...prevState, general: false }));
  };

  const handleGeneralEdit = () => {
    setIsEditing({
      ...isEditing,
      general: true,
    });
  };

  const handleImageEdit = () => {
    setShowImageUploadModal(true);
  };

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

  const handleStatusSelect = (event) => {
    const { value } = event.target;
    setUserStatus(value);
    dispatch(updateUserProfile({ id: userData.id, status: value }));
    dispatch(getUserInfo());
  };

  return (
    <>
      <div className={styles.main_container}>
        <header>
          <div
            className={styles.image_container}
            onClick={handleImageEdit}
            title="Editar imagen de perfil"
          >
            <Avatar
              imageUrl={getImageSrc(image)}
              altText={userData.name}
              size={"14rem"}
              status={userData.status}
              type={"profile"}
            />
            <div className={styles.icon_container}>
              <AiFillEdit size="6rem" color="white" />
            </div>
          </div>
          <h1>{translateUserType(userData?.type)}</h1>

          <button
            onClick={handleGeneralEdit}
            className={styles.edit_button}
            title="Editar perfil"
          >
            <AiFillEdit size="2rem" color={darkMode ? darkColor : lightColor} />
          </button>
        </header>

        <Animate play start={{ opacity: 0.3 }} end={{ opacity: 1 }}>
          <main>
            <div className={styles.container_infouser}>
              <section>
                <div className={styles.infouser_main}>
                  <h1>{userData?.name}</h1>
                  <div className={styles.user_status}>
                    <label htmlFor="user_status">
                      <strong>Estado: </strong>
                    </label>
                    <select
                      name="user_status"
                      id="user_status"
                      onChange={handleStatusSelect}
                      value={userStatus}
                      style={{ cursor: "pointer" }}
                    >
                      <option>online</option>
                      <option>offline</option>
                      <option>invisible</option>
                    </select>
                  </div>
                  {userData?.info_skills ? (
                    <h3>
                      <strong>{userData?.info_skills?.join(" | ")}</strong>
                    </h3>
                  ) : null}
                  {userData?.profile_city || userData?.profile_country ? (
                    <h3 className={styles.user_location}>
                      {`${userData?.profile_city}, ${userData?.profile_country}`}
                    </h3>
                  ) : null}
                </div>
              </section>
              <hr />
              {userData?.profile_bio ? (
                <section>
                  <h2>Biografía</h2>
                  <div className={styles.user_bio}>
                    <h3>{userData?.profile_bio}</h3>
                  </div>
                </section>
              ) : null}
              <hr />
              <section>
                {(userData.academic_area ||
                  userData.info_career ||
                  userData.academic_graduation ||
                  userData.academic_institution) && (
                  <h2>Información académica</h2>
                )}
                <div className={styles.user_bio}>
                  <h3>
                    <span>
                      <strong>Área de estudios:</strong>{" "}
                      {userData?.academic_area?.join(", ")}
                    </span>
                    <br />
                    <span>
                      <strong>Estudios:</strong>{" "}
                      {userData?.info_career?.join(", ")}
                    </span>
                    <br />
                    <span>
                      <strong>Año de graduación / previsto:</strong>{" "}
                      {userData?.academic_graduation}
                    </span>
                    <br />
                    <span>
                      <strong>Institución:</strong>{" "}
                      {userData.academic_institution}
                    </span>
                    <br />
                  </h3>
                </div>
              </section>
              <hr />
              <section>
                {(userData.info_interests ||
                  userData.info_languages ||
                  userData.info_goals ||
                  userData.info_skills) && <h2>Información Adicional</h2>}
                <div className={styles.user_bio}>
                  <h3>
                    {userData.info_interests && (
                      <span>
                        <strong>Intereses:</strong>{" "}
                        {userData.info_interests.join(", ")}
                      </span>
                    )}
                    <br />
                    {userData.info_languages && (
                      <span>
                        <strong>Idiomas:</strong>{" "}
                        {userData.info_languages.join(", ")}
                      </span>
                    )}
                    <br />
                    {userData.info_goals && (
                      <span>
                        <strong>Objetivos:</strong>{" "}
                        {userData.info_goals.join(", ")}
                      </span>
                    )}
                    <br />
                    {userData.info_skills && (
                      <span>
                        <strong>Habilidades:</strong>{" "}
                        {userData.info_skills.join(", ")}
                      </span>
                    )}
                    <br />
                  </h3>
                </div>
              </section>
            </div>
          </main>
        </Animate>
      </div>
      {showImageUploadModal && (
        <ImageUploadModal
          currentProfileImage={image}
          setShowImageUploadModal={setShowImageUploadModal}
        />
      )}
      {isEditing.general && (
        <ProfileUpdateModal handleCancelButton={handleGeneralChangeButton} />
      )}
    </>
  );
};

export default Profile;

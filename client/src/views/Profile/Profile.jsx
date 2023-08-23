import axios from "axios";
import { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { ImageUpload, ProfileUpdate } from "../../components/ProfileEdit";
import {
  getUserInfo,
  selectDarkMode,
  selectUserProfile,
} from "../../Redux/UsersSlice";
import style from "./Profile.module.css";
const { VITE_URL } = import.meta.env;

const Profile = () => {
  const dispatch = useDispatch();
  const userData = useSelector(selectUserProfile);
  const darkMode = useSelector(selectDarkMode);
  const [image, setImage] = useState(null);
  const [isEditing, setIsEditing] = useState({
    image: false,
    general: false,
  });
  const lightColor = "#232323";
  const darkColor = "#FFF";

  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  const MySwal = withReactContent(Swal);

  useEffect(() => {
    userData?.kind !== "complete" &&
      MySwal.fire({
        icon: "info",
        position: "top-end",
        toast: true,
        title: "Completa tu perfil",
        text:
          userData?.kind === "incomplete"
            ? "Completa tu datos en 1 minuto para poder mejorar nuestras recomendaciones"
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

  useEffect(() => {
    if (userData.profile_image) {
      loadImage();
    }
  }, [userData]);

  const loadImage = async () => {
    const URLImage = `${VITE_URL}${userData.profile_image}`;

    if (!userData.profile_image.startsWith("http")) {
      await axios
        .get(URLImage, { responseType: "blob", withCredentials: "include" })
        .then((response) => {
          const blob = new Blob([response.data], {
            type: response.headers["content-type"],
          });
          setImage(blob);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setImage(userData.profile_image);
    }
  };

  const handleImageChangeButton = () => {
    setIsEditing((prevState) => ({ ...prevState, image: false }));
  };

  const handleGeneralChangeButton = () => {
    setIsEditing((prevState) => ({ ...prevState, general: false }));
  };

  const handleGeneralEdit = () => {
    setIsEditing({
      ...isEditing,
      general: true,
    });
  };

  function getImageSrc(image) {
    if (typeof image === "string") {
      return image;
    } else if (typeof image === "object" && image instanceof File) {
      return URL.createObjectURL(image);
    } else {
      return "";
    }
  }

  return (
    <div className={style.BGContainer}>
      {isEditing.image && (
        <div className={style.EditPhoto}>
          <ImageUpload handleCancelButton={handleImageChangeButton} />
        </div>
      )}

      {isEditing.general && (
        <div className={style.EditPhoto}>
          <ProfileUpdate handleCancelButton={handleGeneralChangeButton} />
        </div>
      )}
      <header>
        <div
          className={style.ImageContainer}
          onClick={() =>
            setIsEditing((prevState) => ({
              ...prevState,
              image: !prevState.image,
            }))
          }
        >
          <img src={getImageSrc(image)} alt="Foto de perfil" />
          <div className={style.IconContainer}>
            <AiFillEdit size="6rem" color="white" />
          </div>
        </div>

        <h1>{userData?.type === "student" ? "Estudiante" : "Profesional"}</h1>

        <button onClick={handleGeneralEdit} className={style.EditButton}>
          <AiFillEdit size="2rem" color={darkMode ? darkColor : lightColor} />
        </button>
      </header>

      <main>
        <div className={style.Profile}>
          {/* <div className={style.container_infouser}>
            <div className={style.username}>
              <h1>{userData.name}</h1>
            </div>

            <div className={style.user_skill}>{userData?.info_skills ? 
                  userData.info_skills.join(" | ")
                 : null}</div>

            <div className={style.user_location}>
              <p>
                 {userData.profile_city}, {userData.profile_country}
              </p>
            </div>
            <hr />
            <div className={style.user_bio}>
              <p>{userData.profile_bio}</p>
            </div>
          </div> */}
          <section>
              <div className={style.FirstInfo}>
                <h1>{userData?.name}</h1>
                {userData?.info_skills ? (
                  <h3><strong>{userData?.info_skills.join(" | ")}</strong></h3>
                ) : null}
                {userData?.profile_city || userData?.profile_country ? (
                  <h3 className={style.user_location}>
                    {`${userData?.profile_city}, ${userData?.profile_country}`}
                  </h3>
                ) : null}
              </div>
          </section>
          <hr />
          {userData?.profile_bio ? (
            <section>
              <h2>Biografía</h2>
              <div className={style.Bio}>
                <h3>{userData?.profile_bio}</h3>
              </div>
            </section>
          ) : null}
          <hr />
          {userData?.academic_institution ||
          userData?.academic_formation ||
          userData?.academic_level ||
          userData?.academic_area ||
          userData?.academic_graduation ? (
            <section>
              <h2>Estudios</h2>
              <div className={style.Studies}>
                <p>{userData?.academic_institution}</p>
                <p>{userData?.academic_formation}</p>
              </div>
            </section>
          ) : null}
        </div>
      </main>
    </div>
  );
};

export default Profile;

import axios from "axios";
import { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { ImageUpload, ProfileUpdate } from "../../components/ProfileEdit";
import Relations from "../../components/Relations/Relations";
import { getUserInfo, selectUserProfile } from "../../Redux/UsersSlice";
import style from "./Profile.module.css";
const { VITE_URL } = import.meta.env;

const Profile = () => {
  const dispatch = useDispatch();
  const userData = useSelector(selectUserProfile);
  const [image, setImage] = useState(null);

  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  useEffect(() => {
    if (userData.profile_image) {
      loadImage();
    }
  }, [userData]);

  const loadImage = async () => {
    const URLImage = `${VITE_URL}${userData.profile_image}`;

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
  };

  const [isEditing, setIsEditing] = useState({
    image: false,
    general: false,
  });

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

  return (
    <div className={style.MajorContainer}>
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
            <img
              src={image ? URL.createObjectURL(image) : ""}
              alt="Foto de perfil"
            />
            <div className={style.Extra}></div>
            <div className={style.IconContainer}>
              <AiFillEdit size="6rem" color="white" />
            </div>
          </div>

          <h1>{userData.type === "student" ? "Estudiante" : "Profesional"}</h1>

          <button onClick={handleGeneralEdit} className={style.EditButton}>
            <AiFillEdit size="2rem" color="#344C5A" />
          </button>
        </header>

        <main>
          <div className={style.Profile}>
            <section>
              <div className={style.About}>
                <div className={style.FirstInfo}>
                  <h1>{userData.name}</h1>
                  {userData.info_skills ? (
                    <h3>{userData.info_skills.join(" | ")}</h3>
                  ) : null}
                  {userData.profile_city || userData.profile_country ? (
                    <h3>
                      {`${userData.profile_city} - ${userData.profile_country}`}{" "}
                    </h3>
                  ) : null}
                </div>
              </div>
            </section>
            <hr />
            {userData.profile_bio ? (
              <section>
                <h2>Biografía</h2>
                <div className={style.Bio}>
                  <h3>{userData.profile_bio}</h3>
                </div>
              </section>
            ) : null}
            <hr />
            {userData.academic_institution ||
            userData.academic_formation ||
            userData.academic_level ||
            userData.academic_area ||
            userData.academic_graduation ? (
              <section>
                <h2>Estudios</h2>
                <div className={style.Studies}>
                  <h3>{userData.academic_institution}</h3>
                </div>
                <div>
                  <h3>{userData.academic_formation}</h3>
                </div>
              </section>
            ) : null}
          </div>

          <div className={style.Relations}>
            <Relations />
            <Relations />
            <Relations />
            <Relations />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;

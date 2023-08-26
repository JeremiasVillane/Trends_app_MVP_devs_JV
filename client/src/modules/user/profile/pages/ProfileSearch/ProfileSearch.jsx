import axios from "axios";
import { useEffect, useState } from "react";
import { HiChat } from "react-icons/hi";
import { useParams } from "react-router-dom";
import { Animate } from "react-simple-animate";
import styles from "./ProfileSearch.module.css";
const { VITE_URL } = import.meta.env;

const ProfileSearch = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState({});
  const URL = `${VITE_URL}/search/user/${id}`;
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetch = await axios.get(URL, { withCredentials: "include" });
        const data = fetch.data;
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

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

  function getImageSrc(image) {
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
  }

  return (
    <div className={styles.BGContainer}>
      <header>
        <div className={styles.ImageContainer}>
          <img src={getImageSrc(image)} alt="" />
        </div>

        <h1>{userData.type === "student" ? "Estudiante" : "Profesional"}</h1>

        <button className={styles.ChatButton}>
          <HiChat size="2rem" color="#344C5A" />
        </button>
      </header>

      <Animate play start={{ opacity: 0.3 }} end={{ opacity: 1 }}>
        <main>
          <div className={styles.Profile}>
            <section>
              <div className={styles.FirstInfo}>
                <h1>{userData.name}</h1>
                {userData.info_skills ? (
                  <h3>
                    <strong>{userData.info_skills.join(" | ")}</strong>
                  </h3>
                ) : null}
                {userData.profile_city || userData.profile_country ? (
                  <h3 className={styles.user_location}>
                    {`${userData.profile_city}, ${userData.profile_country}`}
                  </h3>
                ) : null}
              </div>
            </section>
            <hr />
            {userData.profile_bio ? (
              <section>
                <h2>Biografía</h2>
                <div className={styles.Bio}>
                  <h3>{userData.profile_bio}</h3>
                </div>
              </section>
            ) : null}
            <hr />
            {(userData.academic_area ||
              userData.info_career ||
              userData.academic_graduation ||
              userData.academic_institution) && (
              <section>
                <h2>Información académica</h2>
                <div className={styles.Bio}>
                  <h3>
                    <strong>Área de estudios:</strong>{" "}
                    {userData?.academic_area.join(", ")}
                  </h3>
                  <h3>
                    <strong>Estudios:</strong>{" "}
                    {userData?.info_career.join(", ")}
                  </h3>
                  <h3>
                    <strong>Año de graduación / previsto:</strong>{" "}
                    {userData?.academic_graduation}
                  </h3>
                  <h3>
                    <strong>Institución:</strong>{" "}
                    {userData.academic_institution}
                  </h3>
                </div>
              </section>
            )}
            <hr />
            {(userData.info_interests ||
              userData.info_languages ||
              userData.info_goals ||
              userData.info_skills) && (
              <section>
                <h2>Información Adicional</h2>
                <div className={styles.Bio}>
                  <h3>
                    <strong>Intereses:</strong>{" "}
                    {userData?.info_interests.join(", ")}
                  </h3>
                  <h3>
                    <strong>Idiomas:</strong>{" "}
                    {userData?.info_languages.join(", ")}
                  </h3>
                  <h3>
                    <strong>Objetivos:</strong>{" "}
                    {userData?.info_goals.join(", ")}
                  </h3>
                  <h3>
                    <strong>Habilidades:</strong>{" "}
                    {userData?.info_skills.join(", ")}
                  </h3>
                </div>
              </section>
            )}
          </div>
        </main>
      </Animate>
    </div>
  );
};

export default ProfileSearch;

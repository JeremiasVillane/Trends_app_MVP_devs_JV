import axios from "axios";
import { useEffect, useState } from "react";
import { HiChat } from "react-icons/hi";
import { useParams } from "react-router-dom";
import style from "./ProfileSearch.module.css";
const { VITE_URL } = import.meta.env;

const ProfileSearch = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState({});
  const URL = `${VITE_URL}/search/user/${id}`;

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

  return (
    <div className={style.BGContainer}>
      <header>
        <div className={style.ImageContainer}>
          <img src={userData.profile_image} alt="Foto de perfil" />
        </div>

        <h1>{userData.type === "student" ? "Estudiante" : "Profesional"}</h1>

        <button className={style.ChatButton}>
          <HiChat size="2rem" color="#344C5A" />
        </button>
      </header>

      <main>
        <div className={style.Profile}>
          <section>
            <div className={style.FirstInfo}>
              <h1>{userData.name}</h1>
              {userData.info_skills ? (
                <h3><strong>{userData.info_skills.join(" | ")}</strong></h3>
              ) : null}
              {userData.profile_city || userData.profile_country ? (
                <h3 className={style.user_location}>
                  {`${userData.profile_city}, ${userData.profile_country}`}
                </h3>
              ) : null}
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
                <p>{userData.academic_institution}</p>
                <p>{userData.academic_formation}</p>
              </div>
            </section>
          ) : null}
        </div>
      </main>
    </div>
  );
};

export default ProfileSearch;

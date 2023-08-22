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
          <section>
            <h2>Biography</h2>
            <div className={style.Bio}>
              <h3>{userData.profile_bio}</h3>
            </div>
          </section>
          <hr />
          <section>
            <h2>Studies</h2>
            <div className={style.Studies}>
              <h3>{userData.academic_institution}</h3>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ProfileSearch;

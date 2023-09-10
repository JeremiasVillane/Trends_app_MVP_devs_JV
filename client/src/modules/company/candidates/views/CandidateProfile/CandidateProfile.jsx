import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./CandidateProfile.module.css";
const { VITE_URL } = import.meta.env;

export const CandidateProfile = (candidateId) => {
  const [profile, setProfile] = useState();

  //?FUNCION PARA OBTENER UNA CADENA DE CONSULTA UNICA Y SE ACTUALICEN LOS DATOS (SIMULA CTRL+F5)
  function getUniqueQueryString() {
    return `?_=${Date.now()}`;
  }

  const fetchCandidate = async () => {
    const URL = `${VITE_URL}/search/user/${candidateId.candidateId}`;

    try {
      const { data } = await axios.get(URL + getUniqueQueryString(), {
        withCredentials: "include",
      });

      setProfile(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  //?AL MONTARSE COMPONENTE
  useEffect(() => {
    fetchCandidate();
  }, []);

  return (
    <div>
      {profile && (
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.headerTitle1}>Perfil de Candidato</h1>
            <h1 className={styles.headerTitle2}>
              {profile.type ? profile.type : null}
            </h1>
          </div>
          <div className={styles.imageProfile}>
            <img
              src={profile.profile_image ? profile.profile_image : null}
              alt="image"
            />
          </div>
          <div className={styles.body}>
            <h1>{profile.name}</h1>
            <h3>{profile.profile_bio}</h3>
            <h3>email: {profile.email}</h3>
            <h3>
              {profile.profile_city}, {profile.profile_country}
            </h3>
            <h3>disponibilidad: {profile.info_availability}</h3>
            <h3>preferencia contratacion: {profile.info_contract}</h3>
            <h3 className={styles.subtitulo}>Informacion Academica</h3>
            <h3>Area de estudios: {profile.academic_area.join(", ")}</h3>
            <h3>Estudios: {profile.info_career.join(", ")}</h3>
            <h3>Año de graduacion / previsto: {profile.academic_graduation}</h3>
            <h3>Institucion: {profile.academic_institution}</h3>
            <h3 className={styles.subtitulo}>Informacion Adicional</h3>
            <h3>Intereses: {profile.info_interests.join(", ")}</h3>
            <h3>Idiomas: {profile.info_languages.join(", ")}</h3>
            <h3>Objetivos: {profile.info_goals.join(", ")}</h3>
            <h3>Habilidades: {profile.info_skills.join(", ")}</h3>
            <hr></hr>
          </div>
        </div>
      )}
    </div>
  );
};

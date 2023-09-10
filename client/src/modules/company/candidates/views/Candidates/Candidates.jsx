import axios from "axios";
import { useEffect, useState } from "react";
import { HiAcademicCap, HiBriefcase, HiChat, HiUser } from "react-icons/hi";
import styles from "./Candidates.module.css";

export const Candidates = ({
  jobId,
  jobName,
  handlePageProfileCandidate,
}) => {
  const calcularEdad = (fechaNacimiento) => {
    const fechaNacObj = new Date(fechaNacimiento);
    const fechaActual = new Date();

    let edad = fechaActual.getFullYear() - fechaNacObj.getFullYear();

    //Verifica que no pase dia de cumpleaños
    const mesActual = fechaActual.getMonth();
    const diaActual = fechaActual.getDate();
    const mesNacimiento = fechaNacObj.getMonth();
    const diaNacimiento = fechaNacObj.getDate();

    if (
      mesActual < mesNacimiento ||
      (mesActual === mesNacimiento && diaActual < diaNacimiento)
    ) {
      edad--;
    }
    return edad;
  };

  const [value, setValue] = useState("all");
  const [filterCandidates, setFilterCandidates] = useState([]);

  useEffect(() => {
    if (value === "all") {
      setFilterCandidates(candidates);
    }
    if (value === "student") {
      const filter = candidates.filter(
        (candidate) => candidate.user.type === "student"
      );
      setFilterCandidates(filter);
    }
    if (value === "professional") {
      const filter = candidates.filter(
        (candidate) => candidate.user.type === "professional"
      );
      setFilterCandidates(filter);
    }
  }, [value]);

  const handleChange = (event) => {
    const { value } = event.target;
    setValue(value);
  };

  const [candidates, setCandidates] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  //?FUNCION PARA OBTENER UNA CADENA DE CONSULTA UNICA
  //?Y SE ACTUALICEN LOS DATOS (SIMULA CTRL+F5)
  // function getUniqueQueryString() {
  //     return `?_=${Date.now()}`;
  //   };

  //Por ejemplo: GET: API_URL/user/feed/:userId/professional?page=1

  const fetchData = async (type) => {
    //!LLAMO A FEED DE USUARIOS ESTUDIANTES
    const API_URL = "http://localhost:3001/api/v1";
    const JobId = jobId;
    const URL = `${API_URL}/user/feed/${JobId}/${type}?page=${currentPage}`;

    try {
      //?TRAIGO DATOS DE CANDIDATOS ESTUDIANTES
      const response = (await axios.get(URL, { withCredentials: "include" }))
        .data.data;
      setCandidates((prevData) => [...prevData, ...response]);
      setFilterCandidates((prevData) => [...prevData, ...response]);
    } catch (error) {
      console.error(error.message);
    }
  };

  const miDiv = document.getElementById("cardContainer");

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    fetchData("student");
    fetchData("professional");
  }, [currentPage]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <h1>Candidatos para oferta laboral: {jobName}</h1>
        <div className={styles.selectContainer}>
          <select value={value} onChange={handleChange}>
            <option value="all">todos</option>
            <option value="student">estudiantes</option>
            <option value="professional">profesionales</option>
          </select>
        </div>
      </div>
      <div id="cardContainer" className={styles.cardContainer}>
        {filterCandidates?.map((candidate, index) => (
          <div className={styles.card} key={index}>
            <div className={styles.cardImage}>
              <img src={candidate.user.profile_image} />
            </div>
            <div className={styles.cardProfile}>
              <div className={styles.nameIcon}>
                <h1>{candidate.user.name}</h1>
                {candidate.user.type === "student" ? (
                  <HiAcademicCap />
                ) : (
                  <HiBriefcase />
                )}
                <div className={styles.cardButtons}>
                  <button
                    name="btn-perfil"
                    className={styles.buttons}
                    onClick={() =>
                      handlePageProfileCandidate(
                        "profileCandidate",
                        candidate.user.id
                      )
                    }
                  >
                    <HiUser size={20} className={styles.icon} />
                  </button>
                  <button className={styles.buttons} name="btn-chat">
                    <HiChat size={20} className={styles.icon} />
                  </button>
                </div>
              </div>
              <h3 className={styles.subtitle}>
                {calcularEdad(candidate.user.profile_birth)} Años -{" "}
                {candidate.user.info_career.join(",")}
              </h3>
              <h3 className={styles.textContainer}>
                {candidate.user.profile_bio}
              </h3>
              {/* <div className={styles.cardButtons}>
                <button
                  name="btn-perfil"
                  className={styles.buttons}
                  onClick={() =>
                    handlePageProfileCandidate("profileCandidate", candidate.id)
                  }
                >
                  Perfil
                </button>
                <button className={styles.buttons} name="btn-chat">
                  Chat
                </button>
              </div> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

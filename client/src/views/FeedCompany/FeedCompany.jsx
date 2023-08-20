import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CandidatesCompany from "../../components/CandidatesCompany/candidatesCompany";
import { CompanyJobs, JobFormCompany } from "../../components/index";
import ProfileCandidate from "../../components/ProfileCandidate/ProfileCandidate";
import { addCompany } from "../../Redux/UsersSlice";
import { Chat, ProfileCompany } from "../index";
import style from "./FeedCompany.module.css";
const { VITE_URL } = import.meta.env;

const feedCompany = () => {
  //!Del Store Global
  const userLogin = useSelector((state) => state.users.user);

  //?DEL STORE GLOBAL
  const companyDataSG = useSelector((state) => state.users.companies);

  const [profileCandidate, setProfileCandidate] = useState();
  const [jobs, setJobs] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [page, setPage] = useState("companyJobs");
  const [jobEdit, setJobEdit] = useState();

  //Cambio de pagina en navbar o entre componentes
  const handlePage = (namepage) => {
    //if(namepage==="companyJobs") fetchCompany();
    setPage(namepage);
  };

  //Presiono boton salir de navbar
  // const handleClose = async() =>{
  //     const URL = `${VITE_URL}/auth/logout`;
  //     try{
  //         await axios.post(URL+getUniqueQueryString(),{withCredentials: "include"});
  //         navigate('/')
  //     }catch(error){
  //         console.log("error al salir: ", error.message)
  //     }
  // };

  //Cambio de pagina para editar una oferta laboral
  const handlePageEditJob = (namepage, data) => {
    console.log("que recibe data: ", data);
    console.log("que recibe namepage: ", namepage);
    setJobEdit(data);

    handlePage(namepage);
  };

  const [jobName, setJobName] = useState();
  const [jobId, setJobId] = useState();

  //cambio a pagina de Candidatos
  const handlePageCandidates = async (namepage, data) => {
    const nameJob = "#" + data.jobName;
    setJobName(nameJob);
    setJobId(data.id);
    handlePage(namepage);
  };

  const handlePageProfileCandidate = async (namepage, profileId) => {
    setProfileCandidate(profileId);

    handlePage(namepage);
  };

  // Función para cambiar el modo entre claro y oscuro
  // function toggleDarkMode() {
  //     const body = document.body;
  //     body.classList.toggle("dark-mode");
  // }

  //?FUNCION PARA OBTENER UNA CADENA DE CONSULTA UNICA
  //?Y SE ACTUALICEN LOS DATOS (SIMULA CTRL+F5)
  function getUniqueQueryString() {
    return `?_=${Date.now()}`;
  }

  //?REALIZO EL GET PARA TRAER COMPAÑIA CARGADA EN BD
  //!ESTE GET SE DEBE CAMBIAR HACIA EL LOGIN
  //!SE CREA ACA A MODO DE PRUEBA DE COMPONENTE INDIVIDUAL
  const fetchCompany = async () => {
    const URL = `${VITE_URL}/user/profile`;
    try {
      //const {data} = await axios.get(`${URL}/${ID}`);
      const { data } = await axios.get(URL + getUniqueQueryString(), {
        withCredentials: "include",
      });
      //dispatch()
      console.log("que trae data <FeedCompany>: ", data);
      dispatch(addCompany(data));
      //setJobs(data.jobs)
      await new Promise((resolve) => setTimeout(resolve, 100));
    } catch (error) {
      console.log("error al cargar datos a SG <FeedCompany>: ", error.message);
    }
  };

  //!TRAIGO LAS OFERTAS LABORALES
  const fetchJobs = async () => {
    const URL = `${VITE_URL}/job`;

    try {
      const dataJob = await axios.get(URL + getUniqueQueryString(), {
        withCredentials: "include",
      });
      setJobs(dataJob.data);
      await new Promise((resolve) => setTimeout(resolve, 100));
    } catch (error) {
      console.log("Error al traer los JOBS <FeedCompany>: ", error.message);
    }
  };

  useEffect(() => {
    if (page === "jobForm") fetchJobs();
    if (page === "profileCompany") fetchCompany();
    if (page === "companyJobs") {
      fetchCompany();
      fetchJobs();
    }

    if (page === "Chats") {
      //dispatch()
    }
  }, [page]);

  //?AL MONTAR COMPONENTE
  useEffect(() => {
    fetchCompany();
    fetchJobs();
  }, []);

  return (
    <>
      <div className={style.container}>
        {/* <div className={style.left}>
          <Title>#trends</Title>
          <button
            onClick={() => handlePage("companyJobs")}
            className={style.button}
            title="Inicio"
          >
            <AiFillHome size={35} className={style.icon} />
          </button>
          <p>Inicio</p>

          <button
            onClick={() => handlePage("profileCompany")}
            className={style.button}
            title="Mi Perfil"
          >
            <HiUser size={35} className={style.icon} />
          </button>
          <p>Perfil</p>

          <button
            onClick={() => handlePage("Chats")}
            className={style.button}
            title="Chats"
          >
            <HiChat size={35} className={style.icon} />
          </button>
          <p>Chats</p>

          <button
            onClick={() => handleClose()}
            className={style.button}
            title="Salir"
          >
            <HiLogout size={35} className={style.icon} />
          </button>
          <p>Salir</p>

          <div className="dark-mode-button">
            <button
              className={style.button}
              onClick={toggleDarkMode}
              color="white"
            >
              <i className="fas fa-moon" />
            </button>
            <button
              className={style.button}
              onClick={toggleDarkMode}
              color="white"
            >
              <HiMoon size={35} className={style.icon} />
            </button>
          </div>
        </div> */}
        <div className={style.right}>
          {/* PAGINA CON BUSQUEDAS LABORALES DE COMPAÑIA */}
          {page === "companyJobs" && (
            <CompanyJobs
              jobs={jobs}
              handlePageEditJob={handlePageEditJob}
              handlePageCandidates={handlePageCandidates}
            />
          )}
          {/* PAGINA QUE CREA O MODIFICA UNA OFERTA LABORAL */}
          {page === "jobForm" && (
            <JobFormCompany
              jobEdit={jobEdit}
              companyId={companyDataSG.id}
              handlePage={handlePage}
            />
          )}
          {/* PAGINA DE CANDIDATOS QUE APLICAN A UN PUESTO LABORAL */}
          {page === "Candidates" && (
            <CandidatesCompany
              jobId={jobId}
              jobName={jobName}
              handlePageProfileCandidate={handlePageProfileCandidate}
            />
          )}
          {/* PAGINA DEL PERFIL DE EMPRESA */}
          {page === "profileCompany" && <ProfileCompany />}
          {/* PAGINA DEL PERFIL DE CANDIDATO */}
          {page === "profileCandidate" && (
            <ProfileCandidate candidateId={profileCandidate} />
          )}
          {/* PAGINA DE CHAT */}
          {page === "Chats" && <Chat />}
        </div>
      </div>
    </>
  );
};

export default feedCompany;

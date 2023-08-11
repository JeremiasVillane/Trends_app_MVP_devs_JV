import { useEffect, useState } from "react";
import style from "./FeedCompany.module.css";
import { Profile, ProfileCompany } from "../index";
import { CompanyJobs, JobFormCompany } from "../../components/index";
import {AiFillHome} from 'react-icons/ai';
import {HiUser,HiChat,HiLogout,HiMoon} from 'react-icons/hi';
import { Title } from "@tremor/react";
import CandidatesCompany from "../../components/CandidatesCompany/candidatesCompany";
import { matcherCandidatesJob } from "../../utils/matcherCandidatesJob";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { addCompany } from "../../Redux/UsersSlice";
import { useNavigate } from "react-router-dom";
import ProfileCandidate from "../../components/ProfileCandidate/ProfileCandidate";
const {VITE_URL} = import.meta.env;



const feedCompany = () =>{
  
    //!Del Store Global
    const userLogin = useSelector((state)=>state.users.user);

    //?DEL STORE GLOBAL
    const companyDataSG = useSelector((state)=>state.users.companies);

    //?Store Local temporal para modo claro y oscuro
    const [mode, setMode]=useState('light-mode');

    const[profileCandidate, setProfileCandidate] = useState();
    const[jobs, setJobs] = useState();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const[page, setPage] = useState("companyJobs");
    const[jobEdit, setJobEdit] = useState();

    const handlePage = (namepage) => {
        if(namepage==="companyJobs") fetchCompany();
        setPage(namepage)
    };

    const handleClose = async() =>{
        const URL = `${VITE_URL}/auth/logout`;
        try{
            await axios.post(URL+getUniqueQueryString(),{withCredentials: "include"});
            navigate('/Trends_app_MVP')
            console.log("se salio")
        }catch(error){
            console.log("error al salir: ", error.message)
        }
    };

    
    const handlePageEditJob = (namepage,data) =>{
        console.log("que recibe data: ", data);
        console.log("que recibe namepage: ", namepage);
        setJobEdit(data);
        
        handlePage(namepage);
    };

    const[arraycandidates, setArrayCandidates] = useState();
    const[jobName,setJobName] = useState();

    const handlePageCandidates = async(namepage,data) =>{
        console.log("que recibe data <handlePageCandidates>: ", data)
        
        //!EJECUTO ALGORITMO MATCHEO Y ENVIO RESULTADOS A COMPONENTE
        setArrayCandidates(await matcherCandidatesJob(data));
        const nameJob='#'+data.jobName;
        setJobName(nameJob);

        console.log("que tiene arraycandidates <feedCompany>: ",arraycandidates)
        handlePage(namepage);
    };

    const handlePageProfileCandidate = async(namepage,profileId)=>{
        console.log("que viene en namepage: ", namepage);
        console.log("que viene en profileId: ", profileId);

        setProfileCandidate(profileId);

        handlePage(namepage);
    };
    
    // Función para cambiar el modo entre claro y oscuro
    function toggleDarkMode() {
        const body = document.body;
        body.classList.toggle("dark-mode");
    }


    //?FUNCION PARA OBTENER UNA CADENA DE CONSULTA UNICA
    //?Y SE ACTUALICEN LOS DATOS (SIMULA CTRL+F5)
    function getUniqueQueryString() {
        return `?_=${Date.now()}`;
      };

    //?REALIZO EL GET PARA TRAER COMPAÑIA CARGADA EN BD
    //!ESTE GET SE DEBE CAMBIAR HACIA EL LOGIN
    //!SE CREA ACA A MODO DE PRUEBA DE COMPONENTE INDIVIDUAL
    const fetchCompany = async () =>{
        const URL = `${VITE_URL}/user/profile`;
        try{
            //const {data} = await axios.get(`${URL}/${ID}`);
            const {data} = await axios.get(URL+getUniqueQueryString(),{withCredentials: "include"});
            //dispatch()
            console.log("que trae data <FeedCompany>: ", data)
            dispatch(addCompany(data));
            //setJobs(data.jobs)
    
        }catch(error){
            console.log("error al cargar datos a SG <FeedCompany>: ",error.message);
        }
    };
 
    //!TRAIGO LAS OFERTAS LABORALES
    const fetchJobs = async () =>{
        const URL = `${VITE_URL}/job`
        console.log("<<Como envia url a get JOBS: ",URL)
        try{
            const dataJob = await axios.get(URL+getUniqueQueryString(), {withCredentials: "include"});
            console.log("que trae dataJob de fetchJobs: ",dataJob.data)
            setJobs(dataJob.data);
        }catch(error){
            console.log("Error al traer los JOBS <FeedCompany>: ", error.message)
        }
    };

useEffect(()=>{
    console.log(">>>CAMBIO PAGINA<<<")
    fetchCompany();
    fetchJobs();
},[page])

//?AL MONTAR COMPONENTE
useEffect(()=>{
    console.log("que trae userLogin: ", userLogin);
      
    fetchCompany();
    fetchJobs();

    console.log("que trae companyDataSG: ",companyDataSG)
    console.log("que tiene jobs de data: ", companyDataSG.jobs)
    console.log(">>> qeu tiene Store Local Jobs: ", jobs);
  },[])    

    return(
        <>
        <div className={style.container}>
            <div className={style.left}>
                <Title>#trends</Title>
                <button 
                    onClick={()=>handlePage("companyJobs")} 
                    className={style.button}
                    title="Inicio"
                ><AiFillHome  size={35}  className={style.icon} /></button>
                <p>Inicio</p>
 
                <button 
                    onClick={()=>handlePage("profileCompany")}
                    className={style.button}
                    title="Mi Perfil"
                ><HiUser size={35} className={style.icon}  /></button>
                <p>Mi Perfil</p>

                <button 
                    onClick={()=>handlePage("Chats")}
                    className={style.button}
                    title="Chats"
                ><HiChat size={35} className={style.icon} /></button>
                <p>Mis Chats</p>

                <button 
                    onClick={()=>handleClose()}
                    className={style.button}
                    title="Salir"
                ><HiLogout size={35} className={style.icon} /></button>
                <p>Salir</p>

                {/* Modo Oscuro */}
                <div className="dark-mode-button">
                    {/* <button 
                      className={style.button}
                      onClick={toggleDarkMode}
                      color="white"
                    ><i className="fas fa-moon" /></button> */}
                    <button 
                      className={style.button}
                      onClick={toggleDarkMode}
                      color="white"
                    ><HiMoon size={35} className={style.icon} /></button>
                </div>
            </div>
            <div className={style.right}>
                {/* PAGINA CON BUSQUEDAS LABORALES DE COMPAÑIA */}
                {page === "companyJobs" && <CompanyJobs jobs={jobs} handlePageEditJob={handlePageEditJob} handlePageCandidates={handlePageCandidates}/> }
                {/* PAGINA QUE CREA O MODIFICA UNA OFERTA LABORAL */}
                {page === "jobForm" && <JobFormCompany jobEdit={jobEdit} companyId={companyDataSG.id} handlePage={handlePage}/>}
                {/* PAGINA DE CANDIDATOS QUE APLICAN A UN PUESTO LABORAL */}
                {page === "Candidates" && <CandidatesCompany jobName={jobName} arraycandidates={arraycandidates} handlePageProfileCandidate={handlePageProfileCandidate}/>}
                {/* PAGINA DEL PERFIL DE EMPRESA */}
                {page === "profileCompany" && <ProfileCompany/>}
                {/* PAGINA DEL PERFIL DE CANDIDATO */}
                {page === "profileCandidate" && <ProfileCandidate candidateId={profileCandidate} />}
                {page === "Chats"}
            </div>
        </div>
        </>
    )
}; 

export default feedCompany;

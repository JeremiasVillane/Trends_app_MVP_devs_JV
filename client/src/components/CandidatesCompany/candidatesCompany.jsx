import { Select, SelectItem, Subtitle, TextInput, Title } from "@tremor/react";
import style from './candidatesCompany.module.css';
import { useEffect, useState } from "react";
import {HiAcademicCap,HiBriefcase,HiUser,HiChat} from 'react-icons/hi';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { current } from "@reduxjs/toolkit";

  
const candidatesCompany = ({jobId,jobName,arraycandidates,handlePageProfileCandidate}) => {
    console.log("que recibe jobName <candidatesCompany>: ", jobName)
    console.log("que recibe jobId <candidatesCompany>: ", jobId)
    //console.log("que recibe arraycandidates <candidatesCompany>: ", arraycandidates);

    
    const calcularEdad=(fechaNacimiento)=>{
        const fechaNacObj = new Date(fechaNacimiento);
        const fechaActual = new Date();

        let edad = fechaActual.getFullYear() - fechaNacObj.getFullYear();
        
        //Verifica que no pase dia de cumpleaños
        const mesActual = fechaActual.getMonth();
        const diaActual = fechaActual.getDate();
        const mesNacimiento = fechaNacObj.getMonth();
        const diaNacimiento = fechaNacObj.getDate();
        
        if(mesActual<mesNacimiento || (mesActual===mesNacimiento && diaActual < diaNacimiento)){
            edad--;
        }
        return edad;
    };

    const [value, setValue] = useState('all');
    const [filterCandidates, setFilterCandidates] = useState([]);
    
    useEffect(()=>{
        console.log("que tiene value: ", value)
        if(value==='all'){
            setFilterCandidates(candidates);
        }
        if(value==='student'){
            const filter = candidates.filter((candidate)=>candidate.user.type==='student');
            setFilterCandidates(filter)
        }
        if(value==='professional'){
            const filter = candidates.filter((candidate)=>candidate.user.type==='professional');
            setFilterCandidates(filter)
        }
    },[value])

    const handleChange = (event)=>{
        const {value} = event.target;
        setValue(value);
    };
    
    const[candidates, setCandidates] = useState([]);
    const[currentPage, setCurrentPage] = useState(1);

    //?FUNCION PARA OBTENER UNA CADENA DE CONSULTA UNICA
    //?Y SE ACTUALICEN LOS DATOS (SIMULA CTRL+F5)
    // function getUniqueQueryString() {
    //     return `?_=${Date.now()}`;
    //   };

    //Por ejemplo: GET: API_URL/user/feed/:userId/professional?page=1
    
    const fetchData = async(type) =>{
        //!LLAMO A FEED DE USUARIOS ESTUDIANTES
        const API_URL = 'http://localhost:3001/api/v1'
        const JobId = jobId;

        const URL = `${API_URL}/user/feed/${JobId}/${type}?page=${currentPage}`;
        console.log("como envio URL a axios: ", URL)
        
        try{
            //?TRAIGO DATOS DE CANDIDATOS ESTUDIANTES
            const response = (await axios.get(URL,{withCredentials: "include"})).data.data;
            //console.log("que trae response estudiantes <candidatesCompany>: ", response);
            setCandidates(prevData=>[...prevData,...response]);
            setFilterCandidates(prevData=>[...prevData,...response]);

      }catch(error){
        console.log("error al traer datos de estudiantes <candidatesCompany>: ", error.message);
      }
    };

    const miDiv = document.getElementById('cardContainer');

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
          setCurrentPage(currentPage + 1);
        }
      };    

    useEffect(()=>{
        //console.log("que tiene candidates: ", candidates);
        //console.log("que tiene filterCandidates: ", filterCandidates);
        console.log("que tiene currentPage: ", currentPage)
        fetchData("student");
        fetchData("professional");
    },[currentPage])

    
    useEffect(()=>{
        //const miDiv = document.getElementById('cardContainer');
        console.log("<<< SE MONTA candidatesCompany >>>")
        //window.addEventListener('scroll',handleScroll);
        window.addEventListener('scroll',handleScroll);
        return()=>{
            //window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('scroll', handleScroll);
        };
    },[]);

    return(
        <div className={style.container}>
            <div className={style.head}>
                <h1>Candidatos para oferta laboral: {jobName}</h1>
                <div className={style.selectContainer}>
                    <select 
                        value={value} onChange={handleChange}
                    >
                        <option value="all">todos</option>
                        <option value="student">estudiantes</option>
                        <option value="professional">profesionales</option>
                    </select>
                </div>
            </div> 
            <div id="cardContainer" className={style.cardContainer}>
                {
                    filterCandidates?.map((candidate,index)=>(
                        <div className={style.card} key={index}>
                            <div className={style.cardImage}>
                                <img src={candidate.user.profile_image}/>
                            </div>
                            <div className={style.cardProfile}>
                                <div className={style.nameIcon}>
                                    <h1>{candidate.user.name}</h1>
                                    {candidate.user.type==="student" ?<HiAcademicCap/> :<HiBriefcase/>}
                                    <div className={style.cardButtons}>
                                        <button
                                            name="btn-perfil"
                                            className={style.buttons}
                                            onClick={()=>handlePageProfileCandidate("profileCandidate",candidate.user.id)}
                                        ><HiUser size={20} className={style.icon}/></button>
                                        <button
                                            className={style.buttons}
                                            name="btn-chat"
                                        ><HiChat size={20} className={style.icon}/></button>
                                    </div>
                                </div>
                                <h3 className={style.subtitle}>{calcularEdad(candidate.user.profile_birth)} Años - {candidate.user.info_career.join(',')}</h3>
                                <h3 className={style.textContainer}>{candidate.user.profile_bio}</h3>
                                {/* <div className={style.cardButtons}>
                                    <button
                                        name="btn-perfil"
                                        className={style.buttons}
                                        onClick={()=>handlePageProfileCandidate("profileCandidate",candidate.id)}
                                    >Perfil</button>
                                    <button
                                        className={style.buttons}
                                        name="btn-chat"
                                    >Chat</button>
                                </div> */}
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
};
 
export default candidatesCompany;
import { Select, SelectItem, Subtitle, TextInput, Title } from "@tremor/react";
import style from './candidatesCompany.module.css';
import { useEffect, useState } from "react";
import {HiAcademicCap,HiBriefcase} from 'react-icons/hi';
import { useNavigate } from "react-router-dom";

  
const candidatesCompany = ({jobName,arraycandidates,handlePageProfileCandidate}) => {
    console.log("que recibe jobName <candidatesCompany>: ", jobName)
    console.log("que recibe arraycandidates <candidatesCompany>: ", arraycandidates);
    const[candidates, setCandidates] = useState([]);

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

    const navigate = useNavigate();

    // const handlePageProfileCandidate=()=>{
    //     navigate('/Trends_app_MVP/profile');
    // }

    const [value, setValue] = useState('all');
    const [filterCandidates, setFilterCandidates] = useState([]);

    useEffect(()=>{
        console.log("que tiene value: ", value)
        if(value==='all'){
            setFilterCandidates(candidates);
        }
        if(value==='student'){
            const filter = candidates.filter((candidate)=>candidate.type==='student');
            setFilterCandidates(filter)
        }
        if(value==='professional'){
            const filter = candidates.filter((candidate)=>candidate.type==='professional');
            setFilterCandidates(filter)
        }
    },[value])

    const handleChange = (event)=>{
        const {value} = event.target;
        setValue(value);
    };

    useEffect(()=>{
        //al montarse
        arraycandidates ?setCandidates(arraycandidates) :setCandidates([]);
        arraycandidates ?setFilterCandidates(arraycandidates) :setFilterCandidates([]);
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
            <div className={style.cardContainer}>
                {
                    filterCandidates?.map((candidate,index)=>(
                        <div className={style.card} key={index}>
                            <div className={style.cardImage}>
                                <img src={candidate.profile_image}/>
                            </div>
                            <div className={style.cardProfile}>
                                <div className={style.nameIcon}>
                                    <h1>{candidate.name}</h1>{candidate.type==="student" ?<HiAcademicCap/> :<HiBriefcase/>}
                                </div>
                                <h3 className={style.subtitle}>{calcularEdad(candidate.profile_birth)} Años - {candidate.info_career.join(',')}</h3>
                                <h3 className={style.textContainer}>{candidate.profile_bio}</h3>
                                <div className={style.cardButtons}>
                                    <button
                                        name="btn-perfil"
                                        className={style.buttons}
                                        onClick={()=>handlePageProfileCandidate("profileCandidate",candidate.id)}
                                    >Perfil</button>
                                    <button
                                        className={style.buttons}
                                        name="btn-chat"
                                    >Chat</button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
};
 
export default candidatesCompany;



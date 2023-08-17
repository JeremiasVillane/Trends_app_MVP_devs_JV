import { useEffect, useState } from 'react';
import style from './ProfileCandidate.module.css'
import axios from 'axios';
const {VITE_URL} = import.meta.env;


export default function ProfileCandidate(candidateId) {
    console.log("<<INGRESA A ProfileCandidate>>")
    console.log("que tiene candidateId: ", candidateId.candidateId)
    const[profile,setProfile]=useState();

    //?FUNCION PARA OBTENER UNA CADENA DE CONSULTA UNICA Y SE ACTUALICEN LOS DATOS (SIMULA CTRL+F5)
    function getUniqueQueryString() {
        return `?_=${Date.now()}`;
      };

    const fetchCandidate = async () =>{
        const URL = `${VITE_URL}/search/user/${candidateId.candidateId}`;
        console.log("como envia a get URL", URL)
        try{
            const {data} = await axios.get(URL+getUniqueQueryString(),{withCredentials: "include"});
            console.log("que trajo data <ProfileCandidate>: ", data)
            setProfile(data);
        }catch(error){
            console.log("error al traer dato candidato: ", error.message)
        }

    };

    //?AL MONTARSE COMPONENTE
    useEffect(()=>{
        fetchCandidate();
    },[])

    return(
        <div>
            {profile &&
            <div className={style.container}>
                <div className={style.header}>
                    <h1 className={style.headerTitle1}>Perfil de Candidato</h1>
                    <h1 className={style.headerTitle2}>{profile.type ?profile.type :null}</h1>
                </div>
                <div className={style.imageProfile}>
                    <img
                        src={profile.profile_image ?profile.profile_image :null}
                        alt='image'
                    />
                </div>
                <div className={style.body}>
                    <h1>{profile.name}</h1>
                    <h3>{profile.profile_bio}</h3>
                    <h3>email: {profile.email}</h3>
                    <h3>{profile.profile_city}, {profile.profile_country}</h3>
                    <h3>disponibilidad: {profile.info_availability}</h3>
                    <h3>preferencia contratacion: {profile.info_contract}</h3>
                    <h3 className={style.subtitulo}>Informacion Academica</h3>
                    <h3>Area de estudios: {profile.academic_area.join(', ')}</h3>
                    <h3>Estudios: {profile.info_career.join(', ')}</h3>
                    <h3>Año de graduacion / previsto: {profile.academic_graduation}</h3>
                    <h3>Institucion: {profile.academic_institution}</h3>
                    <h3 className={style.subtitulo}>Informacion Adicional</h3>
                    <h3>Intereses: {profile.info_interests.join(', ')}</h3>
                    <h3>Idiomas: {profile.info_languages.join(', ')}</h3>
                    <h3>Objetivos: {profile.info_goals.join(', ')}</h3>
                    <h3>Habilidades: {profile.info_skills.join(', ')}</h3>
                    <hr></hr>
                </div>
            </div>
            }
        </div>
    )
};
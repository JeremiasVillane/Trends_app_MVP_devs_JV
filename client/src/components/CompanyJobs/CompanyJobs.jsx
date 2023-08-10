import { Title } from "@tremor/react";
import style from "./CompanyJobs.module.css"

   
const CompanyJobs = ({jobs, handlePageEditJob,handlePageCandidates})=>{
    console.log("que trae jobs <CompanyJobs>: ", jobs)

    return(
        <div>
            <div className={style.head}>
                <h1>¡Completa la informacion de tu busqueda laboral para recibir los candidatos ideales de nuestra plataforma!</h1>
                <button 
                    onClick={()=>handlePageEditJob("jobForm","")}
                    className={style.button}
                >Subir nueva busqueda</button>
            </div>
            <div className={style.body}>
                <h1>Ofertas Laborales Publicadas</h1>
                <div>
                    {
                        jobs?.map((job)=>(
                            <div key={job.id} className={style.postJob}>
                                
                                <h3>#{job.jobName}</h3>
                                <h3>Fecha de Creacion: {job.creationDate}</h3>
                                <h3>Oferta: {job.active ?"Activa" :"Cerrada"} / Fecha de cierre: {job.closingDate}</h3>
                                {/* BOTON PARA VER PERFILES DE CANDIDATOS */}
                                <button
                                    onClick={()=>handlePageCandidates("Candidates",job)}
                                    className={style.button}
                                >Ver Perfiles</button>
                                {/* BOTON PARA EDITAR OFERTA LABORAL */}
                                <button
                                    onClick={()=>handlePageEditJob("jobForm",job)}
                                    className={style.button}
                                >Editar Busqueda</button>

                            </div>
                        ))
                    }
                </div>

            </div>
        </div>
    )
};

export default CompanyJobs;
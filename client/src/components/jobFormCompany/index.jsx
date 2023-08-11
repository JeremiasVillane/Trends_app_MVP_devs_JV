import { Select, SelectItem, Subtitle, TextInput, Title , Button} from "@tremor/react";
import { useEffect, useState } from "react";
import DataJobCompany from "./dataJobCompany/dataJobCompany";
import InfoJobCompany from "./infoJobCompany/infoJobCompany";
import style from "./index.module.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const {VITE_URL} = import.meta.env;


const JobFormCompany = ({jobEdit,companyId,handlePage})=>{
    console.log("que ingresa por jobEdit <jobFormCompany>: ", jobEdit)
    console.log("que ingresa por companyId <jobFormCompany>: ", companyId)
const navigate = useNavigate()
    
const[isFormComplete, setIsFormComplete] = useState(false);


const[formJob, setFormJob] = useState({
    jobName:"",
    creationDate:"",
    closingDate:"",
    active:true, //true / false
    level_required:"",
    study_area:[],
    experience_required:"",
    industry:[],    
    benefits:[],
    skills_required:[],
    job_description:[],
    job_goal:[],
    languages_required:[],
    availability:"",
    contract_offered:"",    
});

const[pageForm, setPageForm] = useState({
    button1:"Anterior",
    button1_hide:true,
    button2:"Continuar",
    button2_hide:false,
    div_data:false,
    div_info:true,
});

const handlePageForm = (event) =>{
    console.log("presiona boton");
    if(!pageForm.div_data){
        //SI ESTAMOS EN PAGINA DATOS LABORALES
        console.log("entra a div_data");
        setPageForm({
            button1:"Anterior",
            button1_hide:false,
            button2:"Continuar",
            button2_hide:true,
            div_data:true,
            div_info:false,            
        });
    };

    if(!pageForm.div_info){
        //SI ESTAMOS EN PAGINA INFORMACION LABORAL 
        console.log("entramos a div_info");
        setPageForm({
            button1:"Anterior",
            button1_hide:true,
            button2:"Continuar",
            button2_hide:false,
            div_data:false,
            div_info:true,               
        });
    };
};

    // const handleChangeSelect = (prop,value)=>{
    //     setFormJob({...formJob,[prop]:value})
    // }
    const handleChangeSelect = (event) =>{
        console.log("que trae event de handleChangeSelect: ", event)
        const{name, value} = event.target;
        console.log("qeu tiene name: ", name)
        console.log("que tiene value: ", value)
        setFormJob({
            ...formJob,
            [name]:value
        })
    };

    const handleChangeForm = (event)=>{
        console.log("que trae event: ", event);
        const {name,value,checked} = event.target;
        if(name==="active"){
            console.log("->entra a active");
            if(!checked){
                // Obtiene la fecha actual
                let fechaActual = new Date();

                // Extrae los componentes de la fecha
                let año = fechaActual.getFullYear();
                let mes = String(fechaActual.getMonth() + 1).padStart(2, '0'); // Sumar 1 al mes porque en JavaScript los meses comienzan en 0
                let dia = String(fechaActual.getDate()).padStart(2, '0');

                // Construye la fecha en formato "yyyy/MM/dd"
                let fechaFormateada = año + '-' + mes + '-' + dia;

                setFormJob({...formJob,closingDate:fechaFormateada, [name]:checked})
            }else{
                setFormJob({...formJob,closingDate:"", [name]:checked})
            }
            return;
        }

        
        if(name==="closingDate"){
            console.log("->entra a closingDate");
            console.log("que tiene value: ", value)
            if(value!==""){
                setFormJob({...formJob,closingDate:value, active:false})
            }else{
                setFormJob({...formJob,closingDate:value, active:true})
            }
            return;
        }
        
        setFormJob({...formJob,[name]:value});
        
    };

    //Asi formatea al enviar la carga/modificacion de una oferta laboral
    const formatJob = (data) =>{
        console.log("que tiene data: ", data)
        
        if(!data.closingDate) delete data.closingDate;
        // if(data.closingDate === undefined) delete data.closingDate;
        if(!data.closingDate) console.log("NOO TIENE DATOS CLOSINGDATE")
        else console.log("TIENE DATOS CLOSINGDATE")

        const format = {
            jobName:data.jobName,
            creationDate:data.creationDate,
            closingDate:data.closingDate,
            active:data.active, //true / false
            levelRequired:data.level_required,
            studyArea:data.study_area.split(','),//[],
            experienceRequired:data.experience_required,
            industry:data.industry.split(','),//[],    
            benefits:data.benefits.split(','),//[],
            skillsRequired:data.skills_required.split(','),//[],
            jobDescription:data.job_description.split(','),//[],
            jobGoal:data.job_goal.split(','),//[],
            languagesRequired:data.languages_required.split(','),//[],
            availability:data.availability,
            contractOffered:data.contract_offered
        };

        if(!format.closingDate) delete format.closingDate;
     
        return format;
    }

    //?AL PRESIONAR BOTON SUBMIT (NUEVO O MODIFICAR)
    const submitHandler = async(event) =>{
        event.preventDefault();
        const envioData = await formatJob(formJob);
        console.log("como envia datos job: ", envioData)
        
        if(jobEdit){
            //?MODIFICA OFERTA LABORAL
            const ID = jobEdit.id;
            const URL=`${VITE_URL}/job/${ID}`
            try{
                console.log("MODIFICO JOB", envioData)
                console.log("como envia a PUT: ", URL)
                await axios.put(URL,envioData,{withCredentials: "include"});
                await new Promise (res => setTimeout(res,100));
                handlePage("companyJobs")
                
            }catch(error){
                console.log("error post job: ", error.message)
            }            
        }else{
            //?NUEVA OFERTA LABORAL
            const ID = companyId;
            const URL=`${VITE_URL}/job/${ID}`
            try{
                console.log("AGREGO NUEVO JOB", envioData)
                console.log("como envia a POST: ", URL)
                await axios.post(URL,envioData,{withCredentials: "include"});
                await new Promise (res => setTimeout(res,100));
                handlePage("companyJobs")
            }catch(error){
                console.log("error post job: ", error.message)
            }
        };

        

    };

    const validateForm = (data) =>{
        for(let propiedad in data){
            if((data[propiedad] === "" || data[propiedad].length ===0)&&propiedad!=="closingDate") return false;
        }
        return true;
    };

    useEffect(()=>{
        console.log("que tiene formJob: ", formJob);
        setIsFormComplete(validateForm(formJob));
    },[formJob]);


    //?AL MONTARSE EL COMPONENTE|
    useEffect(()=>{
        console.log(">> AL MONTAR JOB-FORM")
        console.log(">> que trae jobEdit: ", jobEdit);
        if(jobEdit){
            console.log(">> jobEdit tiene datos")
            setFormJob({
                jobName:jobEdit.jobName,
                creationDate:jobEdit.creationDate,
                closingDate:jobEdit.closingDate ?jobEdit.closingDate :"",
                active:jobEdit.active,
                level_required:jobEdit.levelRequired,
                study_area:jobEdit.studyArea.join(','),
                experience_required:jobEdit.experienceRequired,
                industry:jobEdit.industry.join(','),
                benefits:jobEdit.benefits.join(','),
                skills_required:jobEdit.skillsRequired.join(','),
                job_description:jobEdit.jobDescription.join(','),
                job_goal:jobEdit.jobGoal.join(','),
                languages_required:jobEdit.languagesRequired.join(','),
                availability:jobEdit.availability,
                contract_offered:jobEdit.contractOffered,
            })

        }else{
            console.log(">> jobEdit NO Ttiene datos")
        }
    

    },[])

    return(
        <div className={style.container}>
            <div className={style.header}>
            {
                jobEdit 
                    ?<h1>Modificacion de Oferta Laboral</h1>
                    :<h1>Carga de Nueva Oferta Laboral</h1>
            }
            </div>
            <form onSubmit={submitHandler}>
                {/* DATOS DE OFERTA LABORAL*/}
                <div hidden={pageForm.div_data}>
                    <DataJobCompany
                        formJob={formJob}
                        handleChangeForm={handleChangeForm}
                        handleChangeSelect={handleChangeSelect}
                    />
                </div>
            
                {/* INFORMACION Y BENEFICIOS DE OFERTA LABORAL*/}
                <div hidden={pageForm.div_info}>
                    <InfoJobCompany
                        formJob={formJob}
                        handleChangeForm={handleChangeForm}
                        handleChangeSelect={handleChangeSelect}                    
                    />
                </div>
                {/* BOTON GUARDAR */}
                <div className={style.buttonForm}>
                    <button
                        name="submit"
                        hidden={!isFormComplete}
                        type="submit"
                        // style={{ margin: 10, padding: 10 }}
                        className={style.button}
                    ><div className={style.textButtonForm}>{jobEdit ?"Modificar" :"Cargar"} Oferta Laboral</div></button>
                </div>
            </form>
            {/* BOTONES NAVEGACION */}
            <div className={style.contentButton}>
                <button
                    name="Anterior"
                    hidden={pageForm.button1_hide}
                    onClick={handlePageForm}
                    className={style.button}
                    // style={{ margin: 10, padding: 10 }}
                >{pageForm.button1}</button>
                <button
                    name="Continuar"
                    hidden={pageForm.button2_hide}
                    onClick={handlePageForm}
                    className={style.button}
                    // style={{ margin: 10, padding: 10 }}
                >{pageForm.button2}</button>
            </div>
        </div>
    )
};

export default JobFormCompany;
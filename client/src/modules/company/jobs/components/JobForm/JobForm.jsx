import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./JobForm.module.css";
import JobData from "./JobData/JobData";
import JobInfo from "./JobInfo/JobInfo";
const { VITE_URL } = import.meta.env;

export const JobForm = ({ jobEdit, companyId, handlePage }) => {
  const [isFormComplete, setIsFormComplete] = useState(false);

  const [formJob, setFormJob] = useState({
    jobName: "",
    creationDate: "",
    closingDate: "",
    active: true, //true / false
    level_required: "",
    study_area: [],
    experience_required: "",
    industry: "",
    benefits: [],
    skills_required: [],
    job_description: [],
    job_goal: [],
    languages_required: [],
    availability: "",
    contract_offered: "",
  });

  const [pageForm, setPageForm] = useState({
    button1: "Anterior",
    button1_hide: true,
    button2: "Continuar",
    button2_hide: false,
    div_data: false,
    div_info: true,
  });

  const handlePageForm = (event) => {
    if (!pageForm.div_data) {
      //SI ESTAMOS EN PAGINA DATOS LABORALES
      setPageForm({
        button1: "Anterior",
        button1_hide: false,
        button2: "Continuar",
        button2_hide: true,
        div_data: true,
        div_info: false,
      });
    }

    if (!pageForm.div_info) {
      //SI ESTAMOS EN PAGINA INFORMACION LABORAL
      setPageForm({
        button1: "Anterior",
        button1_hide: true,
        button2: "Continuar",
        button2_hide: false,
        div_data: false,
        div_info: true,
      });
    }
  };

  // const handleChangeSelect = (prop,value)=>{
  //     setFormJob({...formJob,[prop]:value})
  // }
  const handleChangeSelect = (event) => {
    const { name, value } = event.target;

    setFormJob({
      ...formJob,
      [name]: value,
    });
  };

  const handleChangeForm = (event) => {
    const { name, value, checked } = event.target;

    if (name === "active") {
      if (!checked) {
        // Obtiene la fecha actual
        let fechaActual = new Date();

        // Extrae los componentes de la fecha
        let año = fechaActual.getFullYear();
        let mes = String(fechaActual.getMonth() + 1).padStart(2, "0"); // Sumar 1 al mes porque en JavaScript los meses comienzan en 0
        let dia = String(fechaActual.getDate()).padStart(2, "0");

        // Construye la fecha en formato "yyyy/MM/dd"
        let fechaFormateada = año + "-" + mes + "-" + dia;

        setFormJob({
          ...formJob,
          closingDate: fechaFormateada,
          [name]: checked,
        });
      } else {
        setFormJob({ ...formJob, closingDate: "", [name]: checked });
      }
      return;
    }

    if (name === "closingDate") {
      console.log("->entra a closingDate");
      console.log("que tiene value: ", value);
      if (value !== "") {
        setFormJob({ ...formJob, closingDate: value, active: false });
      } else {
        setFormJob({ ...formJob, closingDate: value, active: true });
      }
      return;
    }

    setFormJob({ ...formJob, [name]: value });
  };

  //Asi formatea al enviar la carga/modificacion de una oferta laboral
  const formatJob = (data) => {
    if (!data.closingDate) delete data.closingDate;
    // if(data.closingDate === undefined) delete data.closingDate;

    const format = {
      jobName: data.jobName,
      creationDate: data.creationDate,
      closingDate: data.closingDate,
      active: data.active, //true / false
      levelRequired: data.level_required,
      studyArea: data.study_area.split(","), //[],
      experienceRequired: data.experience_required,
      industry: data.industry.split(","), //[],
      benefits: data.benefits.split(","), //[],
      skillsRequired: data.skills_required.split(","), //[],
      jobDescription: data.job_description.split(","), //[],
      jobGoal: data.job_goal.split(","), //[],
      languagesRequired: data.languages_required.split(","), //[],
      availability: data.availability,
      contractOffered: data.contract_offered,
    };

    if (!format.closingDate) delete format.closingDate;

    return format;
  };

  //?AL PRESIONAR BOTON SUBMIT (NUEVO O MODIFICAR)
  const submitHandler = async (event) => {
    event.preventDefault();
    const envioData = await formatJob(formJob);

    if (jobEdit) {
      //?MODIFICA OFERTA LABORAL
      const ID = jobEdit.id;
      const URL = `${VITE_URL}/job/${ID}`;
      try {
        await axios.put(URL, envioData, { withCredentials: "include" });
        await new Promise((res) => setTimeout(res, 100));
        handlePage("companyJobs");
      } catch (error) {
        console.log("error post job: ", error.message);
      }
    } else {
      //?NUEVA OFERTA LABORAL
      const ID = companyId;
      const URL = `${VITE_URL}/job/${ID}`;
      try {
        await axios.post(URL, envioData, { withCredentials: "include" });
        await new Promise((res) => setTimeout(res, 100));
        handlePage("companyJobs");
      } catch (error) {
        console.log("error post job: ", error.message);
      }
    }
  };

  const validateForm = (data) => {
    for (let propiedad in data) {
      if (
        (data[propiedad] === "" || data[propiedad].length === 0) &&
        propiedad !== "closingDate"
      )
        return false;
    }
    return true;
  };

  useEffect(() => {
    setIsFormComplete(validateForm(formJob));
  }, [formJob]);

  //?AL MONTARSE EL COMPONENTE|
  useEffect(() => {
    if (jobEdit) {
      console.log(">> jobEdit tiene datos");
      setFormJob({
        jobName: jobEdit.jobName,
        creationDate: jobEdit.creationDate,
        closingDate: jobEdit.closingDate ? jobEdit.closingDate : "",
        active: jobEdit.active,
        level_required: jobEdit.levelRequired,
        study_area: jobEdit.studyArea.join(","),
        experience_required: jobEdit.experienceRequired,
        industry: jobEdit.industry.join(","),
        benefits: jobEdit.benefits.join(","),
        skills_required: jobEdit.skillsRequired.join(","),
        job_description: jobEdit.jobDescription.join(","),
        job_goal: jobEdit.jobGoal.join(","),
        languages_required: jobEdit.languagesRequired.join(","),
        availability: jobEdit.availability,
        contract_offered: jobEdit.contractOffered,
      });
    } else {
      console.log(">> jobEdit NO Ttiene datos");
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {jobEdit ? (
          <h1>Modificacion de Oferta Laboral</h1>
        ) : (
          <h1>Carga de Nueva Oferta Laboral</h1>
        )}
      </div>
      <form onSubmit={submitHandler}>
        {/* DATOS DE OFERTA LABORAL*/}
        <div hidden={pageForm.div_data}>
          <JobData
            formJob={formJob}
            handleChangeForm={handleChangeForm}
            handleChangeSelect={handleChangeSelect}
          />
        </div>

        {/* INFORMACION Y BENEFICIOS DE OFERTA LABORAL*/}
        <div hidden={pageForm.div_info}>
          <JobInfo
            formJob={formJob}
            handleChangeForm={handleChangeForm}
            handleChangeSelect={handleChangeSelect}
          />
        </div>
        {/* BOTON GUARDAR */}
        <div className={styles.buttonForm}>
          <button
            name="submit"
            hidden={!isFormComplete}
            type="submit"
            className={styles.button}
          >
            <div className={styles.textButtonForm}>
              {jobEdit ? "Modificar" : "Cargar"} Oferta Laboral
            </div>
          </button>
        </div>
      </form>
      {/* BOTONES NAVEGACION */}
      <div className={styles.contentButton}>
        <button
          name="Anterior"
          hidden={pageForm.button1_hide}
          onClick={handlePageForm}
          className={styles.button}
        >
          {pageForm.button1}
        </button>
        <button
          name="Continuar"
          hidden={pageForm.button2_hide}
          onClick={handlePageForm}
          className={styles.button}
        >
          {pageForm.button2}
        </button>
      </div>
    </div>
  );
};

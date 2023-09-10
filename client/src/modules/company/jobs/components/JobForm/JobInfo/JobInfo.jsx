import { useEffect, useState } from "react";
import style from "./JobInfo.module.css";

const JobInfo = ({ formJob, handleChangeForm, handleChangeSelect }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await fetch("../../../../src/data/data.json");
        const jsonData = await response.json();
        //console.log("que trae jsonData: ", jsonData);
        setData(jsonData);
      } catch (error) {
        console.log("error al leer data.json: ", error.message);
      }
    };
    fetchdata();
  }, []);

  return (
    <div>
      <div className={style.container}>
        <hr />
        <br></br>
        <h1>Informacion Adicional de la Oferta</h1>
        <h3>Beneficios otorgados: </h3>
        <input
          name="benefits"
          type="text"
          value={formJob.benefits}
          onChange={handleChangeForm}
          placeholder="ingrese beneficios separados por comas"
        ></input>

        {/* {error.benefits && (
                        <label style={{ color: "red" }}>{error.benefits}</label>
                    )} */}
        <br />

        <h3>Habilidades requeridas: </h3>
        <input
          name="skills_required"
          type="text"
          value={formJob.skills_required}
          onChange={handleChangeForm}
          placeholder="ingrese habilidades separadas por comas"
        ></input>
        {/* {error.skills_required && (
                        <label style={{ color: "red" }}>{error.skills_required}</label>
                    )} */}
        <br />

        <h3>Descripcion y Responsabilidades del puesto: </h3>
        <input
          name="job_description"
          type="text"
          value={formJob.job_description}
          onChange={handleChangeForm}
          placeholder="ingrese descripcion separados por comas"
        ></input>
        {/* {error.job_description && (
                        <label style={{ color: "red" }}>{error.job_description}</label>
                    )} */}
        <br />

        <h3>Objetivos y metas del trabajo propuesto: </h3>
        <input
          name="job_goal"
          type="text"
          value={formJob.job_goal}
          onChange={handleChangeForm}
          placeholder="ingrese objetivos separados por comas"
        ></input>
        {/* {error.job_goal && (
                        <label style={{ color: "red" }}>{error.job_goal}</label>
                    )} */}
        <br />

        <h3>Idiomas Requeridos: </h3>
        <input
          name="languages_required"
          type="text"
          value={formJob.languages_required}
          onChange={handleChangeForm}
          placeholder="ingrese idiomas separados por comas"
        ></input>
        {/* {error.languages_required && (
                        <label style={{ color: "red" }}>{error.languages_required}</label>
                    )} */}
        <br />

        <h3>Disponibilidad: </h3>
        <select
          name="availability"
          value={formJob.availability ? formJob.availability : null}
          onChange={handleChangeSelect}
        >
          <option selected disabled value="predefinido">
            --Seleccione opcion--
          </option>
          {data?.availabilitys.map((availability, index) => (
            <option key={index} value={availability.value}>
              {availability.value}
            </option>
          ))}
        </select>
        {/* {error.availability && (
                        <label style={{ color: "red" }}>{error.availability}</label>
                    )} */}
        <br />

        <h3>Tipo de Contratacion Ofrecida: </h3>
        <select
          name="contract_offered"
          value={formJob.contract_offered ? formJob.contract_offered : null}
          onChange={handleChangeSelect}
        >
          <option selected disabled value="predefinido">
            --Seleccione opcion--
          </option>
          {data?.contracts.map((contract, index) => (
            <option key={index} value={contract.value}>
              {contract.value}
            </option>
          ))}
        </select>
        {/* {error.contract_offered && (
                        <label style={{ color: "red" }}>{error.contract_offered}</label>
                    )} */}
        <br />
      </div>
    </div>
  );
};

export default JobInfo;

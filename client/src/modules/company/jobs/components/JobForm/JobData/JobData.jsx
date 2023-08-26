import { useEffect, useState } from "react";
import style from "./JobData.module.css";

const JobData = ({ formJob, handleChangeForm, handleChangeSelect }) => {
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
        <hr></hr>
        <br />
        <h1>Datos de la Oferta Laboral</h1>
        <br />
        <h3>Nombre del puesto: </h3>
        <input
          name="jobName"
          type="text"
          value={formJob.jobName}
          onChange={handleChangeForm}
          placeholder="ingrese nombre del puesto"
        ></input>
        <br />
        <div className={style.dateContainer}>
          <div>
            <h3>Fecha de Creacion: </h3>
            <input
              name="creationDate"
              type="date"
              value={formJob.creationDate}
              onChange={handleChangeForm}
            ></input>
            <br />
          </div>
          <div>
            <h3>¿Oferta Activa?</h3>
            <input
              name="active"
              type="checkbox"
              checked={formJob.active}
              //value={formJob.active}
              onChange={handleChangeForm}
            />
            <br />
          </div>
          <div>
            <h3>Fecha de Cierre: </h3>
            <input
              name="closingDate"
              type="date"
              value={formJob.closingDate}
              onChange={handleChangeForm}
            ></input>
            <br />
          </div>
        </div>
        <hr></hr>
        <br />
        <h1>Requisitos Academicos</h1>

        <h3>Nivel educativo requerido: </h3>
        <select
          name="level_required"
          value={formJob.level_required ? formJob.level_required : null}
          onChange={handleChangeSelect}
        >
          <option selected disabled value="predefinido">
            --Seleccione opcion--
          </option>
          {data?.levelStudent.map((level, index) => (
            <option key={index} value={level.value}>
              {level.value}
            </option>
          ))}
        </select>
        {/* {error.level_required && (
                        <label style={{ color: "red" }}>{error.level_required}</label>
                    )} */}
        <br />

        <h3>¿Que areas la empresa busca incorporar personal? </h3>
        <input
          name="study_area"
          type="text"
          value={formJob.study_area}
          onChange={handleChangeForm}
          placeholder="ingrese areas separadas por comas"
        ></input>
        {/* {error.study_area && (
                        <label style={{ color: "red" }}>{error.study_area}</label>
                    )} */}
        <br />

        <h3>Experiencia requerida: </h3>
        <input
          name="experience_required"
          type="number"
          value={formJob.experience_required}
          onChange={handleChangeForm}
        ></input>
        {/* {error.experience_required && (
                        <label style={{ color: "red" }}>{error.experience_required}</label>
                    )} */}
        <br />

        <h3>Industria/Sector: </h3>
        <select
          name="industry"
          value={formJob.industry ? formJob.industry : null}
          onChange={handleChangeSelect}
        >
          <option selected disabled value="predefinido">
            --Seleccione opcion--
          </option>
          {data?.industrySector.map((industry, index) => (
            <option key={index} value={industry.value}>
              {industry.value}
            </option>
          ))}
        </select>
        {/* <input
                        name="industry"
                        type="text"
                        value={formJob.industry}
                        onChange={handleChangeForm}
                    ></input>                     */}

        <br />
      </div>
    </div>
  );
};
export default JobData;

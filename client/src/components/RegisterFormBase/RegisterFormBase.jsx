import { useEffect, useState } from "react";
import style from "./RegisterFormBase.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { validationRegister } from "../../utils/validationRegister";
import { Link } from "react-router-dom";
import axios from "axios";
const {VITE_URL} = import.meta.env;

const RegisterFormBase = ({type})  => {
    const [validateLogin, setValidateLogin] = useState(null);
    const navigate = useNavigate();
    const URL = `${VITE_URL}/api/v1/auth/register`;
    

  const [inputs, setInputs] = useState({
    profile_support: false,
    info_interests: [],
    type,
    email: "",
    password: "",
    name: "",
    username: ""
  });
  const interests = [
    "Informática / Telecomunicaciones",
    "Medicina / Salud",
    "Ingeniería Civil",
    "Educación / Docencia",
    "Marketing / Publicidad",
    "Arquitectura",
    "Finanzas / Contabilidad",
    "Diseño Gráfico / Multimedia",
    "Psicología / Terapia",
    "Derecho / Legal",
    "Recursos Humanos",
    "Arte / Bellas Artes",
    "Ciencias Ambientales",
    "Gestión de Proyectos",
    "Periodismo / Comunicación",
    "Turismo / Hospitalidad",
    "Música / Artes Escénicas",
    "Agricultura / Agronomía",
    "Logística / Cadena de Suministro"
];


  useEffect(() => {
    if(window.location.href.indexOf("studentRegister") > -1) {
      inputs.type = "student"
    }
    if(window.location.href.indexOf("professionalRegister") > -1) {
      inputs.type = "professional"
    }
    if(window.location.href.indexOf("companyRegister") > -1) {
      inputs.type = "company"
    }
  }, [])

  const handleInputs = (event) => {
    const { value, name } = event.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleIsCheck = () => {
    setInputs((prevState) => ({
      ...prevState,
      profile_support: !inputs.profile_support
    }))
  }

const handleInterestsChange = (event) => {
  event.preventDefault();
  const selectedValues = Array.from(event.target.selectedOptions, (option) => option.value);

  // Filtrar los valores seleccionados que ya existen y eliminarlos del array
  const newInterests = inputs.info_interests.filter(interest => !selectedValues.includes(interest));

  // Verificar si algún elemento seleccionado ya existe en info_interests, si existe, eliminarlo
  const updatedInterests = selectedValues.filter(value => !inputs.info_interests.includes(value));

  setInputs((prevInputs) => ({
    ...prevInputs,
    info_interests: [...newInterests, ...updatedInterests],
  }));
  
  event.target.blur();
};
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (inputs.email && inputs.password && inputs.username && inputs.name && type) {
      const validation = validationRegister(inputs.email)
      if(!validation)setValidateLogin(false)
      else {
        try {
          const fetch = await axios.post(URL, inputs);
          const result = fetch.data;
          console.log(result);
          setValidateLogin(true);
          navigate("/Trends_app_MVP/login");
        } catch (error) {
          console.log(error.response.data.error);
        }
      }
  }}

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

    return(
        <div className={style.BGContainer}>
      <div className={style.Card}>
        <div className={style.RightContainer}>
          <form onSubmit={handleSubmit}>
            <h2>Sign Up {capitalize(type)}</h2>
            <div className={style.Input}>
              <input name="name" onChange={handleInputs} type="text" placeholder="Name" />
            </div>
            <div className={style.Input}>
              <input name="username" onChange={handleInputs} type="text" placeholder="Username" />
            </div>
            <div className={style.Input}>
              <input name="email" onChange={handleInputs} type="text" placeholder="Email" />
              <p className={validateLogin === false ? `${style.Error}` : style.NoError}>you must enter a validate email</p>
            </div>
            <div className={style.Input}>
              <input name="password" onChange={handleInputs} type="password" placeholder="Password" />
            </div>
            <div className={style.Input}>
                <select multiple value={inputs.info_interests} onChange={handleInterestsChange}>
                    {interests.map((categoria, index) => (
                    <option key={index} value={categoria}>
                        {categoria}
                    </option>
                    ))}
                </select>
            </div>
            <div className={style.Options}>
              <div>
                <input id="remember" type="checkbox" checked={inputs.support} onChange={handleIsCheck}/>
                <label htmlFor="remember">  Support?</label>
              </div>
            </div>
            <button disabled={!(inputs.email && inputs.password && inputs.name && inputs.username)} type="submit">Register</button>
            <hr />
            <div className={style.Account}>
              <span>Already have an account?</span>
              <Link to={"/Trends_app_MVP/login"}>
                <span className={style.Bold}>Log in</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
    )
}

export default RegisterFormBase

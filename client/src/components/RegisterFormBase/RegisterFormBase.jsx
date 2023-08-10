import { useEffect, useState } from "react";
import style from "./RegisterFormBase.module.css";
import { useNavigate } from "react-router-dom";
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
    type,
    email: "",
    password: "",
    name: "",
    username: ""
  });

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

export default RegisterFormBase;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./loginPage.module.css";
import welcome from "../../assets/TestIcons/welcome.jpeg";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUserInfo } from "../../Redux/UsersSlice";
const { VITE_URL } = import.meta.env;

export default function LoginPage() {
  const [validateLogin, setValidateLogin] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    user: "",
    password: "",
  });

  const handleInputs = (event) => {
    // console.log(inputs);
    const { value, name } = event.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //?FUNCION PARA OBTENER UNA CADENA DE CONSULTA UNICA
  //?Y SE ACTUALICEN LOS DATOS (SIMULA CTRL+F5)
  function getUniqueQueryString() {
    return `?_=${Date.now()}`;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (inputs.user && inputs.password) {
      // console.log(inputs)
      try {
        await axios.post(`${VITE_URL}/auth/login` + getUniqueQueryString(), inputs, {
          withCredentials: "include",
        });
        //console.log("que trae resp <loginPage>: ", resp)
        dispatch(getUserInfo());
        const { data } = await axios.get(
          `${VITE_URL}/user/profile` + getUniqueQueryString(),
          { withCredentials: "include" }
        );
        //console.log("Que tiene respPerfil <loginPage>: ", data);

        if (data.type === "company") navigate("/Trends_app_MVP/FeedCompany");
        else if (data.type === "admin") navigate("/Trends_app_MVP/admin");
        else navigate("/Trends_app_MVP/Feed");
      } catch (error) {
        console.log(error);
        // console.log(error.response.data.error);
      }
    } else {
      setValidateLogin(false);
    }
  };

  return (
    <div className={style.BGContainer}>
      <div className={style.Card}>
        <div className={style.LeftContainer}>
          <div>
            <h1>Te damos la bienvenida</h1>
            <h3 className={style.MainText}>
              Al comenzar, vas a encontrar una lista de profesionales dispuestos
              a ayudarte y compartirte sus experiencias.
            </h3>
          </div>
          <img src={welcome} alt="" />
          <h3>Tambien tenemos convenios con empresas!</h3>
          <h3>
            Para que puedas navegar en muchas oportunidades laborales de tu
            nicho.
          </h3>
        </div>

        <div className={style.RightContainer}>
          <form onSubmit={handleSubmit}>
            <h2>Log In</h2>
            <div className={style.Input}>
              <input
                name="user"
                onChange={handleInputs}
                type="text"
                placeholder="Email or username"
              />
              <p
                className={
                  validateLogin === false ? `${style.Error}` : style.NoError
                }
              >
                wrong email or password
              </p>
            </div>
            <div className={style.Input}>
              <input
                name="password"
                onChange={handleInputs}
                type="password"
                placeholder="Password"
              />
              <p
                className={
                  validateLogin === false ? `${style.Error}` : style.NoError
                }
              >
                wrong email or password
              </p>
            </div>
            <div className={style.Options}>
              <div>
                <input id="remember" type="checkbox" />
                <label htmlFor="remember"> Remember me</label>
              </div>
              <div>forgot Password</div>
            </div>
            <button disabled={!(inputs.user && inputs.password)} type="submit">
              Sign In
            </button>
            <hr />
            <div className={style.Account}>
              <span>Doesn&apos;t have an account?</span>{" "}
              <span className={style.Bold}>Create Account</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

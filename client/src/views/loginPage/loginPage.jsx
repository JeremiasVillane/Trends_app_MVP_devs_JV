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
  const URL = `${VITE_URL}/auth/login`;
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    user: "",
    password: "",
  });

  const handleInputs = (event) => {
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

  //?FUNCION PARA OBTENER UNA CADENA DE CONSULTA UNICA
  //?Y SE ACTUALICEN LOS DATOS (SIMULA CTRL+F5)
  function getUniqueQueryString() {
    return `?_=${Date.now()}`;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (inputs.user && inputs.password) {
      try {
        await axios.post(`${VITE_URL}/auth/login`, inputs, {
          withCredentials: "include",
        });
        dispatch(getUserInfo());
        const { data } = await axios.get(`${VITE_URL}/user/profile`, {
          withCredentials: "include",
        });

        if (data.type === "company") navigate("/company/feed");
        else if (data.type === "admin") navigate("/admin");
        else navigate("/user/feed");
      } catch (error) {
        console.log(error);
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
            <h1>Bienvenido/a a nuestra plataforma,</h1>
            <h3 className={style.MainText}>
              Desde el momento en que te unas, tendrás acceso directo a
              profesionales dispuestos a ayudarte y compartir sus experiencias.
            </h3>
          </div>
          <img src={welcome} alt="" />
          <h3>
            ¡Pero eso no es todo! ¡También contamos con alianzas empresariales!
          </h3>
          <h3>
            Podrás explorar oportunidades laborales en tu campo de
            especialización.
          </h3>
        </div>

        <div className={style.RightContainer}>
          <form onSubmit={handleSubmit}>
            <h2>Ingresa con tu cuenta</h2>
            <div className={style.Input}>
              <input
                name="user"
                onChange={handleInputs}
                type="text"
                placeholder="Correo o nombre de usuario"
              />
            </div>
            <div className={style.Input}>
              <input
                name="password"
                onChange={handleInputs}
                type="password"
                placeholder="Contraseña"
              />
            </div>
            <div className={style.Options}>
              {/* <div>
                <input id="remember" type="checkbox" />
                <label htmlFor="remember"> Recuérdame</label>
              </div> */}
              {/* <div>forgot Password</div> */}
            </div>
            <button disabled={!(inputs.user && inputs.password)} type="submit">
              Ingresar
            </button>
            <hr />
            {/* <div className={style.Account}>
              <span>¿No tienes cuenta?</span>{" "}
              <span className={style.Bold}>Crea tu cuenta</span>
            </div> */}
          </form>
        </div>
      </div>
    </div>
  );
}

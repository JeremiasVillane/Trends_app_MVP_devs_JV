import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import welcome from "../../assets/imagenes/welcome.png";
import { getUserInfo, selectDarkMode } from "../../Redux/UsersSlice";
import { validateLogin } from "../../utils";
import style from "./loginPage.module.css";
const { VITE_URL } = import.meta.env;

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const darkMode = useSelector(selectDarkMode);
  const MySwal = withReactContent(Swal);

  const [inputs, setInputs] = useState({
    user: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    user: "",
  });

  const handleChange = (event) => {
    const { value, name } = event.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors((prevState) =>
      validateLogin({
        ...prevState,
        [name]: value,
      })
    );
  };

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
        else if (data.type === "admin") navigate("/admin/dashboard");
        else navigate("/user/feed");
      } catch (error) {
        MySwal.fire({
          icon: "error",
          position: "top-end",
          toast: true,
          title: error.response.data.error,
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
          background: darkMode ? "#383636" : "#FFF",
          color: darkMode ? "#FFF" : "#545454",
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
      }
    }
  };

  return (
    <div className={style.MajorContainer}>
      <div className={style.BGContainer}>
        <div className={style.Card}>
          <div className={style.LeftContainer}>
            <div>
              <h1>Bienvenido/a a nuestra plataforma,</h1>
              <h3 className={style.MainText}>
                Desde el momento en que te unas, tendrás acceso directo a
                profesionales dispuestos a ayudarte y compartir sus
                experiencias.
              </h3>
            </div>
            <img src={welcome} alt="Bienvenido" />
            <h3>
              ¡Pero eso no es todo! ¡También contamos con alianzas
              empresariales!
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
                  onChange={handleChange}
                  type="text"
                  placeholder="Correo o nombre de usuario"
                />
              {errors.user && (
                <span className={style.error}>{errors.user}</span>
              )}
              </div>
              <div className={style.Input}>
                <input
                  name="password"
                  onChange={handleChange}
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
              <button
                disabled={!(inputs.user && inputs.password)}
                type="submit"
              >
                Ingresar
              </button>
              <hr />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

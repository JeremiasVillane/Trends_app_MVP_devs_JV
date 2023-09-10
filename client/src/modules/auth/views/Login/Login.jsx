import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import welcome from "../../../../assets/imagenes/welcome.png";
import { selectDarkMode } from "../../../../redux/uiSlice";
import { getUserInfo } from "../../../../redux/usersSlice";
import { validateLogin } from "../../utils";
import styles from "./Login.module.css";
const { VITE_URL } = import.meta.env;

const Login = () => {
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
    if (name === "user") {
      setErrors((prevState) =>
        validateLogin({
          ...prevState,
          [name]: value,
        })
      );
    }
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
          title: error.response.data.error || "Error del servidor",
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
    <div className={styles.MajorContainer} style={{ userSelect: "none" }}>
      <div className={styles.BGContainer}>
        <div className={styles.Card}>
          <div className={styles.LeftContainer}>
            <div>
              <h1>Bienvenido/a nuevamente,</h1>
              <h3 className={styles.MainText}>
                Una vez que inicies sesión encontrarás profesionales dispuestos
                a compartir sus experiencias y estudiantes que están ingresando
                al mundo laboral.
              </h3>
            </div>
            <img src={welcome} alt="Bienvenido" />
            <div className={styles.ExtraText}>
              <h3>
                Pero eso no es todo ¡También contamos con una sección para
                empresas!
              </h3>
              <h3>
                Próximamente experimentarás nuestra herramienta de búsqueda
                automática de trabajo
              </h3>
            </div>
          </div>

          <div className={styles.RightContainer}>
            <form onSubmit={handleSubmit}>
              <h2>Ingresa con tu cuenta</h2>
              <div className={styles.Input}>
                <input
                  name="user"
                  onChange={handleChange}
                  type="text"
                  placeholder="Correo o nombre de usuario"
                  autoComplete="username"
                />
                {errors.user && (
                  <span className={styles.error}>{errors.user}</span>
                )}
              </div>
              <div className={styles.Input}>
                <input
                  name="password"
                  onChange={handleChange}
                  type="password"
                  placeholder="Contraseña"
                  autoComplete="current-password"
                />
              </div>
              <div className={styles.Options}>
                {/* <div>
                <input id="remember" type="checkbox" />
                <label htmlFor="remember"> Recuérdame</label>
              </div> */}
                {/* <div>forgot Password</div> */}
              </div>
              <button
                disabled={
                  !(inputs.user && inputs.password) ||
                  Object.keys(errors).length > 0
                }
                type="submit"
              >
                Ingresar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

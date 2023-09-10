import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { getUserInfo } from "../../../../redux/usersSlice";
import { validateRegister } from "../../utils";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import styles from "./Register.module.css";
import { checkboxInterests } from "../../data";
import { translateUserType } from "../../../../utils/helpers";
import { selectDarkMode } from "../../../../redux/uiSlice";
const { VITE_URL } = import.meta.env;

/**
 * Componente para el formulario de registro.
 *
 * @component
 * @param {string} type - Tipo de registro ("student", "professional", "company").
 * @returns {JSX.Element} Componente Register.
 */
const Register = ({ type }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const darkMode = useSelector(selectDarkMode);
  const MySwal = withReactContent(Swal);
  const URL = `${VITE_URL}/auth/register`;
  const URL_LOGIN = `${VITE_URL}/auth/login`;
  const [showPassword, setShowPassword] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState([]);

  // Se definen los campos de registro
  const [inputs, setInputs] = useState({
    type,
    name: "",
    username: "",
    email: "",
    password: "",
    info_interests: [],
    profile_support: false,
  });
  const [errors, setErrors] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    info_interests: [],
  });

  // Se actualiza el tipo de usuario y sus intereses
  useEffect(() => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      type,
      info_interests: selectedInterests,
    }));
  }, [type, selectedInterests]);

  /**
   * Maneja los cambios en los campos de entrada.
   *
   * @param {Object} event - Evento de cambio en el campo de entrada.
   */
  const handleChange = (event) => {
    const { value, name } = event.target;

    setInputs({
      ...inputs,
      [name]: value,
    });
    setErrors(
      validateRegister({
        ...inputs,
        [name]: value,
      })
    );
  };

  // Alterna la casilla de verificación de soporte.
  const handleIsCheck = () => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      profile_support: !prevInputs.profile_support,
    }));
  };

  // Maneja el cambio de intereses seleccionados.
  const handleCheckboxChange = (event) => {
    const interestId = parseInt(event.target.value);
    const selectedInterest = checkboxInterests.find(
      (interest) => interest.id === interestId
    );

    if (selectedInterests.includes(selectedInterest.label)) {
      setSelectedInterests(
        selectedInterests.filter(
          (interest) => interest !== selectedInterest.label
        )
      );
    } else {
      setSelectedInterests([...selectedInterests, selectedInterest.label]);
    }
  };

  /**
   * Maneja el envío del formulario.
   *
   * @param {Object} event - Evento de envío del formulario.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(URL, inputs).then(
        async () =>
          await axios.post(
            URL_LOGIN,
            {
              user: inputs.email,
              password: inputs.password,
            },
            { withCredentials: "include" }
          )
      );

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
  };

  return (
    <div className={styles.BGContainer}>
      <div className={styles.Card}>
        <div className={styles.RightContainer}>
          <form onSubmit={handleSubmit} style={{userSelect: "none"}}>
            <h2>Crea tu cuenta de {translateUserType(type)}</h2>
            <div className={styles.Input}>
              <input
                name="name"
                onChange={handleChange}
                type="text"
                placeholder="Nombre"
                className={styles.field}
                autoComplete="given-name"
              />
              <br />
              {errors.name && <p className={styles.error}>{errors.name}</p>}
            </div>
            <div className={styles.Input}>
              <input
                name="username"
                onChange={handleChange}
                type="text"
                placeholder="Nombre de usuario"
                className={styles.field}
                autoComplete="username"
              />
              <br />
              {errors.username && (
                <p className={styles.error}>{errors.username}</p>
              )}
            </div>
            <div className={styles.Input}>
              <input
                name="email"
                onChange={handleChange}
                type="text"
                placeholder="Correo electrónico"
                className={styles.field}
                autoComplete="email"
              />
              <br />
              {errors.email && <p className={styles.error}>{errors.email}</p>}
            </div>
            <div className={styles.Input}>
              <input
                name="password"
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                className={styles.field}
                autoComplete="new-password"
              />
              <br />
              {errors.password && (
                <p className={styles.error}>{errors.password}</p>
              )}
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <details>
                <summary
                  style={{
                    fontStyle: "italic",
                    fontWeight: "medium",
                    cursor: "pointer",
                  }}
                >
                  Elige{" "}
                  {type === "company" ? "tu área/industria" : "tus intereses"}*
                  :
                </summary>
                <div className={styles.checkboxes_list}>
                  {checkboxInterests.map((interest) => (
                    <label key={interest.id}>
                      <div className={styles.Options}>
                        <div>
                          <input
                            type="checkbox"
                            className={styles.ui_checkbox}
                            value={interest.id}
                            checked={selectedInterests.includes(interest.label)}
                            onChange={handleCheckboxChange}
                          />
                          {interest.label}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </details>
              {errors.info_interests && (
                <p className={styles.error}>{errors.info_interests}</p>
              )}
            </div>
            {type !== "company" && (
              <div style={{display: "flex", alignItems: "flex-start", }}>
                <input
                  id="remember"
                  type="checkbox"
                  className={styles.ui_checkbox}
                  style={{flex: "none"}}
                  checked={inputs.support}
                  onChange={handleIsCheck}
                />
                <label
                  htmlFor="remember"
                  className={styles.support}
                >
                  ¿
                  {type === "professional"
                    ? "Estás dispuesto a compartir tu experiencia con estudiantes"
                    : "Te gustaría conectar con un profesional en tu área de interés"}
                  ?
                </label>
              </div>
            )}
            <button
              disabled={
                Object.keys(errors).length > 0 || !selectedInterests.length
              }
              type="submit"
            >
              Crear cuenta
            </button>
            <hr />
            <div className={styles.Account}>
              <span>¿Ya tienes cuenta?</span>
              <Link to={"/auth/login"}>
                <span className={styles.Bold}>Ingresa aquí</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

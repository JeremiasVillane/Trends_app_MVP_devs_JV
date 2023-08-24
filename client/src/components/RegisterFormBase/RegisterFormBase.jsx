import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { checkboxInterests } from "../../data/fields";
import { getUserInfo } from "../../Redux/UsersSlice";
import { validateRegister } from "../../utils";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import style from "./RegisterFormBase.module.css";
const { VITE_URL } = import.meta.env;

/**
 * Componente para el formulario de registro.
 *
 * @component
 * @param {string} type - Tipo de registro ("student", "professional", "company").
 * @returns {JSX.Element} Componente RegisterFormBase.
 */
const RegisterFormBase = ({ type }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
      console.log(error.response.data.error);
    }
    // }
  };

  /**
   * Traduce el 'tipo' de usuario.
   *
   * @param {string} str - Cadena de entrada.
   * @returns {string} Cadena traducida.
   */
  const translate = (str) => {
    let type;

    str === "student" && (type = "estudiante");
    str === "professional" && (type = "profesional");
    str === "company" && (type = "empresa");

    return type;
  };

  return (
    <div className={style.BGContainer}>
      <div className={style.Card}>
        <div className={style.RightContainer}>
          <form onSubmit={handleSubmit}>
            <h2>Crea tu cuenta de {translate(type)}</h2>
            <div className={style.Input}>
              <input
                name="name"
                onChange={handleChange}
                type="text"
                placeholder="Nombre"
                className={style.field}
              />
              <br />
              {errors.name && <p className={style.error}>{errors.name}</p>}
            </div>
            <div className={style.Input}>
              <input
                name="username"
                onChange={handleChange}
                type="text"
                placeholder="Nombre de usuario"
                className={style.field}
              />
              <br />
              {errors.username && (
                <p className={style.error}>{errors.username}</p>
              )}
            </div>
            <div className={style.Input}>
              <input
                name="email"
                onChange={handleChange}
                type="text"
                placeholder="Correo electrónico"
                className={style.field}
              />
              <br />
              {errors.email && <p className={style.error}>{errors.email}</p>}
            </div>
            <div className={style.Input}>
              <input
                name="password"
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                className={style.field}
              />
              <br />
              {errors.password && (
                <p className={style.error}>{errors.password}</p>
              )}
            </div>
            <div>
              <details>
                <summary>
                  Elige{" "}
                  {type === "company" ? "tu área/industria" : "tus intereses"}:
                </summary>
                {checkboxInterests.map((interest) => (
                  <label key={interest.id}>
                    <div className={style.Options}>
                      <div>
                        <input
                          type="checkbox"
                          className={style.ui_checkbox}
                          value={interest.id}
                          checked={selectedInterests.includes(interest.label)}
                          onChange={handleCheckboxChange}
                        />
                        {interest.label}
                      </div>
                    </div>
                  </label>
                ))}
              </details>
              {errors.info_interests && (
                <p className={style.error}>{errors.info_interests}</p>
              )}
            </div>
            {type !== "company" && (
              // <div className={style.Options}>
                <div>
                  <input
                    id="remember"
                    type="checkbox"
                    className={style.ui_checkbox}
                    checked={inputs.support}
                    onChange={handleIsCheck}
                  />
                  <label htmlFor="remember" className={style.support}>
                    ¿
                    {type === "professional"
                      ? "Estás dispuesto a compartir tu experiencia con estudiantes"
                      : "Te gustaría conectar con un profesional en tu área de interés"}
                    ?
                  </label>
                </div>
              // </div>
            )}
            <button disabled={Object.keys(errors).length > 0} type="submit">
              Crear cuenta
            </button>
            <hr />
            <div className={style.Account}>
              <span>¿Ya tienes cuenta?</span>
              <Link to={"/auth/login"}>
                <span className={style.Bold}>Ingresa aquí</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterFormBase;

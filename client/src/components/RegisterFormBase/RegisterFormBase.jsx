import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { interests } from "../../data/fields";
import { getUserInfo } from "../../Redux/UsersSlice";
import style from "./RegisterFormBase.module.css";
const { VITE_URL } = import.meta.env;

/**
 * Componente para el formulario de registro.
 *
 * @component
 * @param {string} type - Tipo de registro ("usuario" o "admin").
 * @returns {JSX.Element} Componente RegisterFormBase.
 */
const RegisterFormBase = ({ type }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const URL = `${VITE_URL}/auth/register`;
  const URL_LOGIN = `${VITE_URL}/auth/login`;

  /**
   * Define los campos de registro
   */
  const [inputs, setInputs] = useState({
    profile_support: false,
    info_interests: [],
    type,
    email: "",
    password: "",
    name: "",
    username: "",
  });

  /**
   * Actualiza únicamente el tipo de usuario
   */
  useEffect(() => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      type,
    }));
  }, [type]);

  /**
   * Maneja los cambios en los campos de entrada.
   *
   * @param {Object} event - Evento de cambio en el campo de entrada.
   */
  const handleInputs = (event) => {
    const { value, name } = event.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  /**
   * Alterna la casilla de verificación de soporte.
   */
  const handleIsCheck = () => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      profile_support: !prevInputs.profile_support,
    }));
  };

  /**
   * Maneja el cambio de intereses seleccionados.
   *
   * @param {Object} event - Evento de cambio en el select.
   */
  const handleInterestsChange = (event) => {
    event.preventDefault();
    const selectedValues = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );

    // Filtra los valores seleccionados
    // que ya existen y los elimina del array
    const newInterests = inputs.info_interests.filter(
      (interest) => !selectedValues.includes(interest)
    );

    // Verifica si algún elemento seleccionado
    // ya existe en info_interests, si existe, lo elimina
    const updatedInterests = selectedValues.filter(
      (value) => !inputs.info_interests.includes(value)
    );

    setInputs((prevInputs) => ({
      ...prevInputs,
      info_interests: [...newInterests, ...updatedInterests],
    }));

    event.target.blur();
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
                onChange={handleInputs}
                type="text"
                placeholder="Nombre"
              />
            </div>
            <div className={style.Input}>
              <input
                name="username"
                onChange={handleInputs}
                type="text"
                placeholder="Nombre de usuario"
              />
            </div>
            <div className={style.Input}>
              <input
                name="email"
                onChange={handleInputs}
                type="text"
                placeholder="Correo electrónico"
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
            <div className={style.Input}>
              <select
                multiple
                value={inputs.info_interests}
                onChange={handleInterestsChange}
              >
                {interests.map((interest, index) => (
                  <option key={index} value={interest}>
                    {interest}
                  </option>
                ))}
              </select>
            </div>
            {type !== "company" && (
              <div className={style.Options}>
                <div>
                  <input
                    id="remember"
                    type="checkbox"
                    checked={inputs.support}
                    onChange={handleIsCheck}
                  />
                  <label htmlFor="remember">
                    ¿
                    {type === "professional"
                      ? "Te gustaría conectar con un profesional en tu área de interés?"
                      : "Estás dispuesto a compartir tu experiencia con estudiantes?"}
                  </label>
                </div>
              </div>
            )}
            <button
              disabled={
                !(
                  inputs.email &&
                  inputs.password &&
                  inputs.name &&
                  inputs.username
                )
              }
              type="submit"
            >
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

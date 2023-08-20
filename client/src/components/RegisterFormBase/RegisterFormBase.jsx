import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { interests } from "../../data/fields";
import { validationRegister } from "../../utils/validationRegister";
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
  const URL = `${VITE_URL}/auth/register`;

  const [inputs, setInputs] = useState({
    profile_support: false,
    info_interests: [],
    type,
    email: "",
    password: "",
    name: "",
    username: "",
  });

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

    const uniqueSelectedValues = new Set([
      ...inputs.info_interests,
      ...selectedValues,
    ]);

    const updatedInterests = Array.from(uniqueSelectedValues);

    setInputs((prevInputs) => ({
      ...prevInputs,
      info_interests: updatedInterests,
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
    if (
      inputs.email &&
      inputs.password &&
      inputs.username &&
      inputs.name &&
      type
    ) {
      const validation = validationRegister(inputs.email);
      if (!validation) {
        try {
          await axios.post(URL, inputs, {
            withCredentials: "include",
          });
          navigate("/auth/login");
        } catch (error) {
          console.log(error.response.data.error);
        }
      }
    }
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
                placeholder="Apellido"
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
                      ? "Estás dispuesto a brindar"
                      : "Quieres recibir"}{" "}
                    apoyo?
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

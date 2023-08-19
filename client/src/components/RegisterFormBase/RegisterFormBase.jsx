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
  const [validateLogin, setValidateLogin] = useState(null);
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
   * Alterna la casilla de verificación de soporte de perfil.
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
      if (!validation) setValidateLogin(false);
      else {
        try {
          const fetch = await axios.post(URL, inputs, {
            withCredentials: "include",
          });
          const result = fetch.data;
          console.log("resultado: ", result);
          setValidateLogin(true);
          navigate("/auth/login");
        } catch (error) {
          console.log(error.response.data.error);
        }
      }
    }
  };

  /**
   * Capitaliza la primera letra de una cadena.
   *
   * @param {string} str - Cadena de entrada.
   * @returns {string} Cadena capitalizada.
   */
  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className={style.BGContainer}>
      <div className={style.Card}>
        <div className={style.RightContainer}>
          <form onSubmit={handleSubmit}>
            <h2>Crea una nueva cuenta {capitalize(type)}</h2>
            <div className={style.Input}>
              <input
                name="name"
                onChange={handleInputs}
                type="text"
                placeholder="Name"
              />
            </div>
            <div className={style.Input}>
              <input
                name="username"
                onChange={handleInputs}
                type="text"
                placeholder="Username"
              />
            </div>
            <div className={style.Input}>
              <input
                name="email"
                onChange={handleInputs}
                type="text"
                placeholder="Email"
              />
              <p
                className={
                  validateLogin === false ? `${style.Error}` : style.NoError
                }
              >
                you must enter a validate email
              </p>
            </div>
            <div className={style.Input}>
              <input
                name="password"
                onChange={handleInputs}
                type="password"
                placeholder="Password"
              />
            </div>
            <div className={style.Input}>
              <select
                multiple
                value={inputs.info_interests}
                onChange={handleInterestsChange}
              >
                {interests.map((categoria, index) => (
                  <option key={index} value={categoria}>
                    {categoria}
                  </option>
                ))}
              </select>
            </div>
            <div className={style.Options}>
              <div>
                <input
                  id="remember"
                  type="checkbox"
                  checked={inputs.support}
                  onChange={handleIsCheck}
                />
                <label htmlFor="remember"> Support?</label>
              </div>
            </div>
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
              <span>Already have an account?</span>
              <Link to={"/auth/login"}>
                <span className={style.Bold}>Log in</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterFormBase;

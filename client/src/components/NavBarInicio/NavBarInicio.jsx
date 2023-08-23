import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import logoClaro from "../../assets/logos/logoClaro.png";
import { selectDarkMode, setDarkMode } from "../../Redux/UsersSlice";
import styles from "./NavBarInicio.module.css";

/**
 * Componente de la barra de navegación para la página de inicio.
 *
 * @component
 * @returns {React.Element} Componente NavBarInicio.
 */
function NavBarInicio() {
  const dispatch = useDispatch()
  const location = useLocation();
  const darkMode = useSelector(selectDarkMode);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    /**
     * Cierra el menú cuando se hace clic fuera de él.
     *
     * @param {Object} event - Evento de clic.
     */
    function closeMenuOnClickOutside(event) {
      if (showMenu && !event.target.classList.contains("toggle-button")) {
        setShowMenu(false);
      }
    }

    document.addEventListener("click", closeMenuOnClickOutside);
    return () => {
      document.removeEventListener("click", closeMenuOnClickOutside);
    };
  }, [showMenu]);

  /**
   * Alterna el modo oscuro en la aplicación.
   */
  function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle("dark-mode");

    dispatch(setDarkMode());
  }

  /**
   * Alterna la visibilidad del menú.
   */
  function toggleMenu() {
    setShowMenu((prevState) => !prevState);
  }

  return (
    <nav className={`${styles.navigation} ${darkMode ? "dark-mode" : ""}`}>
      {/* Logo */}
      <Link to="/">
        <div className={styles.logo}>
          <img src={logoClaro} alt="Logo" />
        </div>
      </Link>
      {/* Botones de autenticación y opciones de registro */}
      <div
        className={`${styles["auth-buttons"]} ${
          showMenu ? styles["show-menu"] : ""
        }`}
      >
        {location.pathname !== "/auth/login" && (
          <Link
            to="/auth/login"
            className="custom-link"
            onClick={() => setShowMenu(false)}
          >
            Iniciar sesión
          </Link>
        )}
        <button className="toggle-button" onClick={toggleMenu}>
          Crear cuenta
        </button>
        <div className={styles["register-options"]}>
          <Link
            to="auth/register/student"
            onClick={() => {
              toggleMenu();
              setShowMenu(false);
            }}
          >
            Estudiante
          </Link>
          <Link
            to="auth/register/professional"
            onClick={() => {
              toggleMenu();
              setShowMenu(false);
            }}
          >
            Profesional
          </Link>
          <Link
            to="auth/register/company"
            onClick={() => {
              toggleMenu();
              setShowMenu(false);
            }}
          >
            Empresa
          </Link>
        </div>
      </div>

      {/* Botón de modo oscuro */}
      <div className={styles["dark-mode-button"]}>
        <button onClick={toggleDarkMode}>
          {darkMode ? (
            <i className="fas fa-sun"></i>
          ) : (
            <i className="fas fa-moon"></i>
          )}
        </button>
      </div>
    </nav>
  );
}

export default NavBarInicio;

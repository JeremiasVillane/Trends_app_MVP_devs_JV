import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/imagenes/logo.png";
import styles from "./NavBarInicio.module.css";

/**
 * Componente de la barra de navegación para la página de inicio.
 *
 * @component
 * @returns {React.Element} Componente NavBarInicio.
 */
function NavBarInicio() {
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

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

    setDarkMode((prevDarkMode) => !prevDarkMode);
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
      <div className={styles.logo}>
        <img src={Logo} alt="Logo" />
      </div>

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

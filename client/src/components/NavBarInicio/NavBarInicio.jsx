import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/imagenes/logo.png";
import styles from "./NavBarInicio.module.css";
import { useLocation } from "react-router-dom";

function NavBarInicio() {
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
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

  function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle("dark-mode");

    setDarkMode((prevDarkMode) => !prevDarkMode);
  }

  function toggleMenu() {
    setShowMenu((prevState) => !prevState);
  }

  return (
    <nav className={`${styles.navigation} ${darkMode ? "dark-mode" : ""}`}>
      {/* Logo */}
      <div className={styles.logo}>
        <img src={Logo} alt="Logo" />
      </div>

      {/* Login y Sign Up (Registro) */}
      <div
        className={`${styles["auth-buttons"]} ${
          showMenu ? styles["show-menu"] : ""
        }`}
      >
        { location.pathname !== "/auth/login" && <Link
          to="/auth/login"
          className="custom-link"
          onClick={() => setShowMenu(false)}
        >
          Iniciar sesión
        </Link>}
        <button className="toggle-button" onClick={toggleMenu}>
          Crea tu cuenta
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

      {/* Botón de Modo Oscuro */}
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

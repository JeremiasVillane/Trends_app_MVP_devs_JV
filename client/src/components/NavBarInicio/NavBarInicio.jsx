import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/imagenes/1 (3) (2).png";
import styles from "./NavBarInicio.module.css";
import { FaMoon, FaSun } from "react-icons/fa";

function NavBarInicio() {
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
      <div className={`${styles["auth-buttons"]} ${showMenu ? styles["show-menu"] : ""}`}>
      <Link to="/Trends_app_MVP/login" className="custom-link" onClick={() => setShowMenu(false)}>
          Iniciar sesión
        </Link>
        <button className="toggle-button" onClick={toggleMenu}>
          Crea tu cuenta
        </button>
        <div className={styles["register-options"]}>
          <Link
            to="/Trends_app_MVP/studentRegister"
            onClick={() => {
              toggleMenu();
              setShowMenu(false);
            }}
          >
            Estudiante
          </Link>
          <Link
            to="/Trends_app_MVP/professionalRegister"
            onClick={() => {
              toggleMenu();
              setShowMenu(false);
            }}
          >
            Profesional
          </Link>
          <Link
            to="/Trends_app_MVP/companyRegister"
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
          {darkMode ? <i className="fas fa-sun"></i> : <i className="fas fa-moon"></i>}
        </button>
      </div>
    </nav>
  );
}

export default NavBarInicio;

import axios from "axios";
import { AiFillHome } from "react-icons/ai";
import { HiChat, HiLogout, HiUser } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, selectDarkMode, selectUserProfile, setDarkMode } from "../../Redux/UsersSlice";
import style from "./NavBarBase.module.css";
const { VITE_URL } = import.meta.env;

/**
 * Componente de la barra de navegación.
 *
 * @component
 * @returns {React.Element} Componente NavBarBase.
 */
const NavBarBase = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const darkMode = useSelector(selectDarkMode);
  const userData = useSelector(selectUserProfile);
  const lightColor = "white";
  const darkColor = "white";

  /**
   * Navega a la página de inicio.
   */
  const handleHome = () => {
    userData.type === "company" 
    ? navigate("/company/feed")
    : navigate("/user/feed");
  };

  /**
   * Navega a la página de perfil del usuario.
   */
  const handleProfile = () => {
    userData.type === "company" 
    ? navigate("/company/profile")
    : navigate("/user/profile");
  };

  /**
   * Navega a la página de chats.
   */
  const handleChats = () => {
    navigate("/chat");
  };

  /**
   * Maneja la acción de cerrar sesión.
   */
  const handleLogout = async () => {
    try {
      navigate("/");
      dispatch(logout());
      const URL = `${VITE_URL}/auth/logout`;
      await axios.post(URL, { withCredentials: "include" });
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Alterna el modo oscuro en la aplicación.
   */
  const toggleDarkMode = () => {
    const body = document.body;
    body.classList.toggle("dark-mode");

    dispatch(setDarkMode());
  };

  return (
    <div className={style.left}>
      {/* Botón y texto de Inicio */}
      <button onClick={handleHome} className={style.button} title="Inicio">
        <AiFillHome size={"2rem"} color={darkMode ? darkColor : lightColor} />
      </button>
      <p>Inicio</p>

      {/* Botón y texto de Perfil */}
      <button
        onClick={handleProfile}
        className={style.button}
        title="Mi Perfil"
      >
        <HiUser size={"2rem"} color={darkMode ? darkColor : lightColor} />
      </button>
      <p>Perfil</p>

      {/* Botón y texto de Chats */}
      <button onClick={handleChats} className={style.button} title="Chats">
        <HiChat size={"2rem"} color={darkMode ? darkColor : lightColor} />
      </button>
      <p>Chats</p>

      {/* Botón y texto de Salir */}
      <button onClick={handleLogout} className={style.button} title="Salir">
        <HiLogout size={"2rem"} color={darkMode ? darkColor : lightColor} />
      </button>
      <p>Salir</p>

      {/* Botón para alternar el modo oscuro */}
      <button className={style.button} onClick={toggleDarkMode}>
        <i
          className="fas fa-moon text-3xl"
          style={{ color: darkMode ? darkColor : lightColor }}
        />
      </button>
    </div>
  );
};

export default NavBarBase;

import axios from "axios";
import { AiFillHome } from "react-icons/ai";
import { HiChat, HiLogout, HiUser } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { selectIsMinimized } from "../../../redux/chatSlice";
import { persistor } from "../../../redux/store";
import {
  logout,
  selectDarkMode,
  selectUserProfile,
  setDarkMode,
} from "../../../redux/UsersSlice";
import styles from "./MainNavBar.module.css";
const { VITE_URL } = import.meta.env;

/**
 * Componente de la barra de navegación.
 *
 * @component
 * @returns {React.Element} Componente MainNavBar.
 */
export const MainNavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const darkMode = useSelector(selectDarkMode);
  const userData = useSelector(selectUserProfile);
  const isMinimized = useSelector(selectIsMinimized);
  const MySwal = withReactContent(Swal);
  const lightColor = "white";
  const darkColor = "white";

  // Navega a la página de inicio.
  const handleHome = () => {
    userData.type === "company"
      ? navigate("/company/feed")
      : navigate("/user/feed");
  };

  // Navega a la página de perfil del usuario.
  const handleProfile = () => {
    userData.type === "company"
      ? navigate("/company/profile")
      : navigate("/user/profile");
  };

  // Navega a la página de chats.
  const handleChats = () => {
    navigate("/chatroom/chat");
    // dispatch(setIsMinimized(!isMinimized))
  };

  // Maneja el cierre de sesión del usuario.
  const handleConfirmLogout = async () => {
    try {
      // Redirecciona a la Landing
      navigate("/");

      // Borra el persistStore de Redux
      persistor.pause();
      persistor.flush().then(() => {
        return persistor.purge();
      });

      // Borra el estado global de Redux
      dispatch(logout());

      const URL = `${VITE_URL}/auth/logout`;
      await axios.post(URL, { withCredentials: "include" });
    } catch (error) {
      console.log(error);
    }
  };

  // Renderiza el cuadro de diálogo de confirmación
  // de cierre de sesión del usuario.
  const handleLogout = () => {
    MySwal.fire({
      icon: "warning",
      iconColor: "#f1ca67",
      title: <strong>¿Estás seguro que quieres cerrar sesión?</strong>,
      confirmButtonText: "Cerrar sesión",
      confirmButtonColor: "#3085d6",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      background: darkMode ? "#383636" : "#FFF",
      color: darkMode ? "#FFF" : "#545454",
    }).then((result) => {
      if (result.isConfirmed) {
        handleConfirmLogout();
      }
    });
  };

  // Alterna el modo oscuro en la aplicación.
  const toggleDarkMode = () => {
    const body = document.body;
    body.classList.toggle("dark-mode");

    dispatch(setDarkMode());
  };

  return (
    <>
      <div className={styles.left}>
        {/* Botón y texto de Inicio */}
        <button onClick={handleHome} className={styles.button} title="Inicio">
          <AiFillHome size={"2rem"} color={darkMode ? darkColor : lightColor} />
        </button>
        <p>Inicio</p>

        {/* Botón y texto de Perfil */}
        <button
          onClick={handleProfile}
          className={styles.button}
          title="Mi Perfil"
        >
          <HiUser size={"2rem"} color={darkMode ? darkColor : lightColor} />
        </button>
        <p>Perfil</p>

        {/* Botón y texto de Chats */}
        <button onClick={handleChats} className={styles.button} title="Chats">
          <HiChat size={"2rem"} color={darkMode ? darkColor : lightColor} />
        </button>
        <p>Chats</p>

        {/* Botón y texto de Salir */}
        <button onClick={handleLogout} className={styles.button} title="Salir">
          <HiLogout size={"2rem"} color={darkMode ? darkColor : lightColor} />
        </button>
        <p>Salir</p>

        {/* Botón para alternar el modo oscuro */}
        <button className={styles.button} onClick={toggleDarkMode}>
          <i
            className="fas fa-moon text-3xl"
            style={{ color: darkMode ? darkColor : lightColor }}
          />
        </button>
      </div>
    </>
  );
};

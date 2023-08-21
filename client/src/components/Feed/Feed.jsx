import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProfessionals,
  getStudents,
  getUserInfo,
  matchUsers,
  selectAllUsers,
  selectProfessionals,
  selectStudents,
  selectUserProfile,
} from "../../Redux/UsersSlice";
import FeedCard from "../FeedCard/FeedCard";
import style from "./Feed.module.css";

/**
 * Componente de carga del "feed" de usuarios.
 *
 * @component
 * @returns {React.Element} Componente Feed.
 */
const Feed = () => {
  const users = useSelector(selectAllUsers);
  const dispatch = useDispatch();
  const profile = useSelector(selectUserProfile);
  const students = useSelector(selectStudents);
  const professionals = useSelector(selectProfessionals);
  const [page, setPage] = useState(1);

  /**
   * Realiza una solicitud para obtener más usuarios y actualizar la lista.
   */
  const fetchMoreUsers = () => {
    if (profile.id) {
      dispatch(getStudents({ id: profile.id, page }));
      dispatch(getProfessionals({ id: profile.id, page }));
    }
  };

  /**
   * Maneja el evento de desplazamiento de la ventana.
   */
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setPage(page + 1);
    }
  };

  // Carga los datos del usuario si no están ya en el estado global.
  useEffect(() => {
    if (!profile || Object.keys(profile).length === 0) {
      dispatch(getUserInfo());
    }
  }, []);

  // Si el perfil de usuario existe, se cargan los "matches"
  useEffect(() => {
    if (profile.id) {
      fetchMoreUsers();
    }
  }, [profile.id, page]);

  useEffect(() => {
    /**
     * Agrega un event listener para el evento de desplazamiento de la ventana.
     * Cuando el usuario hace scroll, se verifica si se ha llegado al final de la página.
     * Si es así, se actualiza el número de página para cargar más usuarios.
     */
    window.addEventListener("scroll", handleScroll);

    // Elimina el event listener cuando el componente se desmonta.
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Verifica la carga de estudiantes y profesionales
  // y despacha la función que llama al algoritmo de matcheo
  useEffect(() => {
    if (students && professionals) {
      dispatch(matchUsers());
    }
  }, [students, professionals]);

  return (
    <section className={style.BGContainer}>
      <div className={style.Container}>
        <header>
          <h1>Trends</h1>
        </header>
        <div className={style.FeedContainer}>
          <div className={style.Feed}>
            {users &&
              users.length > 0 &&
              users.map((user, userIndex) => (
                <div key={userIndex}>
                  {/* Tarjeta de usuario */}
                  <FeedCard user={user} />

                  {/* Línea divisora si no es el último usuario */}
                  {userIndex < users.length - 1 && <hr />}
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feed;

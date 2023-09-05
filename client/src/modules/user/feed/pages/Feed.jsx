import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Animate, AnimateGroup } from "react-simple-animate";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import logoBlancoBig from "../../../../assets/logos/logoBlancoBig.png";
import {
  getProfessionals,
  getStudents,
  getUserInfo,
  matchUsers,
  selectAllUsers,
  selectDarkMode,
  selectProfessionals,
  selectStudents,
  selectUserProfile,
  updateUserProfile,
} from "../../../../redux/UsersSlice";
import { ProfileUpdate } from "../../profile";
import { FeedCard, FloatingButton } from "../components";
import style from "./Feed.module.css";

/**
 * Componente de carga del "feed" de usuarios.
 *
 * @component
 * @returns {React.Element} Componente Feed.
 */
const Feed = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);
  const profile = useSelector(selectUserProfile);
  const students = useSelector(selectStudents);
  const professionals = useSelector(selectProfessionals);
  const darkMode = useSelector(selectDarkMode);
  const [page, setPage] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const MySwal = withReactContent(Swal);

  // Mensaje de aviso para completar el perfil
  useEffect(() => {
    profile?.kind === "new" &&
      MySwal.fire({
        icon: "info",
        position: "bottom-end",
        title: "Completa tu perfil",
        text: "Cuéntanos más sobre tus estudios y objetivos para poder mejorar nuestras recomendaciones",
        confirmButtonText: "Completa este formulario en 1 minuto",
        confirmButtonColor: "#3085d6",
        showCancelButton: true,
        cancelButtonText: "Saltar",
        background: darkMode ? "#383636" : "#FFF",
        color: darkMode ? "#FFF" : "#545454",
      }).then((result) => {
        if (result.isDismissed || result.isDenied) {
          dispatch(
            updateUserProfile({ id: profile.id, kind: "incomplete" })
          ).then(() => dispatch(getUserInfo()));
        } else if (result.isConfirmed) {
          dispatch(updateUserProfile({ id: profile.id, kind: "ongoing" })).then(
            () => setIsEditing(true)
          );
        }
      });
  }, []);

  // Realiza una solicitud para obtener más usuarios y actualizar la lista.
  const fetchMoreUsers = () => {
    if (profile.id) {
      dispatch(getStudents({ id: profile.id, page }));
      dispatch(getProfessionals({ id: profile.id, page }));
    }
  };

  // Maneja el evento de desplazamiento de la ventana.
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setPage(page + 1);
    }
  };

  // Carga los datos del usuario si no están ya en el estado global.
  // useEffect(() => {
  //   if (!profile || Object.keys(profile).length === 0) {
  //     dispatch(getUserInfo());
  //   }
  // }, []);

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

  const handleCancelButton = () => {
    setIsEditing(false);
  };

  return (
    <section className={style.BGContainer}>
      {isEditing && (
        <div className={style.EditPhoto}>
          <ProfileUpdate handleCancelButton={handleCancelButton} />
        </div>
      )}

      <div className={style.Container}>
        <header>
          <img src={logoBlancoBig} />
        </header>
        <div className={style.FeedContainer}>
          <div className={style.Feed}>
            <AnimateGroup play>
              {users &&
                users.length > 0 &&
                users.map((user, userIndex) => (
                  <Animate
                    key={userIndex}
                    play
                    start={{ transform: "translate(0, -3px)", opacity: "0" }}
                    end={{ transform: "translate(0, 0)", opacity: "1" }}
                    duration={0.2}
                    sequenceIndex={userIndex}
                  >
                    <div key={userIndex}>
                      {/* Tarjeta de usuario */}
                      <FeedCard user={user} />

                      {/* Línea divisora si no es el último usuario */}
                      {userIndex < users.length - 1 && <hr />}
                    </div>
                  </Animate>
                ))}
            </AnimateGroup>
          </div>
        </div>
      </div>
      <FloatingButton />
    </section>
  );
};

export default Feed;

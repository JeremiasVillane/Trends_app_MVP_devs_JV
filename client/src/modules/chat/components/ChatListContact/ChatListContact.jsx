import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  selectListChats,
  selectNewChat,
  selectSelectedUser,
  setListMessages,
  setSelectedUser,
} from "../../../../redux/chatSlice";
import { selectAllUsers } from "../../../../redux/UsersSlice";
import styles from "./ChatListContact.module.css";
const { VITE_URL } = import.meta.env;

export const ChatListContact = ({
  id,
  isGroup,
  name,
  image,
  last_message,
  last_message_date,
  no_read_counter,
  bio,
  show_last_message = false,
}) => {
  const dispatch = useDispatch();

  const selectedUser = useSelector(selectSelectedUser);
  const allUsers = useSelector(selectAllUsers);
  const listChats = useSelector(selectListChats);
  const newChat = useSelector(selectNewChat);

  const bioShortener = (string) => {
    return string.slice(0, 40) + "...";
  };

  const clickHandler = () => {
    dispatch(
      setSelectedUser({
        id,
        isGroup,
        allUsers,
      })
    );
    axios
      .get(`${VITE_URL}/chatroom/chat/${id}/messages`, {
        withCredentials: "include",
      })
      .then(({ data }) => {
        dispatch(setListMessages(data));
      })
      .catch((error) => {
        console.log("ERROR: ", error);
      });
  };

  const formatDate = (date) => {
    const diasSemana = [
      "domingo",
      "lunes",
      "martes",
      "miércoles",
      "jueves",
      "viernes",
      "sábado",
    ];
    const hoy = new Date();
    const nombreDiaSemana = diasSemana[date.getDay()];
    const dia = date.getDate();
    const mes = date.getMonth() + 1;
    const anio = date.getFullYear();
    const hora = date.getHours();
    let minutos = date.getMinutes();
    minutos = minutos < 10 ? `0${minutos}` : minutos;

    if (esMismoDia(date, hoy)) {
      return `hoy ${hora}:${minutos}`;
    } else if (esMismoDia(date, new Date(hoy.getTime() - 86400000))) {
      return `ayer ${hora}:${minutos}`;
    } else if (esMismaSemana(date, hoy)) {
      return `${nombreDiaSemana} ${hora}:${minutos}`;
    } else {
      return `${dia}/${mes}/${anio} ${hora}:${minutos}`;
    }
  };

  const esMismoDia = (date1, date2) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const esMismaSemana = (date1, date2) => {
    const diff = Math.abs(date1 - date2);
    const unaSemanaEnMilisegundos = 7 * 24 * 60 * 60 * 1000;
    return diff < unaSemanaEnMilisegundos;
  };

  return (
    <div
      className={
        selectedUser?.id === id
          ? styles.mainContainerActive
          : styles.mainContainer
      }
      onClick={clickHandler}
    >
      <img src={image} className={styles.image} />
      <div className={styles.textDiv}>
        <div className={styles.header}>
          <p className={styles.name}>{name}</p>
          <p className={styles.time}>
            {last_message && formatDate(new Date(last_message_date))}
          </p>
        </div>
        <div className={styles.body}>
          {show_last_message ? (
            <p className={styles.description}>{last_message}</p>
          ) : (
            <p className={styles.description}>{bio && bioShortener(bio)}</p>
          )}
          {no_read_counter > 0 && (
            <p className={styles.unread}>{no_read_counter}</p>
          )}
        </div>
      </div>
    </div>
  );
};

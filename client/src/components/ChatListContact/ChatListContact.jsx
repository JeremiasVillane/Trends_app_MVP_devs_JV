import {
  getMessagesByChat, selectListChats, selectNewChat, selectSelectedUser, setListMessages, setNewChat, setSelectedUser
} from "../../Redux/chatSlice";
import style from "./ChatListContact.module.css"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { selectAllUsers } from "../../Redux/UsersSlice";
const { VITE_URL } = import.meta.env;

const ChatListContact = ({id, isGroup, name, image, last_message, last_message_date, no_read_counter, bio, show_last_message=false}) => {
  const dispatch = useDispatch();

  const selectedUser = useSelector(selectSelectedUser);
  const allUsers = useSelector(selectAllUsers);
  const listChats = useSelector(selectListChats)
  const newChat = useSelector(selectNewChat);

  const bioShortener = (string) =>{
    return string.slice(0, 40)+"...";
  }

  const clickHandler = () =>{
    dispatch(setSelectedUser({
      id,
      isGroup,
      allUsers,
    }))
    if(typeof id === "number"){
      try {
        dispatch(getMessagesByChat(id)).then(
          response => {
            dispatch(setListMessages(response.payload))
          }
        )
      } catch (error) {
        console.log(error)
      }
    } else {
      const findUser = (listChats?.length > 0 && typeof listChats !== "string") && listChats?.find(chat => chat.name === name);
      if(findUser){
        try {
          dispatch(getMessagesByChat(findUser.id)).then(
            response => {
              dispatch(setListMessages(response.payload))
              dispatch(setNewChat(!newChat))
            }
          )
        } catch (error) {
          console.log(error)
        }
      }
      dispatch(setListMessages([]))
    }
  }

  const formatDate = (date) => {
    const diasSemana = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
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
    <div className={selectedUser?.id === id ? style.mainContainerActive : style.mainContainer} onClick={clickHandler}>
      <img src={image} className={style.image}/>
      <div className={style.textDiv}>
        <div className={style.header}>
          <p className={style.name}>{name}</p>
          <p className={style.time}>{last_message && formatDate(new Date(last_message_date))}</p>
        </div>
        <div className={style.body}>
          {show_last_message ? (
            <p className={style.description}>{last_message}</p>
          ) : (
            <p className={style.description}>{bio && bioShortener(bio)}</p>
          )}
          {(no_read_counter > 0) &&
            <p className={style.unread}>{no_read_counter}</p>
          }
        </div>
      </div>
    </div>
  )
}

export default ChatListContact;
import { useDispatch, useSelector } from "react-redux";
import style from "./ChatMessage.module.css"
import {BsTrash} from "react-icons/bs"
import { useEffect, useState } from "react";
import { deleteMessage, getMessages, getMessagesByChat, selectListChats, selectListMessages, selectSelectedUser, setListMessages } from "../../Redux/chatSlice";
import { selectUserProfile } from "../../Redux/UsersSlice";

const ChatMessage = ({socket, userId, username, profile_image, messageId, createdAt, content, status, isGroup}) => {
    const dispatch = useDispatch();

    const {id} = useSelector(selectUserProfile);
    const user = useSelector(selectUserProfile);
    const conversation = useSelector(selectSelectedUser);
    const listChats = useSelector(selectListChats);
    const listMessages = useSelector(selectListMessages);
    const [hovered, setHovered] = useState(false);
    const [flag, setFlag] = useState(false);

    const handleDelete = () =>{
      setFlag(true);
      if(typeof conversation.id === "number"){
        console.log("ID-CHAT: ", conversation.id)
        dispatch(deleteMessage({message_id: messageId, isGroup: isGroup, conversation_id: conversation.id}))
          .then( response => {
              const chat_id = conversation.id
              dispatch(getMessages(chat_id)).then( response => {
                console.log("id", conversation.id, "payload:",response.payload, user.username, conversation.username)
                socket?.emit("private-message", {
                  flag:"desde mensaje eliminado 1",
                  data: response.payload,
                  userNameEmisor: user.username,
                  userNameReceptor: conversation.username
                })
              })
          }).catch(error => console.log(error));
      } else {
        console.log("USERNAME: ", listMessages.chat_id)
        const findUser = listChats?.find(chat => chat.id === listMessages.chat_id);
        console.log("FINDUSER: ", findUser)
        if(findUser){
          dispatch(deleteMessage({message_id: messageId, isGroup: isGroup, conversation_id: findUser.id}))
            .then(response => {
                const chat_id = findUser.id
                dispatch(getMessages(chat_id)).then( response => {
                  console.log("id", findUser.id, "payload:",response.payload, user.username, conversation.username)
                  socket?.emit("private-message", {
                    flag:"desde mensaje eliminado 1 con usuario",
                    data: response.payload,
                    userNameEmisor: user.username,
                    userNameReceptor: conversation.username
                  })
                })
            }).catch(error => console.log(error))
        }
      }
    }

    useEffect(() => {
      if(flag){
        console.log("FLAG: ", flag)
        if(typeof conversation.id === "number"){
          dispatch(getMessages(conversation.id)).then(response =>{
            console.log("EFECT: ", response.payload)
            socket?.emit("private-message", {
              flag:"desde mensaje eliminado 2",
              data: response.payload,
              userNameEmisor: user.username,
              userNameReceptor: conversation.username
            })
          }).catch(error => console.log(error));
          setFlag(false)
        } else {
          const findUser = listChats?.find(chat => chat.id === listMessages.chat_id);
          if(findUser){
            const chat_id = findUser.id
            dispatch(getMessages(chat_id)).then( response => {
              socket?.emit("private-message", {
                flag:"desde mensaje eliminado 1 con usuario",
                data: response.payload,
                userNameEmisor: user.username,
                userNameReceptor: conversation.username
              })
            })
          }
          setFlag(false)
        }
      }
    }, [flag])

    return (
      <div className={userId === id ? style.myContainer : style.elseContainer} onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}>
        {(isGroup && userId!==id) && (
            <div>
                <img src={profile_image} className={style.image}/>
            </div>
        )}
        <div className={userId === id ? style.myMessageContainer : style.messageContainer}>
            {(isGroup && userId!==id) && (
                <p className={style.username}>{username}</p>
            )}
            <p className={style.messageContent}>
                {content}
            </p>
            <div className={style.footer}>
                <p className={style.time}>
                    {new Date(createdAt).toLocaleString()}
                </p>
                <p className={style.status}>
                    {status}
                </p>
            </div>
        </div>
        <div className={(userId === id && hovered) ? style.deleteButton : style.hidden} onClick={handleDelete}>
            <BsTrash/>
        </div>
      </div> 
    )
  }
  
  export default ChatMessage;
import style from "./ChatMessages.module.css"
import {BiDotsVerticalRounded} from "react-icons/bi"
import {VscSmiley} from "react-icons/vsc"
import {AiOutlinePaperClip} from "react-icons/ai"
import {TbSend} from "react-icons/tb"
import {FaWindowMinimize} from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import {selectListMessages, selectSelectedUser, setIsMinimized, setListMessages} from "../../Redux/chatSlice"
import { useEffect, useState } from "react"
import { ChatMessageContainer } from ".."
import axios from "axios"
const { VITE_URL } = import.meta.env;

const ChatMessages = ({socket}) => {
  const [message, setMessage] = useState("");
  const listMessages = useSelector(selectListMessages)
  const user = useSelector(state => state.users.user);
  const selectedUser = useSelector(selectSelectedUser)
  const dispatch = useDispatch();

  const handleChange = (event) =>{
    event.preventDefault()
    setMessage(event.target.value)
  }

  const handleKeyDown = (event) => {
    if(event.key === 'Enter'){
      event.preventDefault();
      message.trim() !== '' && sendMessage(event);
    }
  }

  function getUniqueQueryString(){
    return `?_=${Date.now()}`
  }

  const sendMessage = (event) => {
    event.preventDefault();
    if(message !== '' ){
      const sender_id = user.id;
      console.log("sender_id: ", sender_id);
      const receiver_id=listMessages.UserReceived.id === user.id
        ? listMessages.UserSent.id : listMessages.UserReceived.id;
        console.log("receiver_id: ", receiver_id);
      const userNameEmisor = listMessages.UserSent.id !== user.id
        ? listMessages.UserReceived.username : listMessages.UserSent.username;
        console.log("userNameEmisor: ", userNameEmisor)
      const userNameReceptor = listMessages.UserReceived.id !== user.id
        ? listMessages.UserReceived.username : listMessages.UserSent.username;
        console.log("userNameReceptor: ", userNameReceptor)
      const content = message;
      console.log("content: ", content)

      axios.post(`${VITE_URL}/api/v1/chatroom/message`,
        {content, receiver_id, sender_id },
        {withCredentials: "include"})
          .then(({data}) => {
            console.log("NEW MESSAGE: ",  data)

            // socket?.emit("private-message", {
            //   data,
            //   userNameEmisor,
            //   userNameReceptor
            // })

            axios.get(`${VITE_URL}/api/v1/chatroom/chat/${selectedUser[0].id}/messages`+
            getUniqueQueryString(),
            {withCredentials:"include"})
              .then(({data}) =>{
                console.log("data-sockek-send", data)
                socket?.emit("private-message", {
                  listMessages,
                  userNameEmisor,
                  userNameReceptor
                })
              }).catch(error => {
                console.log("ERROR-get: ", error);
              })
          }).catch(error => console.log("ERROR-post: ", error))

      setMessage("");
      //setPreview(false);
    }

  }

  useEffect(() => {
    console.log("sender_id: ",user)
    console.log("receiver_id: ",selectedUser)
  }, [user, selectedUser])

  return (
    <div className={style.mainContainer}>
      <div className={style.chatHeader}>
        <div className={style.infoDiv}>
            <img src={selectedUser?.image} className={style.profileImage}/>
            <div>
                <p className={style.name}>{selectedUser?.username}</p>
                <p className={style.status}> online/offline</p>
            </div>
        </div>
        <div class="flex gap-2">
            <button className={style.headerIcon}><BiDotsVerticalRounded/></button>
        </div>
      </div>

      <ChatMessageContainer className={style.chatContainer} socket={socket} />

      <div className={style.messageBar}>
        <div className={style.messageBarIconDiv}>
            <VscSmiley className={style.messageBarIcon}/>
            <AiOutlinePaperClip className={style.messageBarIcon}/>
        </div>
        
        <form onSubmit={sendMessage} className={style.messageBarInputDiv}>
            <input className={style.messageBarInput} type="text" value={message} onChange={handleChange} onKeyDown={handleKeyDown}/>
            <button className={style.messageBarInputButton} type="submit">
              <TbSend  onClick={sendMessage}/>
            </button>
        </form>
      </div>
    </div>
  )
}

export default ChatMessages;
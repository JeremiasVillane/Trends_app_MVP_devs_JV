import style from "./ChatMessages.module.css"
import {BiDotsVerticalRounded} from "react-icons/bi"
import {VscSmiley} from "react-icons/vsc"
import {AiOutlinePaperClip} from "react-icons/ai"
import {TbSend} from "react-icons/tb"
import { useDispatch, useSelector } from "react-redux"
import {getMessages, postMessage, selectListMessages, selectNewChat, selectListGroups, selectSelectedUser, setIsMinimized, setListMessages, setNewChat, getGroupList, createGroupMember} from "../../Redux/chatSlice"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ChatMessageContainer } from ".."
import { selectUserProfile } from "../../Redux/UsersSlice"
const { VITE_URL } = import.meta.env

const ChatMessages = ({socket}) => {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const listMessages = useSelector(selectListMessages)
  const user = useSelector(state => state.users.user);
  const selectedUser = useSelector(selectSelectedUser);
  const listGroups = useSelector(selectListGroups);
  const [menu, setMenu] = useState(false)
  const [menuGroups, setMenuGroups] = useState(false)
  const newChat = useSelector(selectNewChat)
  const dispatch = useDispatch();

  const handleChange = (event) =>{
    event.preventDefault()
    setMessage(event.target.value)
  }

  const handleGroupClick = (group_id) =>{
    dispatch(createGroupMember({user_id: user.id, group_id: group_id}));
  }

  const handleMenu = () =>{
    setMenu(!menu);
  }

  const handleKeyDown = (event) => {
    if(event.key === 'Enter'){
      event.preventDefault();
      message.trim() !== '' && sendMessage(event);
    }
  }

  const sendMessage = async (event) => {
    event.preventDefault();
    if(message !== '' ){

      const sender_id = user.id;
        //console.log("sender_id: ", sender_id);

      const receiver_id = typeof selectedUser.id !== "number"
      ? selectedUser.id : listMessages?.UserReceived?.id === user?.id
      ? listMessages?.UserSent?.id : listMessages?.UserSent?.id === user.id && listMessages?.UserReceived?.id;
        //console.log("receiver_id: ", receiver_id);

      const userNameEmisor = user.username
        //console.log("userNameEmisor: ", userNameEmisor)

      const userNameReceptor = selectedUser
        ? selectedUser.username : listMessages?.UserReceived?.id === user?.id
        ? listMessages?.UserSent?.username : listMessages?.UserSent?.id === user.id && listMessages?.UserReceived?.username;
        //console.log("userNameReceptor: ", userNameReceptor)

      const content = message;
        //console.log("content: ", content)

      try {
        const messageData ={
          content:message,
          receiver_id,
          sender_id
        }
        const result = await dispatch(postMessage(messageData))
        console.log(result.payload)
        dispatch(getMessages(result.payload.chat_id)).then(
          response => {
            console.log(response.payload)
            socket?.emit("private-message", {
              flag:"desde creacion de mensajes",
              data: response.payload,
              userNameEmisor,
              userNameReceptor
            })
          }
        )
      } catch (error) {
        console.log(error)
      }
      setMessage("");
      dispatch(setNewChat(false))
    }
  }

  useEffect(()=>{
    dispatch(getGroupList());
  }, [])

  return (
    <div className={style.mainContainer}>
      <div className={style.chatHeader}>
        <div className={style.infoDiv}>
            <img src={selectedUser.image ? selectedUser.image : selectedUser.profile_image} className={style.profileImage}/>
            <div>
                <p className={style.name}>{selectedUser?.username}</p>
                <p className={style.status}> online/offline</p>
            </div>
        </div>
        <div class="flex gap-2">
            <button className={menu? style.headerIconActive : style.headerIcon} onClick={handleMenu}><BiDotsVerticalRounded/></button>
        </div>
        <div className={menu ? style.menu : style.hidden}>
          <ul>
            <li className={style.menuItem}>Ir a perfil</li>
            <li className={style.menuItem} onMouseEnter={()=>setMenuGroups(true)} onMouseLeave={()=>setMenuGroups(false)}>Invitar a grupo</li>
            <li className={style.menuItem}>Eliminar conversacion</li>
          </ul>
        </div>
        <div className={menuGroups ? style.menuGroups : style.hidden}  onMouseEnter={()=>setMenuGroups(true)} onMouseLeave={()=>setMenuGroups(false)}>
          <ul>
            {
              listGroups?.map(group => {
                return(
                  <li className={style.menuGroupsItem} onClick={handleGroupClick(group.id)}>
                    {group.groupName}
                  </li>
                )
              })
            }
          </ul>
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
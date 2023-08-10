import { useDispatch, useSelector } from "react-redux";
import style from "./ChatMessage.module.css"
import { selectUserProfile } from "../../Redux/UsersSlice";
import {BsTrash} from "react-icons/bs"
import { useState } from "react";
import { deleteMessage, selectSelectedUser } from "../../Redux/chatSlice";

const ChatMessage = ({userId, username, profile_image, messageId, createdAt, content, status, isGroup}) => {
    const dispatch = useDispatch();

    const {id} = useSelector(selectUserProfile);
    const conversation = useSelector(selectSelectedUser);
    const [hovered, setHovered] = useState(false);

    const handleDelete = () =>{
        dispatch(deleteMessage({message_id: messageId, isGroup: isGroup, conversation_id: conversation.id}))
    }
  
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
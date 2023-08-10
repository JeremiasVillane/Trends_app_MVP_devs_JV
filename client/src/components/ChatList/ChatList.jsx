import style from "./ChatList.module.css"
import {ChatListContactContainer, ChatNewChat} from "../index"
import {BsThreeDotsVertical, BsFillPersonPlusFill} from "react-icons/bs";
import { BiSearchAlt2 } from "react-icons/bi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserProfile } from "../../Redux/UsersSlice";
import { setListChats } from "../../Redux/chatSlice";
import { selectNewChat, setNewChat } from "../../Redux/chatSlice";


const ChatList = () => {

  //const [newChat, setNewChat] = useState(false);
  const [searchTerm, setSearchTerm] = useState("")
  
  const user = useSelector(selectUserProfile)
  const newChat = useSelector(selectNewChat)
  const dispatch = useDispatch();
  
  useEffect(()=> {
    if(Object.keys(user).length > 0){
      dispatch(setListChats({ user_id: user?.id, query_name: "" }))
    }
  }, [user])

  const handleNewChat = () =>{
    //setNewChat(!newChat);
    dispatch(setNewChat(!newChat))
  }

  const handleChange = (event) =>{
    setSearchTerm(event.target.value)
    dispatch(setListChats({user_id: user.id, query_name: event.target.value}));
  }

  return (
    <div className={style.mainContainer}>
      <div className={style.chatListHeader}>
        <div className={style.headerIzqDiv}>
          <div>
            <img src={user.profile_image} className={style.headerImage}/>
          </div>
          <span className={style.headerUsername}>{user.username}</span>
        </div>
        <div className={newChat ? style.headerContainerIconActive : style.headerContainerIcon} onClick={handleNewChat}>
          <BsFillPersonPlusFill/>
        </div>
      </div>

      <div className={style.searchBar}>
        <div className={style.searchBarInputDiv}>
          <div>
            <BiSearchAlt2 className={style.searchIcon}/>
          </div>
          <div className="w-full">
            <input type="text" className={style.searchBarInput} value={searchTerm} onChange={handleChange}/>
          </div>
        </div>
      </div>

      {
        newChat ? (
          <ChatNewChat/>
        ) : (
          <ChatListContactContainer/>
        )
      }

    </div>
  )
}

export default ChatList;
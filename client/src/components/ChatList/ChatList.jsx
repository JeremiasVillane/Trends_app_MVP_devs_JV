import style from "./ChatList.module.css"
import {ChatListContactContainer, ChatNewChat} from "../index"
import {BsThreeDotsVertical, BsFillPersonPlusFill} from "react-icons/bs";
import { BiSearchAlt2 } from "react-icons/bi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserProfile } from "../../Redux/UsersSlice";
import { setListChats } from "../../Redux/chatSlice";


const ChatList = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserProfile)

  useEffect(()=> {
    dispatch(setListChats({ user_id: user?.id, query_name: "" }))
  }, [user])

  const [newChat, setNewChat] = useState(false);
  const [searchTerm, setSearchTerm] = useState("")

  const handleNewChat = () =>{
    setNewChat(!newChat);
  }

  const handleChange = (event) =>{
    setSearchTerm(event.target.value)
    dispatch(setListChats({user_id: user.id, query_name: event.target.value}));
  }

  
  return (
    <div className={style.mainContainer}>
      <div className={style.chatListHeader}>
        <div>
          <img src={user.profile_image} className={style.headerImage}/>
        </div>
        <span className={style.headerUsername}>{user.username}</span>
        <div className={style.headerContainerIcons}>
          <div className={style.headerIcon} onClick={handleNewChat}>
            <BsFillPersonPlusFill/>
          </div>
          <div className={style.headerIcon}>
            <BsThreeDotsVertical/>
          </div>
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
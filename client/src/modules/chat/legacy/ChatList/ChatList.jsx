import { useEffect, useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  selectNewChat,
  setListChats,
  setNewChat,
} from "../../../../redux/chatSlice";
import { selectUserProfile } from "../../../../redux/UsersSlice";
import { ChatListContactContainer, ChatNewChat } from "../index";
import styles from "./ChatList.module.css";

export const ChatList = () => {
  //const [newChat, setNewChat] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const user = useSelector(selectUserProfile);
  const newChat = useSelector(selectNewChat);
  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      dispatch(setListChats({ user_id: user?.id, query_name: "" }));
    }
  }, [user]);

  const handleNewChat = () => {
    //setNewChat(!newChat);
    dispatch(setNewChat(!newChat));
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    dispatch(
      setListChats({ user_id: user.id, query_name: event.target.value })
    );
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.chatListHeader}>
        <div className={styles.headerIzqDiv}>
          <div>
            <img src={user.profile_image} className={styles.headerImage} />
          </div>
          <span className={styles.headerUsername}>{user.username}</span>
        </div>
        <div
          className={
            newChat
              ? styles.headerContainerIconActive
              : styles.headerContainerIcon
          }
          onClick={handleNewChat}
        >
          <BsFillPersonPlusFill />
        </div>
      </div>

      <div className={styles.searchBar}>
        <div className={styles.searchBarInputDiv}>
          <div>
            <BiSearchAlt2 className={styles.searchIcon} />
          </div>
          <div className="w-full">
            <input
              type="text"
              className={styles.searchBarInput}
              value={searchTerm}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      {newChat ? <ChatNewChat /> : <ChatListContactContainer />}
    </div>
  );
};

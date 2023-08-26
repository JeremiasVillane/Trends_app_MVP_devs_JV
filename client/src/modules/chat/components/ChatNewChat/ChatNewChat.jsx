import { useState } from "react";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../../../../redux/UsersSlice";
import { ChatListContact, ChatNewGroup } from "../index";
import styles from "./ChatNewChat.module.css";

export const ChatNewChat = () => {
  const users = useSelector(selectAllUsers);
  const [tab, setTab] = useState("chat");

  return (
    <div className={`${styles.mainContainer} h-full bg-white`}>
      <div className={styles.tabContainer}>
        <div
          className={tab === "chat" ? styles.tabActive : styles.tabInactive}
          onClick={() => setTab("chat")}
        >
          <p className={styles.tabText}>Nuevo Chat</p>
        </div>
        <div
          className={tab === "group" ? styles.tabActive : styles.tabInactive}
          onClick={() => setTab("group")}
        >
          <p className={styles.tabText}>Nuevo Grupo</p>
        </div>
      </div>

      {tab === "chat" ? (
        users.data?.map((user, index) => {
          return (
            <ChatListContact
              key={index}
              id={user.id}
              name={user.name}
              bio={user.profile_bio}
              image={user.profile_image}
            />
          );
        })
      ) : (
        <ChatNewGroup />
      )}
    </div>
  );
};

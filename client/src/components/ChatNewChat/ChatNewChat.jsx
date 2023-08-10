import { useSelector } from "react-redux";
import { useState } from "react";
import style from "./ChatNewChat.module.css"
import{ ChatListContact, ChatNewGroup } from "../index"
import { selectAllUsers } from "../../Redux/UsersSlice";

const ChatNewChat = () =>{

    const users = useSelector(selectAllUsers);
    const [tab, setTab] = useState("chat")

    return(
        <div className={`${style.mainContainer } h-full bg-white`}>
            <div className={style.tabContainer}>
                <div className={(tab==="chat") ? style.tabActive : style.tabInactive} onClick={()=>setTab("chat")}>
                    <p className={style.tabText}>Nuevo Chat</p>
                </div>
                <div className={(tab==="group") ? style.tabActive : style.tabInactive} onClick={()=>setTab("group")}>
                    <p className={style.tabText}>Nuevo Grupo</p>
                </div>
            </div>

            {(tab==="chat") ? (
                users.data?.map((user, index) => {
                    return(
                        <ChatListContact
                            key={index}
                            id={user.id}
                            name={user.name}
                            bio={user.profile_bio}
                            image={user.profile_image}
                        />
                    )
                })
            ):(
                <ChatNewGroup/>
            )}
        </div>
    )
}

export default ChatNewChat;
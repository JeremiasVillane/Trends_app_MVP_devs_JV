import { useEffect, useState } from "react";
import { AiOutlinePaperClip } from "react-icons/ai";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { TbSend } from "react-icons/tb";
import { VscSmiley } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import {
  createGroupMember,
  getGroupList,
  getMessages,
  postMessage,
  selectListGroups,
  selectListMessages,
  selectSelectedUser,
  setNewChat,
} from "../../../../redux/chatSlice";
import { ChatMessageContainer } from "../index";
import styles from "./ChatMessages.module.css";
const { VITE_URL } = import.meta.env;

export const ChatMessages = ({ socket }) => {
  const [message, setMessage] = useState("");
  const listMessages = useSelector(selectListMessages);
  const user = useSelector((state) => state.users.user);
  const selectedUser = useSelector(selectSelectedUser);
  const listGroups = useSelector(selectListGroups);
  const [menu, setMenu] = useState(false);
  const [menuGroups, setMenuGroups] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    event.preventDefault();
    setMessage(event.target.value);
  };

  const handleGroupClick = (group_id) => {
    dispatch(createGroupMember({ user_id: user.id, group_id: group_id }));
  };

  const handleMenu = () => {
    setMenu(!menu);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      message.trim() !== "" && sendMessage(event);
    }
  };

  const sendMessage = async (event) => {
    event.preventDefault();
    if (message !== "") {
      const sender_id = user.id;
      //console.log("sender_id: ", sender_id);

      const receiver_id =
        typeof selectedUser.id !== "number"
          ? selectedUser.id
          : listMessages?.UserReceived?.id === user?.id
          ? listMessages?.UserSent?.id
          : listMessages?.UserSent?.id === user.id &&
            listMessages?.UserReceived?.id;
      //console.log("receiver_id: ", receiver_id);

      const userNameEmisor = user.username;
      //console.log("userNameEmisor: ", userNameEmisor)

      const userNameReceptor = selectedUser
        ? selectedUser.username
        : listMessages?.UserReceived?.id === user?.id
        ? listMessages?.UserSent?.username
        : listMessages?.UserSent?.id === user.id &&
          listMessages?.UserReceived?.username;
      //console.log("userNameReceptor: ", userNameReceptor)

      const content = message;
      //console.log("content: ", content)

      try {
        const messageData = {
          content: message,
          receiver_id,
          sender_id,
        };
        const result = await dispatch(postMessage(messageData));
        console.log(result.payload);
        dispatch(getMessages(result.payload.chat_id)).then((response) => {
          console.log(response.payload);
          socket?.emit("private-message", {
            flag: "desde creacion de mensajes",
            data: response.payload,
            userNameEmisor,
            userNameReceptor,
          });
        });
      } catch (error) {
        console.log(error);
      }
      axios
        .post(
          `${VITE_URL}/chatroom/message`,
          { content, receiver_id, sender_id },
          { withCredentials: "include" }
        )
        .then(({ data }) => {
          console.log("NEW MESSAGE: ", data);

          // socket?.emit("private-message", {
          //   data,
          //   userNameEmisor,
          //   userNameReceptor
          // })

          axios
            .get(
              `${VITE_URL}/chatroom/chat/${selectedUser[0].id}/messages` +
                getUniqueQueryString(),
              { withCredentials: "include" }
            )
            .then(({ data }) => {
              console.log("data-sockek-send", data);
              socket?.emit("private-message", {
                listMessages,
                userNameEmisor,
                userNameReceptor,
              });
            })
            .catch((error) => {
              console.log("ERROR-get: ", error);
            });
        })
        .catch((error) => console.log("ERROR-post: ", error));

      setMessage("");
      dispatch(setNewChat(false));
    }
  };

  useEffect(() => {
    dispatch(getGroupList());
  }, []);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.chatHeader}>
        <div className={styles.infoDiv}>
          <img
            src={
              selectedUser.image
                ? selectedUser.image
                : selectedUser.profile_image
            }
            className={styles.profileImage}
          />
          <div>
            <p className={styles.name}>{selectedUser?.username}</p>
            <p className={styles.status}> online/offline</p>
          </div>
        </div>
        <div class="flex gap-2">
          <button
            className={menu ? styles.headerIconActive : styles.headerIcon}
            onClick={handleMenu}
          >
            <BiDotsVerticalRounded />
          </button>
        </div>
        <div className={menu ? styles.menu : styles.hidden}>
          <ul>
            <li className={styles.menuItem}>Ir a perfil</li>
            <li
              className={styles.menuItem}
              onMouseEnter={() => setMenuGroups(true)}
              onMouseLeave={() => setMenuGroups(false)}
            >
              Invitar a grupo
            </li>
            <li className={styles.menuItem}>Eliminar conversacion</li>
          </ul>
        </div>
        <div
          className={menuGroups ? styles.menuGroups : styles.hidden}
          onMouseEnter={() => setMenuGroups(true)}
          onMouseLeave={() => setMenuGroups(false)}
        >
          <ul>
            {listGroups?.map((group) => {
              return (
                <li
                  className={styles.menuGroupsItem}
                  onClick={handleGroupClick(group.id)}
                >
                  {group.groupName}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <ChatMessageContainer className={styles.chatContainer} socket={socket} />

      <div className={styles.messageBar}>
        <div className={styles.messageBarIconDiv}>
          <VscSmiley className={styles.messageBarIcon} />
          <AiOutlinePaperClip className={styles.messageBarIcon} />
        </div>

        <form onSubmit={sendMessage} className={styles.messageBarInputDiv}>
          <input
            className={styles.messageBarInput}
            type="text"
            value={message}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <button className={styles.messageBarInputButton} type="submit">
            <TbSend onClick={sendMessage} />
          </button>
        </form>
      </div>
    </div>
  );
};

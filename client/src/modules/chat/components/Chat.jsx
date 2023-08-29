import React, { useEffect, useState } from "react";
import { TypingIndicatorProvider } from "./TypingIndicatorContext";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import styles from "./Chat.module.css";
import ChatSidebar from "./ChatSideBar";
import { useDispatch, useSelector } from "react-redux";
import { selectSelectedUser } from "../../../redux/chatSlice";
import {
  getMatchedUsers,
  getUserInfo,
  selectUserProfile,
} from "../../../redux/UsersSlice";
import axios from "axios";
import { io } from "socket.io-client";
const { VITE_URL_BASE, VITE_URL } = import.meta.env;

const Chat = ({ userId }) => {
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);
  const selectedUser = useSelector(selectSelectedUser);
  const user = useSelector(selectUserProfile);
  const [conversations, setConversations] = useState([]);

  const [activeConversation, setActiveConversation] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  //Conexión de Socket al servidor
  useEffect(() => {
    const newSocket = io(VITE_URL_BASE);
    newSocket.on("connect", () => {
      setSocket(newSocket);
    });
    return () => {
      socket && newSocket.disconnect();
    };
  }, []);

  // Envia username para agregar usuarios conectados al servidor
  useEffect(() => {
    socket?.emit("newUser", user.username);
  }, [socket, user]);

  useEffect(() => {
    dispatch(getUserInfo());
    dispatch(getMatchedUsers());
  }, []);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(
        `${VITE_URL}/chatroom/conversations/${user.id}`,
        {
          withCredentials: "include",
        }
      );
      setConversations(data);
    }
    fetchData();
  }, []);

  // const conversations = [
  //   {
  //     isGroup: false,
  //     id: 1,
  //     name: "Alice",
  //     username: "alice",
  //     image: "https://i.postimg.cc/J4QGQWmr/user-default.png",
  //     last_message:
  //       "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem fugiat veniam ad velit a?",
  //     last_message_date: "2023-08-26 10:39 PM",
  //     no_read_counter: 2,
  //     messages: [
  //       {
  //         userId: 1,
  //         username: "Alice",
  //         profile_image: "https://i.postimg.cc/J4QGQWmr/user-default.png",
  //         messageId: 1,
  //         createdAt: "2023-08-26 10:39 PM",
  //         content:
  //           "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem fugiat veniam ad velit a?",
  //         messageStatus: "sent",
  //         parentMessage: {
  //           id: 1,
  //           content: "Hi there!",
  //           author: "Bob",
  //           timestamp: "2023-08-27 11:30 AM",
  //         }
  //       },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     contactName: "Bob",
  //     lastMessage: "Corporis suscipit ab accusamus quae earum!",
  //     unreadCount: 0,
  //     messages: [
  //       {
  //         id: 1,
  //         content: "Corporis suscipit ab accusamus quae earum!",
  //         author: "Bob",
  //         timestamp: "2023-08-27 11:30 AM",
  //       },
  //     ],
  //   },
  // ];

  const activeConversationData = conversations.find(
    (conversation) => conversation.id === activeConversation
  );

  const onSendMessage = (message) => {
    console.log("Enviando mensaje:", message);
  };
  return (
    <TypingIndicatorProvider>
      <div className={styles.chat_container}>
        <ChatSidebar
          conversations={conversations}
          setActiveConversation={setActiveConversation}
          handleSearch={handleSearch}
        />
        <div className={styles.chat_content}>
          {activeConversationData ? (
            <>
              <ChatHeader
                chatTitle={activeConversationData.name}
                contactId={activeConversationData.userId}
                // participants={[activeConversationData.contactName]}
              />
              <MessageList messages={activeConversationData.messages} />
              <MessageInput userId={userId} onSendMessage={onSendMessage} />
            </>
          ) : (
            <div className={styles.empty_chat}>
              Elige un contacto para comenzar una conversación.
            </div>
          )}
        </div>
      </div>
    </TypingIndicatorProvider>
  );
};

export default Chat;

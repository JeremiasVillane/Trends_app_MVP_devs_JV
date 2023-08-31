import React, { useEffect, useState } from "react";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import styles from "./Chat.module.css";
import ChatSidebar from "./ChatSideBar";
import { useDispatch, useSelector } from "react-redux";
import {
  getMatchedUsers,
  getUserInfo,
  selectUserProfile,
} from "../../../redux/UsersSlice";
import { io } from "socket.io-client";
import {
  loadConversations,
  searchConversations,
  sendAndStoreMessage,
} from "../../../redux/chatSlice";
import CreateGroupModal from "./CreateGroupModal";
const { VITE_URL_BASE, VITE_URL } = import.meta.env;

const Chat = () => {
  const dispatch = useDispatch();

  const [socket, setSocket] = useState(null);
  const user = useSelector(selectUserProfile);

  const conversations = useSelector((state) => state.chat.conversations);
  const activeConversation = useSelector(
    (state) => state.chat.activeConversation
  );
  const activeConversationData = conversations?.find(
    (conversation) => conversation.id === activeConversation
  );

  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);

  // const [searchQuery, setSearchQuery] = useState("");
  const onSearch = (query) => {
    // setSearchQuery(query);
    dispatch(searchConversations(user.id, query));
  };

  useEffect(() => {
    dispatch(getUserInfo());
    dispatch(getMatchedUsers());
  }, []);

  // useEffect(() => {
  //   dispatch(loadConversations(user.id, searchQuery));
  // }, [searchQuery])

  // Conexión Socket
  useEffect(() => {
    const newSocket = io(VITE_URL_BASE);
    newSocket.on("connect", () => {
      setSocket(newSocket);
    });
    return () => {
      socket && newSocket.disconnect();
    };
  }, []);

  // Envía username para agregar usuarios conectados al servidor
  useEffect(() => {
    socket?.emit("newUser", user.username);
  }, [socket, user]);

  useEffect(() => {
    if (socket) {
      socket.on("message", (message) => {
        dispatch(loadConversations(user.id));
      });
    }
  }, [socket, activeConversationData, dispatch]);

  const onSendMessage = (message) => {
    if (socket && activeConversationData) {
      const messageData = {
        content: message,
      };
      socket.emit("sendMessage", messageData);

      dispatch(sendAndStoreMessage(activeConversationData.id, messageData));
      // .then(() => dispatch(loadConversations(user.id)));
    }
  };

  const onCreateGroup = () => {
    setShowCreateGroupModal(true);
  };

  return (
    <div className={styles.chat_container}>
      <ChatSidebar onSearch={onSearch} onCreateGroup={onCreateGroup} />
      <div className={styles.chat_content}>
        {activeConversationData ? (
          <>
            <ChatHeader
              chatTitle={activeConversationData.name}
              contactId={activeConversationData.userId}
              // participants={[activeConversationData.contactName]}
            />
            <MessageList messages={activeConversationData.messages} />
            <MessageInput userId={user.id} onSendMessage={onSendMessage} />
          </>
        ) : (
          <div className={styles.empty_chat}>
            Elige un contacto para comenzar una conversación.
          </div>
        )}
      </div>
      {showCreateGroupModal && (
        <CreateGroupModal setShowCreateGroupModal={setShowCreateGroupModal} />
      )}
    </div>
  );
};

export default Chat;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import {
  loadConversations,
  searchConversations,
  sendAndStoreMessage,
} from "../../../redux/chatSlice";
import {
  getMatchedUsers,
  getUserInfo,
  selectUserProfile,
} from "../../../redux/UsersSlice";
import styles from "./Chat.module.css";
import ChatHeader from "./ChatHeader";
import ChatSidebar from "./ChatSideBar";
import GroupChatModal from "./GroupChatModal";
import InfoSideBar from "./InfoSideBar";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";
import PrivateChatModal from "./PrivateChatModal";
const { VITE_URL_BASE } = import.meta.env;

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

  const [showGroupChatModal, setShowGroupChatModal] = useState(false);
  const [showPrivateChatModal, setShowPrivateChatModal] = useState(false);

  const [showInfo, setShowInfo] = useState(false);

  // const [searchQuery, setSearchQuery] = useState("");
  const onSearch = (query) => {
    // setSearchQuery(query);
    dispatch(searchConversations(user.id, query));
  };

  useEffect(() => {
    dispatch(getUserInfo());
    dispatch(getMatchedUsers());
    dispatch(loadConversations(user.id));
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
      socket.on("message", () => {
        dispatch(loadConversations(user.id));
      });
      socket.on("messageUpdated", () => {
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
    }
  };

  const onCreatePrivateChat = () => {
    setShowPrivateChatModal(true);
  };

  const onCreateGroup = () => {
    setShowGroupChatModal(true);
  };

  return (
    <div className={styles.chat_container}>
      <ChatSidebar
        onSearch={onSearch}
        onCreatePrivateChat={onCreatePrivateChat}
        onCreateGroup={onCreateGroup}
      />
      <div className={styles.chat_content}>
        {activeConversationData ? (
          <>
            <ChatHeader
              isGroup={activeConversationData.isGroup}
              chatImage={activeConversationData.image}
              chatTitle={activeConversationData.name}
              contactId={activeConversationData.userId}
              participants={activeConversationData.members}
              setShowInfo={setShowInfo}
            />
            <MessageList
              socket={socket}
              messages={activeConversationData.messages}
            />
            <MessageInput userId={user.id} onSendMessage={onSendMessage} />
          </>
        ) : (
          <div className={styles.empty_chat}>
            Elige un contacto para comenzar una conversación.
          </div>
        )}
      </div>
      {showInfo && (
        <InfoSideBar
          infoType={
            activeConversationData.isGroup ? "infoGroup" : "infoProfile"
          }
          image={activeConversationData.image}
          name={activeConversationData.name}
          contactId={activeConversationData.id}
          participants={activeConversationData.members}
        />
      )}
      {showGroupChatModal && (
        <GroupChatModal setShowGroupChatModal={setShowGroupChatModal} />
      )}
      {showPrivateChatModal && (
        <PrivateChatModal setShowPrivateChatModal={setShowPrivateChatModal} />
      )}
    </div>
  );
};

export default Chat;

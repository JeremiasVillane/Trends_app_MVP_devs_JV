import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import useMediaQuery from "../../../hooks/useMediaQuery";
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
  const [showMessagesInSmallScreens, setShowMessagesInSmallScreens] =
    useState(false);
  const [
    showConversationListInSmallScreens,
    setShowConversationListInSmallScreens,
  ] = useState(true);
  const isSmallerThan590 = useMediaQuery("(max-width: 590px)");

  useEffect(() => {
    dispatch(getUserInfo());
    dispatch(getMatchedUsers());
    dispatch(loadConversations(user.id));
  }, []);

  useEffect(() => {
    const newSocket = io(VITE_URL_BASE);
    newSocket.on("connect", () => {
      setSocket(newSocket);
    });
    return () => {
      socket && newSocket.disconnect();
    };
  }, []);

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
  }, [socket, activeConversationData]);

  const onSendMessage = (message) => {
    if (socket && activeConversationData) {
      socket.emit("sendMessage");

      dispatch(
        sendAndStoreMessage(user.id, activeConversationData.id, message)
      );
    }
  };

  const onSearch = (query) => {
    dispatch(searchConversations(user.id, query));
  };

  const onCreatePrivateChat = () => {
    setShowPrivateChatModal(true);
    setShowInfo(false);
  };

  const onCreateGroup = () => {
    setShowGroupChatModal(true);
    setShowInfo(false);
  };

  return (
    <div className={styles.chat_background}>
      <div className={styles.chat_container}>
        <div
          style={{
            display:
              showMessagesInSmallScreens || !showConversationListInSmallScreens
                ? "none"
                : "flex",
          }}
        >
          <ChatSidebar
            onSearch={onSearch}
            onCreatePrivateChat={onCreatePrivateChat}
            onCreateGroup={onCreateGroup}
            setShowMessagesInSmallScreens={setShowMessagesInSmallScreens}
            isSmallerThan590={isSmallerThan590}
          />
        </div>
        <div
          className={styles.chat_content}
          style={{
            display:
              isSmallerThan590 && !showMessagesInSmallScreens ? "none" : "flex",
          }}
        >
          {activeConversationData ? (
            <>
              <ChatHeader
                isGroup={activeConversationData.isGroup}
                chatImage={activeConversationData.image}
                chatTitle={activeConversationData.name}
                contactId={activeConversationData.userId}
                participants={activeConversationData.members}
                setShowInfo={setShowInfo}
                setShowMessagesInSmallScreens={setShowMessagesInSmallScreens}
                setShowConversationListInSmallScreens={
                  setShowConversationListInSmallScreens
                }
                isSmallerThan590={isSmallerThan590}
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
            username={activeConversationData?.username}
            contactId={activeConversationData?.userId}
            conversationId={activeConversation}
            ownerId={activeConversationData?.ownerId}
            participants={activeConversationData?.members}
            setShowInfo={setShowInfo}
            isSmallerThan590={isSmallerThan590}
            setShowMessagesInSmallScreens={setShowMessagesInSmallScreens}
            setShowConversationListInSmallScreens={
              setShowConversationListInSmallScreens
            }
          />
        )}
        {showGroupChatModal && (
          <GroupChatModal setShowGroupChatModal={setShowGroupChatModal} />
        )}
        {showPrivateChatModal && (
          <PrivateChatModal setShowPrivateChatModal={setShowPrivateChatModal} />
        )}
      </div>
    </div>
  );
};

export default Chat;

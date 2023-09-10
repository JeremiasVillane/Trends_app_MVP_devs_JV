import { useDispatch } from "react-redux";
import { setActiveConversation } from "../../../../redux/chatSlice";
import { Avatar } from "../main";
import styles from "./Conversation.module.css";

export const Conversation = ({
  isGroup,
  conversationId,
  contactName,
  contactAvatar,
  contactStatus,
  lastMessage,
  setShowMessagesInSmallScreens,
  isSmallerThan590,
  unreadCount,
}) => {
  const dispatch = useDispatch();

  const loadMessages = () => {
    dispatch(setActiveConversation(conversationId));
    isSmallerThan590 && setShowMessagesInSmallScreens(true);
  };

  return (
    <div className={styles.conversation_item} onClick={loadMessages}>
      <div className={styles.avatar_container}>
        <Avatar
          imageUrl={contactAvatar}
          altText={contactName}
          size={"50px"}
          status={contactStatus}
        />
      </div>
      <div className={styles.conversation_details}>
        <h3>{contactName}</h3>
        <p>{lastMessage?.content || <em>Sin mensajes</em>}</p>
      </div>
      {!isGroup && unreadCount > 0 && (
        <div className={styles.unread_count}>{unreadCount}</div>
      )}
    </div>
  );
};

import { useDispatch, useSelector } from "react-redux";
import { setActiveConversation } from "../../../redux/chatSlice";
import { selectUserProfile } from "../../../redux/UsersSlice";
import Avatar from "./Avatar";
import styles from "./Conversation.module.css";

const Conversation = ({
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
    <div className={styles.conversation_item} 
      onClick={loadMessages}>
      <Avatar
        imageUrl={contactAvatar}
        altText={contactName}
        size={"50px"}
        status={contactStatus}
      />
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

export default Conversation;

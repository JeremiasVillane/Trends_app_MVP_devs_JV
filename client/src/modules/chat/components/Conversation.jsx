import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { editMessage, setActiveConversation } from "../../../redux/chatSlice";
import { selectUserProfile } from "../../../redux/UsersSlice";
import Avatar from "./Avatar";
import styles from "./Conversation.module.css";

const Conversation = ({
  isGroup,
  conversationId,
  contactName,
  contactAvatar,
  contactStatus,
  messages,
  lastMessage,
  unreadCount,
}) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserProfile);

  const loadMessagesAndMarkAsRead = () => {
    dispatch(setActiveConversation(conversationId));

    // if (!isGroup) {
    //   for (const message of messages) {
    //     if (message.messageStatus === "sent" && message.userId !== user.id) {
    //       dispatch(
    //         editMessage(user.id, conversationId, message.messageId, {
    //           content: message.content,
    //           messageStatus: "read",
    //         })
    //       );
    //     }
    //   }
    // }
  };

  return (
    <div className={styles.conversation_item} 
      onClick={loadMessagesAndMarkAsRead}>
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

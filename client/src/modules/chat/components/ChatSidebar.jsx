import styles from "./ChatSidebar.module.css";
import ConversationHeader from "./ConversationHeader";
import ConversationList from "./ConversationList";
import ConversationSearchBar from "./ConversationSearchBar";

const ChatSidebar = ({
  onSearch,
  onCreatePrivateChat,
  onCreateGroup,
  setShowMessagesInSmallScreens,
  isSmallerThan590,
}) => {
  return (
    <div className={styles.chat_sidebar}>
      <ConversationHeader
        onCreatePrivateChat={onCreatePrivateChat}
        onCreateGroup={onCreateGroup}
        isSmallerThan590={isSmallerThan590}
      />
      <ConversationSearchBar onSearch={onSearch} />
      <ConversationList
        setShowMessagesInSmallScreens={setShowMessagesInSmallScreens}
        isSmallerThan590={isSmallerThan590}
      />
    </div>
  );
};

export default ChatSidebar;

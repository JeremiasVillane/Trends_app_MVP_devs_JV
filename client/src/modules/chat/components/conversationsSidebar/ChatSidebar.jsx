import { ConversationHeader, ConversationList, ConversationSearchBar } from ".";
import styles from "./ChatSidebar.module.css";

export const ChatSidebar = ({
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

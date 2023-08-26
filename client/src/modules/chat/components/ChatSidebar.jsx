import ConversationList from "./ConversationList";

const ChatSidebar = ({ conversations, setActiveConversation }) => {
  return (
    <div className="chat_sidebar">
      <ConversationList
        conversations={conversations}
        setActiveConversation={setActiveConversation}
      />
    </div>
  );
};

export default ChatSidebar;

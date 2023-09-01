import { useNavigate } from "react-router-dom";
import styles from "./ChatHeader.module.css"

const ChatHeader = ({ chatTitle, contactId, participants }) => {
  const navigate = useNavigate();
  const handleProfile = () => {
    navigate(`/user/profile/${contactId}`);
  };

  const groupMembers = [];

  for (const participant of participants) {
    groupMembers.push(participant.name)
  }

  return (
    <div className={styles.chat_header}>
      <h2 onClick={handleProfile}>{chatTitle}</h2>
      <p>{groupMembers.join(", ")}</p>
    </div>
  );
};

export default ChatHeader;

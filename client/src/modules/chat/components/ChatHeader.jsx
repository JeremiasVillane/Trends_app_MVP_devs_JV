import { useNavigate } from "react-router-dom";
import styles from "./ChatHeader.module.css"

const ChatHeader = ({ chatTitle, contactId, participants }) => {
  const navigate = useNavigate();
  const handleProfile = () => {
    navigate(`/user/profile/${contactId}`);
  };

  return (
    <div className={styles.chat_header}>
      <h2 onClick={handleProfile}>{chatTitle}</h2>
      {/* <p>{participants.join(", ")}</p> */}
    </div>
  );
};

export default ChatHeader;

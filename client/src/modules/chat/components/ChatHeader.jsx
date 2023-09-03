import { useNavigate } from "react-router-dom";
import { BsFillInfoCircleFill } from "react-icons/bs";
import Avatar from "./Avatar";
import styles from "./ChatHeader.module.css";
import { useSelector } from "react-redux";
import { selectDarkMode } from "../../../redux/UsersSlice";

const ChatHeader = ({
  isGroup,
  chatImage,
  chatTitle,
  contactId,
  participants,
  setShowInfo,
}) => {
  const navigate = useNavigate();
  const darkMode = useSelector(selectDarkMode);

  const handleProfile = () => {
    navigate(`/user/profile/${contactId}`);
  };

  const groupMembers = [];

  if (isGroup) {
    for (const participant of participants) {
      groupMembers.push(participant.name);
    }
  }

  return (
    <div className={styles.chat_header}>
      <Avatar imageUrl={chatImage} altText={chatTitle} size={"50px"} />
      <h2 onClick={isGroup ? null : handleProfile}>{chatTitle}</h2>
      {isGroup && (
        <BsFillInfoCircleFill
          size={20}
          color={ darkMode ? "#f5f5f5" : "#383836" }
          onClick={() => setShowInfo((curr) => !curr)}
          style={{ cursor: "pointer" }}
          title="Más información"
        />
      )}
    </div>
  );
};

export default ChatHeader;

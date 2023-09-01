import { useNavigate } from "react-router-dom";
import Avatar from "./Avatar";
import styles from "./ChatHeader.module.css";

const ChatHeader = ({
  isGroup,
  chatImage,
  chatTitle,
  contactId,
  participants,
}) => {
  const navigate = useNavigate();
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
      {/* {isGroup && <p>{groupMembers.join(", ")}</p>} */}
      {isGroup && (
        <details>
          <summary>Integrantes</summary>
          <div>
            {groupMembers.map((member, index) => (
              <p key={index}>{member}</p>
            ))}
          </div>
        </details>
      )}
    </div>
  );
};

export default ChatHeader;

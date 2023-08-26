import styles from "./ChatHeader.module.css"

const ChatHeader = ({ chatTitle, participants }) => {
  return (
    <div className={styles.chat_header}>
      <h2>{chatTitle}</h2>
      <p>{participants.join(", ")}</p>
    </div>
  );
};

export default ChatHeader;

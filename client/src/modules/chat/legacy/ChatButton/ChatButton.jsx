import { BsFillChatLeftTextFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { setIsMinimized } from "../../../../redux/chatSlice";
import styles from "./ChatButton.module.css";

export const ChatButton = () => {
  const dispatch = useDispatch();

  const handleMinimize = () => {
    dispatch(setIsMinimized(false));
  };

  return (
    <button className={styles.button} onClick={handleMinimize}>
      <BsFillChatLeftTextFill className={styles.icon} />
      <p className={styles.buttonText}>Chat</p>
    </button>
  );
};

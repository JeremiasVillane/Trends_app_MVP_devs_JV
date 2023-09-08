import { BsFillInfoCircleFill } from "react-icons/bs";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Avatar } from ".";
import { selectDarkMode } from "../../../../redux/uiSlice";
import styles from "./ChatHeader.module.css";

export const ChatHeader = ({
  isGroup,
  chatImage,
  chatTitle,
  contactId,
  setShowInfo,
  setShowMessagesInSmallScreens,
  setShowConversationListInSmallScreens,
  isSmallerThan590,
}) => {
  const navigate = useNavigate();
  const darkMode = useSelector(selectDarkMode);

  const handleProfile = () => {
    navigate(`/user/profile/${contactId}`);
  };

  const handleGoBack = () => {
    setShowMessagesInSmallScreens(false);
  };

  const handleShowInfo = () => {
    setShowInfo((curr) => !curr);
    if (isSmallerThan590) {
      setShowMessagesInSmallScreens(false);
      setShowConversationListInSmallScreens(false);
    }
  };

  return (
    <div className={styles.chat_header}>
      {isSmallerThan590 && (
        <section>
          <IoMdArrowRoundBack
            size={30}
            color={darkMode ? "#f5f5f5" : "#383836"}
            onClick={handleGoBack}
            style={{ cursor: "pointer", marginRight: "0.7rem" }}
            title="Volver"
          />
          <Avatar imageUrl={chatImage} altText={chatTitle} size={"50px"} />
        </section>
      )}
      <h2
        onClick={isGroup ? null : handleProfile}
        style={{ cursor: isGroup ? "default" : "pointer" }}
      >
        {chatTitle}
      </h2>
      <BsFillInfoCircleFill
        size={isSmallerThan590 ? 25 : 20}
        color={darkMode ? "#f5f5f5" : "#383836"}
        onClick={handleShowInfo}
        style={{ cursor: "pointer" }}
        title="Más información"
      />
    </div>
  );
};

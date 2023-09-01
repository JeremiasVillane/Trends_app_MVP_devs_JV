import React, { useEffect, useRef, useState } from "react";
import styles from "./GroupChatModal.module.css";
import GroupChatModalPage1 from "./GroupChatModalPage1";
import GroupChatModalPage2 from "./GroupChatModalPage2";

const GroupChatModal = ({ setShowGroupChatModal }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const ref = useRef();

  useEffect(() => {
    const handleKeydown = (e) =>
      e.key === "Escape" && setShowGroupChatModal(false);
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  const handleOverlayClick = (e) => {
    const { current } = ref;
    if (current === e.target) {
      setShowGroupChatModal(false);
    }
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  // const prevPage = () => {
  //   setCurrentPage(currentPage - 1);
  // };

  return (
    <div
      className={styles.modal_overlay}
      ref={ref}
      onClick={handleOverlayClick}
    >
      <div className={styles.modal_container}>
        {currentPage === 1 && (
          <GroupChatModalPage1
            onNext={nextPage}
            setShowGroupChatModal={setShowGroupChatModal}
          />
        )}
        {currentPage === 2 && (
          <GroupChatModalPage2
            setShowGroupChatModal={setShowGroupChatModal}
          />
        )}
      </div>
    </div>
  );
};

export default GroupChatModal;

import React, { useEffect, useRef, useState } from "react";
import { GroupChatModalPage1, GroupChatModalPage2 } from ".";
import useMediaQuery from "../../../hooks/useMediaQuery";
import styles from "./GroupChatModal.module.css";

export const GroupChatModal = ({ setShowGroupChatModal }) => {
  const isSmallerThan590 = useMediaQuery("(max-width: 590px)");
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

  return (
    <div
      className={styles.modal_overlay}
      ref={ref}
      onClick={handleOverlayClick}
    >
      <div
        className={styles.modal_container}
        style={isSmallerThan590 ? { width: "90vw" } : {}}
      >
        {currentPage === 1 && (
          <GroupChatModalPage1
            onNext={nextPage}
            setShowGroupChatModal={setShowGroupChatModal}
          />
        )}
        {currentPage === 2 && (
          <GroupChatModalPage2 setShowGroupChatModal={setShowGroupChatModal} />
        )}
      </div>
    </div>
  );
};

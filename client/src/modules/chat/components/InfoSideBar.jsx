import React, { useState } from "react";
import Avatar from "./Avatar";
import { AiFillEdit } from "react-icons/ai";
import styles from "./InfoSideBar.module.css";
import GroupChatImageModal from "./GroupChatImageModal";

const InfoSideBar = ({ infoType, image, name, contactId, participants }) => {
  const [showGroupChatImageModal, setShowGroupChatImageModal] = useState(false);

  const handleEditImage = () => {
    setShowGroupChatImageModal(true);
  };

  return (
    <>
      <div className={styles.info_sidebar}>
        {infoType === "infoGroup" ? (
          <>
            <header>Información del grupo</header>
            <main>
              <div className={styles.image_container} onClick={handleEditImage}>
                <Avatar imageUrl={image} altText={name} size={"12rem"} />
                <div className={styles.icon_container}>
                  <AiFillEdit size="6rem" color="white" />
                </div>
              </div>
              <p className={styles.name}>{name}</p>
            </main>

            <div className={styles.subtitle}>Integrantes:</div>
            <section>
              {participants.map((user, index) => (
                <div key={index} className={styles.user_card}>
                  <div className={styles.avatar}>
                    <Avatar
                      imageUrl={user.profile_image}
                      altText={user.name}
                      size={"50px"}
                      status={user.status}
                      type={"list"}
                    />
                  </div>
                  <h4>{user.name}</h4>
                </div>
              ))}
            </section>
          </>
        ) : (
          "InfoProfile"
        )}
      </div>
      {showGroupChatImageModal && (
        <GroupChatImageModal
          currentGroupId={contactId}
          currentGroupName={name}
          currentGroupImage={image}
          setShowGroupChatImageModal={setShowGroupChatImageModal}
        />
      )}
    </>
  );
};

export default InfoSideBar;

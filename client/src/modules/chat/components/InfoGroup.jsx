import React, { useEffect, useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import { useSelector } from "react-redux";
import { selectUserProfile } from "../../../redux/UsersSlice";
import Avatar from "./Avatar";
import InfoParticipant from "./InfoParticipant";
import styles from "./InfoSideBar.module.css";

const InfoGroup = ({
  handleEditInfo,
  handleDeleteGroup,
  ownerId,
  image,
  name,
  participants,
  darkMode,
  setShowInfo,
}) => {
  const user = useSelector(selectUserProfile);
  const [showOptions, setShowOptions] = useState(false);
  const [showParticipantInfo, setShowParticipantInfo] = useState(false);
  const [participantId, setParticipantId] = useState(null);

  const currentUserRole = participants.filter(
    (participant) => participant.id === user.id
  )[0].userChatGroup.role;

  const participantRole =
    participantId &&
    participants.filter((participant) => participant?.id === participantId)[0]
      ?.userChatGroup?.role;

  const ownerName = participants.filter(
    (participant) => participant.id === ownerId
  )[0].name;

  const moderators = participants
    .filter((participant) => participant.userChatGroup.role === "Moderador")
    .map((moderator) => moderator.name);

  const onlineParticipants = participants.filter(
    (participant) => participant.status === "online"
  );

  useEffect(() => {
    const handleKeydown = (e) => e.key === "Escape" && setShowOptions(false);
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  const handleUserCardClic = (event) => {
    setShowParticipantInfo(true);
    setParticipantId(event.currentTarget.id);
  };

  return (
    <>
      {showParticipantInfo ? (
        <InfoParticipant
          ownerId={ownerId}
          participantId={participantId}
          participantRole={participantRole}
          currentUserId={user.id}
          currentUserRole={currentUserRole}
          groupName={name}
          darkMode={darkMode}
          setShowParticipantInfo={setShowParticipantInfo}
          setShowInfo={setShowInfo}
        />
      ) : (
        <>
          <header>
            Información del grupo
            {currentUserRole === "Moderador" && (
              <SlOptionsVertical
                size={20}
                color={darkMode ? "#f5f5f5" : "#383836"}
                onClick={() => setShowOptions((curr) => !curr)}
                style={{ cursor: "pointer" }}
                title="Opciones"
              />
            )}
          </header>
          <main>
            <div className={styles.image_container}>
              <Avatar imageUrl={image} altText={name} size={"12rem"} />
            </div>
            <p className={styles.name}>{name}</p>
          </main>
          <div className={styles.role_list}>
            <p>
              <strong>Creador:</strong> {ownerName}
            </p>
            <p>
              <strong>Moderadores:</strong> {moderators.join(", ")}
            </p>
          </div>
          <div className={styles.subtitle}>Integrantes:</div>
          <p className={styles.online_participants}>
            {participants.length} integrante{participants.length > 1 && "s"}
            {participants.length > 1 && `, ${onlineParticipants.length}`}
            {participants.length === 1
              ? onlineParticipants.length
                ? ", en línea"
                : ""
              : " en línea"}
          </p>
          <section>
            {participants.map((user, index) => (
              <div
                id={user.id}
                key={index}
                className={styles.user_card}
                onClick={handleUserCardClic}
                style={{ cursor: "pointer" }}
              >
                <div className={styles.avatar}>
                  <Avatar
                    imageUrl={user.profile_image}
                    altText={user.name}
                    size={"50px"}
                    status={user.status}
                  />
                </div>
                <h4>{user.name}</h4>
              </div>
            ))}
          </section>
          {showOptions && (
            <div className={styles.options_menu}>
              <ul onClick={() => setShowOptions((curr) => !curr)}>
                <li onClick={handleEditInfo}>Editar grupo</li>
                {ownerId === user.id && (
                  <li onClick={handleDeleteGroup} style={{ color: "tomato" }}>
                    Eliminar grupo
                  </li>
                )}
              </ul>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default InfoGroup;

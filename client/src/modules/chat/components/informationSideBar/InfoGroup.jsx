import React, { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdGroupAdd } from "react-icons/md";
import { SlOptionsVertical } from "react-icons/sl";
import { useSelector } from "react-redux";
import { selectUserProfile } from "../../../../redux/usersSlice";
import { Avatar } from "../main";
import { InfoParticipant } from ".";
import styles from "./InfoSideBar.module.css";

export const InfoGroup = ({
  handleEditInfo,
  handleDeleteGroup,
  handleAddUserToGroup,
  ownerId,
  image,
  name,
  participants,
  darkMode,
  setShowInfo,
  isSmallerThan590,
  setShowMessagesInSmallScreens,
  setShowConversationListInSmallScreens,
}) => {
  const user = useSelector(selectUserProfile);
  const [showOptions, setShowOptions] = useState(false);
  const [showParticipantInfo, setShowParticipantInfo] = useState(false);
  const [participantId, setParticipantId] = useState(null);
  const lightColor = "#232323";
  const darkColor = "#FFF";

  //************ Variables a usar ************//
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
  //******************************************//

  // Cierra el modal con Esc
  useEffect(() => {
    const handleKeydown = (e) => e.key === "Escape" && setShowOptions(false);
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  // Carga info del usuario en la Info Sidebar
  const handleUserCardClic = (event) => {
    setShowParticipantInfo(true);
    setParticipantId(event.currentTarget.id);
  };

  const handleBackToMessages = () => {
    setShowInfo(false);
    setShowMessagesInSmallScreens(true);
    setShowConversationListInSmallScreens(true);
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
          setShowConversationListInSmallScreens={setShowConversationListInSmallScreens}
          setShowMessagesInSmallScreens={setShowMessagesInSmallScreens}
          isSmallerThan590={isSmallerThan590}
        />
      ) : (
        <>
          <header>
            {isSmallerThan590 && (
              <IoMdArrowRoundBack
                size={30}
                color={darkMode ? "#f5f5f5" : "#383836"}
                onClick={handleBackToMessages}
                style={{ cursor: "pointer" }}
                title="Volver"
              />
            )}
            Información del grupo
            {currentUserRole === "Moderador" && (
              <div className={styles.options_button}>
                <SlOptionsVertical
                  size={20}
                  color={darkMode ? "#f5f5f5" : "#383836"}
                  onClick={() => setShowOptions((curr) => !curr)}
                  style={{ cursor: "pointer" }}
                  title="Opciones"
                />
                {showOptions && (
                  <div className={styles.options_menu}>
                    <ul onClick={() => setShowOptions((curr) => !curr)}>
                      <li onClick={handleEditInfo}>Editar grupo</li>
                      {ownerId === user.id && (
                        <li
                          onClick={handleDeleteGroup}
                          style={{ color: "tomato" }}
                        >
                          Eliminar grupo
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
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
          <div className={styles.subtitle}>
            Integrantes
            {currentUserRole === "Moderador" && (
              <>
                {" "}
                <button onClick={handleAddUserToGroup}>
                  <MdGroupAdd
                    size={21}
                    color={darkMode ? darkColor : lightColor}
                    style={{ margin: "0 .5rem" }}
                    title="Agregar integrante"
                  />
                </button>
              </>
            )}
          </div>
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
        </>
      )}
    </>
  );
};

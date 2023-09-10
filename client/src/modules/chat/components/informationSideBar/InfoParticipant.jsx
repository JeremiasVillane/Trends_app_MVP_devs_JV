import React, { useEffect, useState } from "react";
import { BiSolidUser, BiSolidUserDetail } from "react-icons/bi";
import { HiAcademicCap, HiBriefcase, HiChat } from "react-icons/hi";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createNewPrivateChat,
  editGroupMemberRole,
  selectActiveConversation,
} from "../../../../redux/chatSlice";
import { getSomeUserInfo } from "../../../../redux/usersSlice";
import { GroupChatListModal, RemoveParticipantModal } from "../../modals";
import { Avatar } from "../main";
import styles from "./InfoSideBar.module.css";

export const InfoParticipant = ({
  ownerId,
  participantId,
  participantRole,
  currentUserId,
  currentUserRole,
  groupName,
  darkMode,
  setShowParticipantInfo,
  setShowInfo,
  setShowConversationListInSmallScreens,
  setShowMessagesInSmallScreens,
  isSmallerThan590,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const activeConversation = useSelector(selectActiveConversation);
  const [participantData, setParticipantData] = useState(null);
  const [showParticipantOptions, setShowParticipantOptions] = useState(false);
  const [currentParticipantRole, setCurrentParticipantRole] =
    useState(participantRole);
  const [showRemoveParticipantModal, setShowRemoveParticipantModal] =
    useState(false);
  const [editingRole, setEditingRole] = useState(false);
  const [showGroupChatListModal, setShowGroupChatListModal] = useState(false);
  const lightColor = "#232323";
  const darkColor = "#FFF";

  useEffect(() => {
    const participantInfo = dispatch(getSomeUserInfo(participantId));
    participantInfo.then((result) => setParticipantData(result));

    return () => {
      setParticipantData(null);
    };
  }, []);

  const handleProfile = () => {
    setShowInfo(false);
    navigate(`/user/profile/${participantId}`);
  };

  const handleChats = () => {
    setShowInfo(false);
    if (isSmallerThan590) {
      setShowMessagesInSmallScreens(true);
      setShowConversationListInSmallScreens(true);
    }
    dispatch(createNewPrivateChat(currentUserId, participantId));
  };

  const handleOptions = () => {
    setShowParticipantOptions((curr) => !curr);
  };

  const handleRolEdit = () => {
    setEditingRole(true);
  };

  const handleRoleSelect = (event) => {
    const { value } = event.target;
    setCurrentParticipantRole(value);
    dispatch(
      editGroupMemberRole(activeConversation, participantId, ownerId, {
        role: value,
      })
    );
    setEditingRole(false);
  };

  const handleRemoveParticipant = () => {
    setShowRemoveParticipantModal(true);
  };

  return (
    <>
      <header>
        <IoMdArrowRoundBack
          size={isSmallerThan590 ? 30 : 23}
          color={darkMode ? "#f5f5f5" : "#383836"}
          onClick={() => setShowParticipantInfo(false)}
          style={{ cursor: "pointer" }}
          title="Volver"
        />
        Datos del integrante
        <span />
      </header>
      <main>
        <div className={styles.image_container}>
          <Avatar
            imageUrl={participantData?.profile_image}
            altText={participantData?.name}
            size={"12rem"}
          />
        </div>
        <p className={styles.name}>{participantData?.name}</p>
        <p className={styles.username}>
          ({participantData?.username}){" "}
          <span>
            {participantData?.type === "student" ? (
              <HiAcademicCap
                className={styles.icon}
                color={darkMode ? darkColor : lightColor}
                title="Estudiante"
              />
            ) : (
              <HiBriefcase
                className={styles.icon}
                color={darkMode ? darkColor : lightColor}
                title="Profesional"
              />
            )}
          </span>
        </p>
      </main>
      <p className={styles.interests}>
        {participantData?.info_interests.join(" | ")}
      </p>
      <div className={styles.option_buttons_container}>
        {participantId === ownerId || participantId === currentUserId ? null : (
          <>
            <button onClick={handleProfile}>
              <BiSolidUser
                size={40}
                className={styles.option_button}
                color={darkMode ? darkColor : lightColor}
                title="Ver perfil"
              />
            </button>
            <button onClick={handleChats}>
              <HiChat
                size={40}
                className={styles.option_button}
                color={darkMode ? darkColor : lightColor}
                title="Enviar mensaje privado"
              />
            </button>
          </>
        )}
        <div className={styles.options_button}>
          {participantId === ownerId || participantId === currentUserId
            ? null
            : currentUserRole === "Moderador" && (
                <button onClick={handleOptions}>
                  <BiSolidUserDetail
                    size={40}
                    className={styles.option_button}
                    color={darkMode ? darkColor : lightColor}
                    title="Opciones"
                  />
                </button>
              )}
          {showParticipantOptions && (
            <div className={styles.participants_options_menu}>
              <ul onClick={() => setShowParticipantOptions((curr) => !curr)}>
                <li onClick={handleRolEdit}>Editar rol</li>
                <li
                  onClick={handleRemoveParticipant}
                  style={{ color: "tomato" }}
                >
                  Quitar del grupo
                </li>
                <li onClick={() => setShowGroupChatListModal((curr) => !curr)}>
                  Agregar a otro grupo
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className={styles.participant_role}>
        {editingRole ? (
          <>
            <strong>Rol actual:</strong>{" "}
            <select
              name="user_role"
              id="user_role"
              onChange={handleRoleSelect}
              value={currentParticipantRole}
              style={{ cursor: "pointer" }}
            >
              <option>Integrante</option>
              <option>Moderador</option>
            </select>
          </>
        ) : (
          <>
            {participantId === ownerId ? (
              <strong>Creador del grupo</strong>
            ) : (
              <strong>Rol actual: {participantRole}</strong>
            )}
          </>
        )}
      </div>
      {showRemoveParticipantModal && (
        <RemoveParticipantModal
          groupId={activeConversation}
          groupName={groupName}
          userId={participantId}
          userName={participantData.name}
          ownerId={ownerId}
          setShowRemoveParticipantModal={setShowRemoveParticipantModal}
          setShowParticipantInfo={setShowParticipantInfo}
        />
      )}
      {showGroupChatListModal && (
        <GroupChatListModal
          ownerId={ownerId}
          userToAdd={participantId}
          setShowGroupChatListModal={setShowGroupChatListModal}
          setShowInfo={setShowInfo}
        />
      )}
    </>
  );
};

import React, { useEffect, useState } from "react";
import { BiSolidUser, BiSolidUserDetail } from "react-icons/bi";
import { HiAcademicCap, HiBriefcase, HiChat } from "react-icons/hi";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createNewPrivateChat,
  editGroupMemberRole,
} from "../../../redux/chatSlice";
import { getSomeUserInfo } from "../../../redux/UsersSlice";
import Avatar from "./Avatar";
import styles from "./InfoSideBar.module.css";
import RemoveParticipantModal from "./RemoveParticipantModal";

const InfoParticipant = ({
  ownerId,
  participantId,
  participantRole,
  currentUserId,
  currentUserRole,
  groupName,
  darkMode,
  setShowParticipantInfo,
  setShowInfo,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const activeConversation = useSelector(
    (state) => state.chat.activeConversation
  );
  const [participantData, setParticipantData] = useState(null);
  const [showParticipantOptions, setShowParticipantOptions] = useState(false);
  const [currentParticipantRole, setCurrentParticipantRole] =
    useState(participantRole);
  const [showRemoveParticipantModal, setShowRemoveParticipantModal] =
    useState(false);
  const [editingRole, setEditingRole] = useState(false);
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
    dispatch(createNewPrivateChat(currentUserId, participantId));
    navigate("/chatroom/chat");
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
          size={20}
          color={darkMode ? "#f5f5f5" : "#383836"}
          onClick={() => setShowParticipantInfo(false)}
          style={{ cursor: "pointer" }}
          title="Volver"
        />
        Datos del integrante
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
              <li onClick={handleRolEdit}>Editar rol en el grupo</li>
              <li onClick={handleRemoveParticipant}>Quitar del grupo</li>
              <li>Agregar a grupo</li>
            </ul>
          </div>
        )}
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
    </>
  );
};

export default InfoParticipant;

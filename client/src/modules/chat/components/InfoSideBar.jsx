import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectDarkMode } from "../../../redux/UsersSlice";
import AddUserToGroupModal from "./AddUserToGroupModal";
import GroupChatDeleteModal from "./GroupChatDeleteModal";
import GroupChatEditModal from "./GroupChatEditModal";
import InfoGroup from "./InfoGroup";
import InfoProfile from "./InfoProfile";
import styles from "./InfoSideBar.module.css";
import PrivateChatDeleteModal from "./PrivateChatDeleteModal";

const InfoSideBar = ({
  infoType,
  image,
  name,
  username,
  contactId,
  conversationId,
  ownerId,
  participants,
  setShowInfo,
  isSmallerThan590,
  setShowMessagesInSmallScreens,
  setShowConversationListInSmallScreens,
}) => {
  const darkMode = useSelector(selectDarkMode);
  const [showGroupChatEditModal, setShowGroupChatEditModal] = useState(false);
  const [showDeleteGroupModal, setShowDeleteGroupModal] = useState(false);
  const [showDeleteChatModal, setShowDeleteChatModal] = useState(false);
  const [showAddUserToGroupModal, setShowAddUserToGroupModal] = useState(false);

  // Para que aparezca primero el creador del grupo
  const reversedParticipants = participants && [...participants].reverse();

  const handleEditInfo = () => {
    setShowGroupChatEditModal(true);
  };

  const handleDeleteGroup = () => {
    setShowDeleteGroupModal(true);
  };

  const handleDeleteChat = () => {
    setShowDeleteChatModal(true);
  };

  const handleAddUserToGroup = () => {
    setShowAddUserToGroupModal(true);
  };

  return (
    <>
      <div className={styles.info_sidebar}>
        {infoType === "infoGroup" && (
          <InfoGroup
            handleEditInfo={handleEditInfo}
            handleDeleteGroup={handleDeleteGroup}
            handleAddUserToGroup={handleAddUserToGroup}
            ownerId={ownerId}
            image={image}
            name={name}
            participants={reversedParticipants}
            darkMode={darkMode}
            setShowInfo={setShowInfo}
            isSmallerThan590={isSmallerThan590}
            setShowMessagesInSmallScreens={setShowMessagesInSmallScreens}
            setShowConversationListInSmallScreens={
              setShowConversationListInSmallScreens
            }
          />
        )}
        {infoType === "infoProfile" && (
          <InfoProfile
            handleDeleteChat={handleDeleteChat}
            image={image}
            name={name}
            username={username}
            contactId={contactId}
            darkMode={darkMode}
            setShowInfo={setShowInfo}
          />
        )}
      </div>
      {showGroupChatEditModal && (
        <GroupChatEditModal
          currentGroupId={conversationId}
          currentGroupName={name}
          currentGroupImage={image}
          setShowGroupChatEditModal={setShowGroupChatEditModal}
        />
      )}
      {showDeleteGroupModal && (
        <GroupChatDeleteModal
          groupId={conversationId}
          groupName={name}
          setShowDeleteGroupModal={setShowDeleteGroupModal}
          setShowInfo={setShowInfo}
        />
      )}
      {showAddUserToGroupModal && (
        <AddUserToGroupModal
          groupId={conversationId}
          ownerId={ownerId}
          participants={reversedParticipants}
          setShowAddUserToGroupModal={setShowAddUserToGroupModal}
          setShowInfo={setShowInfo}
        />
      )}
      {showDeleteChatModal && (
        <PrivateChatDeleteModal
          chatId={conversationId}
          contactName={name}
          setShowDeleteChatModal={setShowDeleteChatModal}
          setShowInfo={setShowInfo}
        />
      )}
    </>
  );
};

export default InfoSideBar;

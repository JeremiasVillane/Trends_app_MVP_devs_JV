import React, { useState } from "react";
import { HiAcademicCap, HiBriefcase } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { addGroupMember } from "../../../redux/chatSlice";
import {
  selectAllUsers,
  selectDarkMode,
  selectUserProfile,
} from "../../../redux/UsersSlice";
import Avatar from "./Avatar";
import styles from "./GroupChatModal.module.css";

const GroupChatModalPage2 = ({ setShowGroupChatModal }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserProfile);
  const allUsers = useSelector(selectAllUsers);
  const activeConversation = useSelector(
    (state) => state.chat.activeConversation
  );
  const darkMode = useSelector(selectDarkMode);
  const lightColor = "#232323";
  const darkColor = "#FFF";

  const [selectedMembers, setSelectedMembers] = useState([]);

  const handleSelectMember = (event) => {
    const memberId = event.target.value;
    const selectedMember = allUsers.find((user) => user.user.id === memberId);

    if (selectedMembers.includes(selectedMember.user.id)) {
      setSelectedMembers(
        selectedMembers.filter((member) => member !== selectedMember.user.id)
      );
    } else {
      setSelectedMembers([...selectedMembers, selectedMember.user.id]);
    }
  };

  const handleAddMember = () => {
    dispatch(
      addGroupMember({
        ownerId: user.id,
        groupId: activeConversation,
        users: selectedMembers,
      })
    ).then(() => setShowGroupChatModal(false));
  };

  return (
    <div className={styles.modal_page}>
      <div className={styles.modal_header}>
        <h2>Añadir integrantes al grupo</h2>
      </div>
      <div className={styles.modal_content}>
        <div className={styles.chatgroup_userlist}>
          {allUsers.map((user) => (
            <label key={user.user.id}>
              <input
                type="checkbox"
                // className={styles.ui_checkbox}
                value={user.user.id}
                checked={selectedMembers.includes(user.user.id)}
                onChange={handleSelectMember}
              />
              <Avatar
                imageUrl={user.user.profile_image}
                altText={user.user.name}
                size={"50px"}
                status={user.user.status}
                type={"list"}
              />
              <h4>{user.user.name}</h4>
              <div className={styles.tooltip}>
                {user.user.type === "student" ? (
                  <HiAcademicCap
                    className={styles.icon}
                    color={darkMode ? darkColor : lightColor}
                  />
                ) : (
                  <HiBriefcase
                    className={styles.icon}
                    color={darkMode ? darkColor : lightColor}
                  />
                )}
                <span className={styles.tooltiptext}>
                  {user.user.type === "student" ? "Estudiante" : "Profesional"}
                </span>
              </div>
              <section>
                {user.user.info_skills
                  ? user.user.info_skills.join(" | ")
                  : user.user.info_interests[0]}
              </section>
            </label>
          ))}
        </div>
        <div className={styles.buttons_container}>
          <button className={styles.page_button} onClick={handleAddMember}>
            Agregar integrantes
          </button>
          <button
            className={styles.cancel_button}
            onClick={() => setShowGroupChatModal(false)}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupChatModalPage2;

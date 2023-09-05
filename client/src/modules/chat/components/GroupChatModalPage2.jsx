import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { addGroupMember } from "../../../redux/chatSlice";
import { selectAllUsers, selectDarkMode, selectUserProfile } from "../../../redux/UsersSlice";
import Avatar from "./Avatar";
import styles from "./GroupChatModal.module.css";

const GroupChatModalPage2 = ({ setShowGroupChatModal }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserProfile);
  const darkMode = useSelector(selectDarkMode);
  const allUsers = useSelector(selectAllUsers);
  const activeConversation = useSelector(
    (state) => state.chat.activeConversation
  );

  const [selectedMembers, setSelectedMembers] = useState([]);

  useEffect(() => {
    if (selectedMembers && selectedMembers.length === 10) {
      const updatedMembers = selectedMembers.slice(0, -1);
      setSelectedMembers(updatedMembers);

      Swal.fire({
        icon: "error",
        position: "top-end",
        toast: true,
        title: "Límite de integrantes",
        text: "Solo se permiten hasta diez integrantes por grupo",
        showConfirmButton: false,
        timer: 3500,
        timerProgressBar: false,
        background: darkMode ? "#383636" : "#FFF",
        color: darkMode ? "#FFF" : "#545454",
      });
    }
  }, [selectedMembers]);

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
          {allUsers.map((user, index) => (
            <div key={index} className={styles.user_card}>
              <label key={user.user.id}>
                <input
                  type="checkbox"
                  // className={styles.ui_checkbox}
                  value={user.user.id}
                  checked={selectedMembers.includes(user.user.id)}
                  onChange={handleSelectMember}
                />
                <div className={styles.avatar}>
                  <Avatar
                    imageUrl={user.user.profile_image}
                    altText={user.user.name}
                    size={"50px"}
                    status={user.user.status}
                    type={"list"}
                  />
                </div>
                <h4>{user.user.name}</h4>
                <div className={styles.user_type}>
                  {user.user.type === "student" ? "Estudiante" : "Profesional"}
                </div>
              </label>
            </div>
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

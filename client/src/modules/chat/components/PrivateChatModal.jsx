import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewPrivateChat } from "../../../redux/chatSlice";
import { selectAllUsers, selectUserProfile } from "../../../redux/UsersSlice";
import Avatar from "./Avatar";
import styles from "./GroupChatModal.module.css";

const PrivateChatModal = ({ setShowPrivateChatModal }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserProfile);
  const allUsers = useSelector(selectAllUsers);

  const [selectedContact, setSelectedContact] = useState("");

  const handleSelectMember = (event) => {
    const contactId = event.target.value;
    const newSelectedContact = allUsers.find(
      (user) => user.user.id === contactId
    );

    if (selectedContact.includes(newSelectedContact.user.id)) {
      setSelectedContact(
        selectedContact.filter(
          (contact) => contact !== newSelectedContact.user.id
        )
      );
    } else {
      setSelectedContact(newSelectedContact.user.id);
    }
  };

  const handlePrivateChat = () => {
    dispatch(createNewPrivateChat(user.id, selectedContact)).then(() =>
      setShowPrivateChatModal(false)
    );
  };

  const ref = useRef();

  useEffect(() => {
    const handleKeydown = (event) =>
      event.key === "Escape" && setShowPrivateChatModal(false);
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  const handleOverlayClick = (event) => {
    const { current } = ref;
    if (current === event.target) {
      setShowPrivateChatModal(false);
    }
  };

  return (
    <div
      className={styles.modal_overlay}
      ref={ref}
      onClick={handleOverlayClick}
    >
      <div className={styles.modal_container}>
        <div className={styles.modal_header}>
          <h2>Iniciar chat privado</h2>
        </div>
        <div className={styles.modal_content}>
          <div className={styles.chatgroup_userlist}>
            {allUsers.map((user, index) => (
              <div key={index} className={styles.user_card}>
                <label key={user.user.id}>
                  <input
                    type="radio"
                    value={user.user.id}
                    checked={selectedContact.includes(user.user.id)}
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
                    {user.user.type === "student"
                      ? "Estudiante"
                      : "Profesional"}
                  </div>
                </label>
              </div>
            ))}
          </div>
          <div className={styles.buttons_container}>
            <button
              className={styles.page_button}
              onClick={handlePrivateChat}
              disabled={!selectedContact}
            >
              Iniciar chat
            </button>
            <button
              className={styles.cancel_button}
              onClick={() => setShowPrivateChatModal(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivateChatModal;

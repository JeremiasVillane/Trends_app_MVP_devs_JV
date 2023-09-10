import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import useMediaQuery from "../../../hooks/useMediaQuery";
import { useScrollLock } from "../../../hooks/useScrollLock";
import { addGroupMember, getUserChatGroups } from "../../../redux/chatSlice";
import { selectDarkMode } from "../../../redux/uiSlice";
import { Avatar } from "../components/main";
import styles from "./GroupChatModal.module.css";

export const GroupChatListModal = ({
  ownerId,
  userToAdd,
  setShowGroupChatListModal,
  setShowInfo,
}) => {
  const dispatch = useDispatch();
  const isSmallerThan590 = useMediaQuery("(max-width: 590px)");
  const darkMode = useSelector(selectDarkMode);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [groupList, setGroupList] = useState([]);
  const { lockScroll, unlockScroll } = useScrollLock();

  const groupsWithVacants = groupList.filter(
    (group) => group.participants.length < 10
  );
  const groupsWithUserToAddNotIncluded = groupsWithVacants.filter((group) => {
    const isUserAlreadyInGroup = group.participants.some(
      (user) => user.id === userToAdd
    );

    return !isUserAlreadyInGroup;
  });

  useEffect(() => {
    dispatch(getUserChatGroups()).then((result) => setGroupList(result));
    lockScroll();

    return () => {
      unlockScroll();
    };
  }, []);

  //***** Lógica para seleccionar el/los grupo/s ******//
  const handleSelectGroup = (event) => {
    const selectedGroupId = event.target.value;
    const selectedGroup = groupsWithUserToAddNotIncluded.find(
      (group) => group.groupId === Number(selectedGroupId)
    );

    if (selectedGroups.includes(selectedGroup?.groupId)) {
      setSelectedGroups(
        selectedGroups.filter((group) => group !== selectedGroup?.groupId)
      );
    } else {
      setSelectedGroups([...selectedGroups, selectedGroup?.groupId]);
    }
  };
  //***************************************************//

  //**** Lógica para añadir usuario al/los grupo/s ****//
  const handleAddMember = () => {
    for (const group of selectedGroups) {
      dispatch(
        addGroupMember({
          ownerId,
          groupId: group,
          users: [userToAdd],
        })
      );
    }
    setShowGroupChatListModal(false);
    setShowInfo && setShowInfo(false);

    Swal.fire({
      icon: "success",
      position: "top-end",
      toast: true,
      title: "Usuario agregado",
      text:
        "Se agregó correctamente el usuario a" +
        (selectedGroups.length > 1 ? " los grupos" : "l grupo"),

      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: false,
      background: darkMode ? "#383636" : "#FFF",
      color: darkMode ? "#FFF" : "#545454",
    });
  };
  //***************************************************//

  //*********** Lógica para cerrar el modal ***********//
  const ref = useRef();

  useEffect(() => {
    const handleKeydown = (event) =>
      event.key === "Escape" && setShowGroupChatListModal(false);
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  const handleOverlayClick = (event) => {
    const { current } = ref;
    if (current === event.target) {
      setShowGroupChatListModal(false);
    }
  };
  //***************************************************//

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
        <div className={styles.modal_header}>
          <h2>
            Agregar usuario a
            {selectedGroups.length > 1 ? " los grupos" : " un grupo"}
          </h2>
        </div>
        <div className={styles.modal_content}>
          <div className={styles.chatgroup_userlist}>
            {!groupsWithUserToAddNotIncluded.length ? (
              <p
                style={{
                  display: "flex",
                  flex: "1",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                No tienes grupos disponibles para agregar a este usuario
              </p>
            ) : (
              groupsWithUserToAddNotIncluded?.map((group, index) => (
                <div key={index} className={styles.user_card}>
                  <label key={group.groupId}>
                    <input
                      type="checkbox"
                      className={styles.ui_checkbox}
                      value={group.groupId}
                      checked={selectedGroups.includes(group.groupId)}
                      onChange={handleSelectGroup}
                    />
                    <div className={styles.avatar}>
                      <Avatar
                        imageUrl={group.groupImage}
                        altText={group.groupName}
                        size={"50px"}
                      />
                    </div>
                    <div className={styles.user_name}>
                      <h4>{group.groupName}</h4>
                      <div className={styles.user_username}>
                        ({group.participants.length} integrante
                        {group.participants.length > 1 ? "s" : ""})
                      </div>
                    </div>
                  </label>
                </div>
              ))
            )}
          </div>
          <div className={styles.buttons_container}>
            <button
              className={styles.page_button}
              onClick={handleAddMember}
              disabled={selectedGroups.length < 1}
            >
              Agregar
            </button>
            <button
              className={styles.cancel_button}
              onClick={() => setShowGroupChatListModal(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

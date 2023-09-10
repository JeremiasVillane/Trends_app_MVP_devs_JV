import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { addGroupMember } from "../../../redux/chatSlice";
import { selectDarkMode } from "../../../redux/uiSlice";
import { searchUsers } from "../../../redux/usersSlice";
import { Avatar } from "../components/main";
import styles from "./GroupChatModal.module.css";

export const AddUserToGroupModal = ({
  groupId,
  ownerId,
  participants,
  setShowAddUserToGroupModal,
}) => {
  const dispatch = useDispatch();
  const darkMode = useSelector(selectDarkMode);
  const chatGroupUserListRef = useRef(null);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [typeSearched, setTypeSearched] = useState("professional");
  const [querySearched, setQuerySearched] = useState("");
  const [page, setPage] = useState(1);
  const [selectedMembers, setSelectedMembers] = useState([]);

  const currentMembersInGroup = participants.length;

  // Límite de integrantes: 10 (contando al creador)
  useEffect(() => {
    if (
      selectedMembers &&
      selectedMembers.length === 11 - currentMembersInGroup
    ) {
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

  //********** Lógica para añadir integrantes **********//
  const handleSelectMember = (event) => {
    const memberId = event.target.value;
    const selectedMember = searchedUsers.find((user) => user.id === memberId);

    if (selectedMembers.includes(selectedMember.id)) {
      setSelectedMembers(
        selectedMembers.filter((member) => member !== selectedMember.id)
      );
    } else {
      setSelectedMembers([...selectedMembers, selectedMember.id]);
    }
  };

  const handleAddMember = () => {
    dispatch(
      addGroupMember({
        ownerId,
        groupId,
        users: selectedMembers,
      })
    ).then(() => {
      setShowAddUserToGroupModal(false);
      Swal.fire({
        icon: "success",
        position: "top-end",
        toast: true,
        title: "Usuario agregado",
        text: "Se agregaron correctamente los usuarios al grupo",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: false,
        background: darkMode ? "#383636" : "#FFF",
        color: darkMode ? "#FFF" : "#545454",
      });
    });
  };
  //****************************************************//

  //*********** Lógica para cerrar el modal **********+//
  const ref = useRef();

  useEffect(() => {
    const handleKeydown = (event) =>
      event.key === "Escape" && setShowAddUserToGroupModal(false);
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  const handleOverlayClick = (event) => {
    const { current } = ref;
    if (current === event.target) {
      setShowAddUserToGroupModal(false);
    }
  };
  //****************************************************//

  //** Lógica para filtrar los usuarios por su nombre **//
  const loadUsers = () => {
    dispatch(searchUsers(typeSearched, page, querySearched)).then((result) => {
      if (result.length === 0) {
        setSearchedUsers([]);
      } else {
        const usersNotCurrentlyIncluded = result.data.filter(
          (userData) =>
            !participants.some(
              (userParticipant) => userParticipant.id === userData.id
            )
        );

        if (page === 1) {
          setSearchedUsers(usersNotCurrentlyIncluded);
        } else {
          setSearchedUsers([...searchedUsers, ...usersNotCurrentlyIncluded]);
        }
      }
    });
  };

  const handleSearch = (event) => {
    const { value } = event.target;
    setTypeSearched(value);
    setSearchedUsers([]);
    setPage(1);
  };

  const handleQuery = (event) => {
    const { value } = event.target;
    setQuerySearched(value);
    setPage(1);
  };
  //****************************************************//

  //********** Lógica del infinite scrolling **********//
  const checkScrollAndLoadMore = () => {
    const chatGroupUserList = chatGroupUserListRef.current;
    if (
      chatGroupUserList &&
      chatGroupUserList.scrollHeight - chatGroupUserList.scrollTop ===
        chatGroupUserList.clientHeight
    ) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    const chatGroupUserList = chatGroupUserListRef.current;
    chatGroupUserList.addEventListener("scroll", checkScrollAndLoadMore);

    return () => {
      chatGroupUserList.removeEventListener("scroll", checkScrollAndLoadMore);
    };
  }, []);

  //****************************************************//

  useEffect(() => {
    loadUsers();
  }, [typeSearched, querySearched, page]);

  return (
    <div
      className={styles.modal_overlay}
      ref={ref}
      onClick={handleOverlayClick}
    >
      <div className={styles.modal_container}>
        <div className={styles.modal_header}>
          <h2>Agregar integrantes</h2>
        </div>
        <div className={styles.modal_content}>
          <div className={styles.searchbar}>
            <select name="user_type" onChange={handleSearch}>
              <option value="professional" defaultValue={"Profesionales"}>
                Profesionales
              </option>
              <option value="student">Estudiantes</option>
            </select>
            <input
              type="text"
              name="search_bar"
              placeholder="Buscar usuarios..."
              onChange={handleQuery}
            />
          </div>
          <div className={styles.chatgroup_userlist} ref={chatGroupUserListRef}>
            {searchedUsers?.map((user, index) => (
              <div key={index} className={styles.user_card}>
                <label key={user.id}>
                  <input
                    type="checkbox"
                    className={styles.ui_checkbox}
                    value={user.id}
                    checked={selectedMembers.includes(user.id)}
                    onChange={handleSelectMember}
                  />
                  <div className={styles.avatar}>
                    <Avatar
                      imageUrl={user.profile_image}
                      altText={user.name}
                      size={"50px"}
                      status={user.status}
                      type={"list"}
                    />
                  </div>
                  <div className={styles.user_name}>
                    <h4>{user.name}</h4>
                    <div className={styles.user_username}>
                      ({user.username})
                    </div>
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
              onClick={() => setShowAddUserToGroupModal(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

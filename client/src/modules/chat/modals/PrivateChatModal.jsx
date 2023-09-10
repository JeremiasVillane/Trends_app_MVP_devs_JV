import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useMediaQuery from "../../../hooks/useMediaQuery";
import { createNewPrivateChat } from "../../../redux/chatSlice";
import { searchUsers, selectUserProfile } from "../../../redux/usersSlice";
import { Avatar } from "../components/main";
import styles from "./GroupChatModal.module.css";

export const PrivateChatModal = ({ setShowPrivateChatModal }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserProfile);
  const chatUserListRef = useRef(null);
  const isSmallerThan590 = useMediaQuery("(max-width: 590px)");
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [typeSearched, setTypeSearched] = useState("professional");
  const [querySearched, setQuerySearched] = useState("");
  const [page, setPage] = useState(1);
  const [selectedContact, setSelectedContact] = useState("");

  //********** Lógica para elegir contacto **********//
  const handleSelectContact = (event) => {
    const contactId = event.target.value;
    const newSelectedContact = searchedUsers.find(
      (user) => user.id === contactId
    );

    if (selectedContact.includes(newSelectedContact.id)) {
      setSelectedContact(
        selectedContact.filter((contact) => contact !== newSelectedContact.id)
      );
    } else {
      setSelectedContact(newSelectedContact.id);
    }
  };

  const handlePrivateChat = () => {
    dispatch(createNewPrivateChat(user.id, selectedContact)).then(() =>
      setShowPrivateChatModal(false)
    );
  };
  //****************************************************//

  //*********** Lógica para cerrar el modal **********+//
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
  //****************************************************//

  //***** Lógica para filtrar contactos por nombre *****//
  const loadUsers = () => {
    dispatch(searchUsers(typeSearched, page, querySearched)).then((result) => {
      if (result.length === 0) {
        setSearchedUsers([]);
      } else {
        if (page === 1) {
          // Si estamos en la primera página,
          // reemplazamos los resultados
          setSearchedUsers(result.data);
        } else {
          // Si estamos en páginas siguientes,
          // agregamos los resultados a la lista existente
          setSearchedUsers([...searchedUsers, ...result.data]);
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
    const chatUserList = chatUserListRef.current;
    if (
      chatUserList &&
      chatUserList.scrollHeight - chatUserList.scrollTop ===
        chatUserList.clientHeight
    ) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    const chatUserList = chatUserListRef.current;
    chatUserList.addEventListener("scroll", checkScrollAndLoadMore);

    return () => {
      chatUserList.removeEventListener("scroll", checkScrollAndLoadMore);
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
      <div
        className={styles.modal_container}
        style={isSmallerThan590 ? { width: "90vw" } : {}}
      >
        <div className={styles.modal_header}>
          <h2>Iniciar chat privado</h2>
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
          <div className={styles.chatgroup_userlist} ref={chatUserListRef}>
            {searchedUsers.map((user, index) => (
              <div key={index} className={styles.user_card}>
                <label key={user.id} title="Seleccionar">
                  <input
                    type="radio"
                    value={user.id}
                    checked={selectedContact.includes(user.id)}
                    onChange={handleSelectContact}
                  />
                  <div className={styles.avatar}>
                    <Avatar
                      imageUrl={user.profile_image}
                      altText={user.name}
                      size={"50px"}
                      status={user.status}
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

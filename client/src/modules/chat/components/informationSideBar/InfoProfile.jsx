import React, { useEffect, useState } from "react";
import { BiSolidUser } from "react-icons/bi";
import { HiAcademicCap, HiBriefcase } from "react-icons/hi";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdGroupAdd } from "react-icons/md";
import { SlOptionsVertical } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getSomeUserInfo,
  selectUserProfile,
} from "../../../../redux/usersSlice";
import { GroupChatListModal } from "../../modals";
import { Avatar } from "../main";
import styles from "./InfoSideBar.module.css";

export const InfoProfile = ({
  handleDeleteChat,
  image,
  name,
  username,
  contactId,
  darkMode,
  setShowInfo,
  isSmallerThan590,
  setShowMessagesInSmallScreens,
  setShowConversationListInSmallScreens,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUserProfile);
  const [profileData, setProfileData] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [showGroupChatListModal, setShowGroupChatListModal] = useState(false);
  const lightColor = "#232323";
  const darkColor = "#FFF";

  useEffect(() => {
    const profileInfo = dispatch(getSomeUserInfo(contactId));
    profileInfo.then((result) => setProfileData(result));

    return () => {
      setProfileData(null);
    };
  }, []);

  const handleProfile = () => {
    setShowInfo(false);
    navigate(`/user/profile/${contactId}`);
  };

  const handleBackToMessages = () => {
    setShowInfo(false);
    setShowMessagesInSmallScreens(true);
    setShowConversationListInSmallScreens(true);
  };

  return (
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
        Información de perfil
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
                <li onClick={handleDeleteChat} style={{ color: "tomato" }}>
                  Eliminar chat
                </li>
              </ul>
            </div>
          )}
        </div>
      </header>
      <main>
        <div className={styles.image_container}>
          <Avatar imageUrl={image} altText={name} size={"12rem"} />
        </div>
        <p className={styles.name}>{name}</p>
        <p className={styles.username}>
          ({username}){" "}
          <span>
            {profileData?.type === "student" ? (
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
        {profileData?.info_interests.join(" | ")}
      </p>
      <div className={styles.option_buttons_container}>
        <button onClick={handleProfile}>
          <BiSolidUser
            size={40}
            className={styles.option_button}
            color={darkMode ? darkColor : lightColor}
            title="Ver perfil"
          />
        </button>
        <button onClick={() => setShowGroupChatListModal(true)}>
          <MdGroupAdd
            size={40}
            className={styles.option_button}
            color={darkMode ? darkColor : lightColor}
            title="Agregar a grupo"
          />
        </button>
      </div>
      {showGroupChatListModal && (
        <GroupChatListModal
          ownerId={user.id}
          userToAdd={contactId}
          setShowGroupChatListModal={setShowGroupChatListModal}
          setShowInfo={setShowInfo}
        />
      )}
    </>
  );
};

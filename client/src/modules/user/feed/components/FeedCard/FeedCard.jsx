import { HiAcademicCap, HiBriefcase, HiChat, HiUser } from "react-icons/hi";
import { MdGroupAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "../../../../../hooks/useMediaQuery";
import { createNewPrivateChat } from "../../../../../redux/chatSlice";
import { selectDarkMode } from "../../../../../redux/uiSlice";
import { selectUserProfile } from "../../../../../redux/usersSlice";
import { Avatar } from "../../../../chat/components/main";
import styles from "./FeedCard.module.css";

export const FeedCard = ({ user, handleAddToGroup }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(selectUserProfile);
  const isSmallerThan650 = useMediaQuery("(max-width: 650px)");
  const darkMode = useSelector(selectDarkMode);
  const lightColor = "#232323";
  const darkColor = "#FFF";

  const handleProfile = () => {
    navigate(`/user/profile/${user.user.id}`);
  };
  const handleChats = () => {
    dispatch(createNewPrivateChat(currentUser.id, user.user.id));
    navigate("/chatroom/chat");
  };

  return (
    <div className={styles.card}>
      <div className={styles.card_avatar_container}>
        <div className={styles.card_image} onClick={handleProfile}>
          <Avatar
            imageUrl={user.user.profile_image}
            altText={user.user.name}
            size={"8rem"}
            status={user.user.status}
            type={"feed"}
          />
        </div>
      </div>

      <div className={styles.card_profile}>
        <div className={styles.name_icons}>
          <div className={styles.name_type}>
            <h1 onClick={handleProfile}>{user.user.name}</h1>

            {user.user.type === "student" ? (
              <>
                <HiAcademicCap
                  className={styles.icon}
                  color={darkMode ? darkColor : lightColor}
                  title="Estudiante"
                />
                <span className={styles.user_type}>Estudiante</span>
              </>
            ) : (
              <>
                <HiBriefcase
                  className={styles.icon}
                  color={darkMode ? darkColor : lightColor}
                  title="Profesional"
                />
                <span className={styles.user_type}>Profesional</span>
              </>
            )}
          </div>

          <div className={styles.card_buttons}>
            <button onClick={handleProfile} title="Ver perfil">
              <HiUser
                size={isSmallerThan650 ? 25 : 20}
                className={styles.icon}
                color={darkMode ? darkColor : lightColor}
              />
            </button>

            <button onClick={handleChats} title="Iniciar chat">
              <HiChat
                size={isSmallerThan650 ? 25 : 20}
                className={styles.icon}
                color={darkMode ? darkColor : lightColor}
              />
            </button>

            <button
              onClick={() => handleAddToGroup(user.user.id)}
              title="Agregar a grupo"
            >
              <MdGroupAdd
                size={isSmallerThan650 ? 25 : 20}
                className={styles.icon}
                color={darkMode ? darkColor : lightColor}
              />
            </button>
          </div>
        </div>

        <div className={styles.info_container}>
          <h3 className={styles.subtitle}>
            {user.user.info_skills
              ? user.user.info_skills.join(" | ")
              : user.user.info_interests[0]}
            {user.user.profile_city || user.user.profile_country ? (
              <p>
                {`${user.user.profile_city}, ${user.user.profile_country}`}{" "}
              </p>
            ) : null}
          </h3>
          <h3 className={styles.bio_container}>{user.user.profile_bio}</h3>
        </div>
      </div>
    </div>
  );
};

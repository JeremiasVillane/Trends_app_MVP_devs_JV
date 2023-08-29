import { HiAcademicCap, HiBriefcase, HiChat, HiUser } from "react-icons/hi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectDarkMode } from "../../../../../redux/UsersSlice";
import Avatar from "../../../../chat/components/Avatar";
import styles from "./FeedCard.module.css";

export const FeedCard = ({ user }) => {
  const navigate = useNavigate();
  const darkMode = useSelector(selectDarkMode);
  const lightColor = "#232323";
  const darkColor = "#FFF";

  const handleProfile = () => {
    navigate(`/user/profile/${user.user.id}`);
  };
  const handleChats = () => {
    navigate("/chat");
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardImage} onClick={handleProfile}>
        <Avatar
          imageUrl={user.user.profile_image}
          altText={user.user.name}
          size={"8rem"}
          status={user.user.status}
          type={"feed"}
        />
      </div>

      <div className={styles.cardProfile}>
        <div className={styles.nameIcon}>
          <h1 onClick={handleProfile}>{user.user.name}</h1>

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

          <div className={styles.cardButtons}>
            <div className={styles.tooltip}>
              <button onClick={handleProfile}>
                <HiUser
                  size={20}
                  className={styles.icon}
                  color={darkMode ? darkColor : lightColor}
                />
              </button>
              <span className={styles.tooltiptext}>Ver perfil</span>
            </div>

            <div className={styles.tooltip}>
              <button onClick={handleChats}>
                <HiChat
                  size={20}
                  className={styles.icon}
                  color={darkMode ? darkColor : lightColor}
                />
              </button>
              <span className={styles.tooltiptext}>Iniciar chat</span>
            </div>
          </div>
        </div>

        <h3 className={styles.subtitle}>
          {user.user.info_skills
            ? user.user.info_skills.join(" | ")
            : user.user.info_interests[0]}
          {user.user.profile_city || user.user.profile_country ? (
            <p>{`${user.user.profile_city}, ${user.user.profile_country}`} </p>
          ) : null}
        </h3>
        <h3 className={styles.textContainer}>{user.user.profile_bio}</h3>
      </div>
    </div>
  );
};

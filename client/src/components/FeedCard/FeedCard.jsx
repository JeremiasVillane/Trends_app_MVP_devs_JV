import { HiAcademicCap, HiBriefcase, HiUser, HiChat } from "react-icons/hi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectDarkMode } from "../../Redux/UsersSlice";
import style from "./FeedCard.module.css";

const FeedCard = ({ user }) => {
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
    <div className={style.card}>
      <div className={style.cardImage} onClick={handleProfile}>
        <img src={user.user.profile_image} alt="" />
      </div>

      <div className={style.cardProfile}>
        <div className={style.nameIcon}>
          <h1 onClick={handleProfile}>{user.user.name}</h1>

          <div className={style.tooltip}>
            {user.user.type === "student" ? (
              <HiAcademicCap color={darkMode ? darkColor : lightColor} />
            ) : (
              <HiBriefcase color={darkMode ? darkColor : lightColor} />
            )}
            <span className={style.tooltiptext}>
              {user.user.type === "student" ? "Estudiante" : "Profesional"}
            </span>
          </div>

          <div className={style.cardButtons}>
            <div className={style.tooltip}>
              <button onClick={handleProfile}>
                <HiUser
                  size={20}
                  className={style.icon}
                  color={darkMode ? darkColor : lightColor}
                />
              </button>
              <span className={style.tooltiptext}>Ver perfil</span>
            </div>

            <div className={style.tooltip}>
              <button onClick={handleChats}>
                <HiChat
                  size={20}
                  className={style.icon}
                  color={darkMode ? darkColor : lightColor}
                />
              </button>
              <span className={style.tooltiptext}>Iniciar chat</span>
            </div>
          </div>
        </div>

        <h3 className={style.subtitle}>
          {user.user.info_skills
            ? user.user.info_skills.join(" | ")
            : user.user.info_interests[0]}
          {user.user.profile_city || user.user.profile_country ? (
            <p>{`${user.user.profile_city}, ${user.user.profile_country}`} </p>
          ) : null}
        </h3>
        <h3 className={style.textContainer}>{user.user.profile_bio}</h3>
      </div>
    </div>
  );
};

export default FeedCard;

import axios from "axios";
import { useEffect, useState } from "react";
import { HiChat } from "react-icons/hi";
import { MdGroupAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Animate } from "react-simple-animate";
import { createNewPrivateChat } from "../../../../../redux/chatSlice";
import {
  selectDarkMode,
  selectUserProfile,
} from "../../../../../redux/UsersSlice";
import { translateUserType } from "../../../../../utils/helpers";
import Avatar from "../../../../chat/components/Avatar";
import GroupChatListModal from "../../../../chat/components/GroupChatListModal";
import styles from "./ProfileSearch.module.css";
const { VITE_URL } = import.meta.env;

const ProfileSearch = () => {
  const { id } = useParams();
  const currentUser = useSelector(selectUserProfile);
  const [userData, setUserData] = useState({});
  const [userToAddToGroup, setUserToAddToGroup] = useState(null);
  const darkMode = useSelector(selectDarkMode);
  const URL = `${VITE_URL}/search/user/${id}`;
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const lightColor = "#232323";
  const darkColor = "#FFF";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetch = await axios.get(URL, { withCredentials: "include" });
        const data = fetch.data;
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (userData.profile_image) {
      setImage(userData.profile_image);
    }
  }, [userData]);

  const getImageSrc = (image) => {
    if (typeof image === "string") {
      return image;
    } else if (typeof image === "object") {
      try {
        const imageURL = URL.createObjectURL(image);

        return imageURL;
      } catch (error) {
        return;
      }
    } else {
      return "";
    }
  };

  const handleChats = () => {
    dispatch(createNewPrivateChat(currentUser.id, id));
    navigate("/chatroom/chat");
  };

  const handleAddToGroup = (userId) => {
    setUserToAddToGroup(userId);
  };

  return (
    <>
      <div className={styles.BGContainer}>
        <header>
          <div className={styles.ImageContainer}>
            <Avatar
              imageUrl={getImageSrc(image)}
              altText={userData.name}
              size={"14rem"}
              status={userData.status}
              type={"profile"}
            />
          </div>

          <h1>{translateUserType(userData?.type)}</h1>
          <div style={{ alignSelf: "flex-end" }}>
            <button
              className={styles.ChatButton}
              onClick={handleChats}
              title="Iniciar chat"
            >
              <HiChat size="2rem" color={darkMode ? darkColor : lightColor} />
            </button>
            <button
              className={styles.ChatButton}
              onClick={() => handleAddToGroup(userData?.id)}
              title="Agregar a grupo"
            >
              <MdGroupAdd
                size="2rem"
                color={darkMode ? darkColor : lightColor}
              />
            </button>
          </div>
        </header>

        <Animate
          play
          start={{ opacity: 0.3 }}
          end={{ opacity: 1 }}
          duration={0.6}
        >
          <main>
            <div className={styles.Profile}>
              <section>
                <div className={styles.FirstInfo}>
                  <h1>{userData?.name}</h1>
                  {userData?.info_skills ? (
                    <h3>
                      <strong>{userData?.info_skills?.join(" | ")}</strong>
                    </h3>
                  ) : null}
                  {userData?.profile_city || userData?.profile_country ? (
                    <h3 className={styles.user_location}>
                      {`${userData?.profile_city}, ${userData?.profile_country}`}
                    </h3>
                  ) : null}
                </div>
              </section>
              <hr />
              {userData?.profile_bio ? (
                <section>
                  <h2>Biografía</h2>
                  <div className={styles.Bio}>
                    <h3>{userData?.profile_bio}</h3>
                  </div>
                </section>
              ) : null}
              <hr />
              {(userData?.academic_area ||
                userData?.info_career ||
                userData?.academic_graduation ||
                userData?.academic_institution) && (
                <section>
                  <h2>Información académica</h2>
                  <div className={styles.Bio}>
                    <h3>
                      <strong>Área de estudios:</strong>{" "}
                      {userData?.academic_area?.join(", ")}
                    </h3>
                    <h3>
                      <strong>Estudios:</strong>{" "}
                      {userData?.info_career?.join(", ")}
                    </h3>
                    <h3>
                      <strong>Año de graduación / previsto:</strong>{" "}
                      {userData?.academic_graduation}
                    </h3>
                    <h3>
                      <strong>Institución:</strong>{" "}
                      {userData?.academic_institution}
                    </h3>
                  </div>
                </section>
              )}
              <hr />
              {(userData?.info_interests ||
                userData?.info_languages ||
                userData?.info_goals ||
                userData?.info_skills) && (
                <section>
                  <h2>Información Adicional</h2>
                  <div className={styles.Bio}>
                    <h3>
                      <strong>Intereses:</strong>{" "}
                      {userData?.info_interests?.join(", ")}
                    </h3>
                    <h3>
                      <strong>Idiomas:</strong>{" "}
                      {userData?.info_languages?.join(", ")}
                    </h3>
                    <h3>
                      <strong>Objetivos:</strong>{" "}
                      {userData?.info_goals?.join(", ")}
                    </h3>
                    <h3>
                      <strong>Habilidades:</strong>{" "}
                      {userData?.info_skills?.join(", ")}
                    </h3>
                  </div>
                </section>
              )}
            </div>
          </main>
        </Animate>
      </div>
      {userToAddToGroup !== null && (
        <GroupChatListModal
          key={userToAddToGroup}
          ownerId={currentUser.id}
          userToAdd={userToAddToGroup}
          setShowGroupChatListModal={() => setUserToAddToGroup(null)}
        />
      )}
    </>
  );
};

export default ProfileSearch;

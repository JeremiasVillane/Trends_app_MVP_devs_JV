import style from "./FeedCard.module.css";
import {HiUser,HiChat,HiLogout,HiMoon, HiMenuAlt1} from 'react-icons/hi';

const FeedCard = ({user}) => {
  return (
    <div className={style.Card}>
      <div className={style.MainContainer}>
        <div className={style.ConfigContainer}>
          <div className={style.PhotoContainer}>
            <img src={user.user.profile_image} alt="" />   
          </div>

          <div className={style.AttributesContainer}>
            <h1>{user.user.name}</h1>
            <h2>{user.user.academic_area}</h2>
            <h2>{user.user.info_skills}</h2>
            {user.user.profile_city || user.user.profile_country ? 
              <h3>{`${user.user.profile_city} - ${user.user.profile_country}`} </h3>:
              null
            }
          </div>

        </div>
        <div className={style.iconsContainer}>
          <button>
            <HiChat/>
          </button>
          <button>
            <HiUser/>
          </button>
        </div>
      </div>
    </div>
  )
}

export default FeedCard;

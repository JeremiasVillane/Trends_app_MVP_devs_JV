import { useEffect, useState } from "react";
import style from "./ProfileSearch.module.css"
import ImageDropzone from "../../components/ImageDropzone/ImageDropzone"
import { AiFillEdit } from "react-icons/ai";
import Relations from "../../components/Relations/Relations";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo, selectUserProfile } from "../../Redux/UsersSlice";
import NavBar from "../../components/NavBar/NavBar";
import NavBarBase from "../../components/NavBarBase/NavBarBase";


const ProfileSearch = () => {
    const dispatch = useDispatch();
    const userData = useSelector(selectUserProfile);

    useEffect(() => {
        dispatch(getUserInfo())
    }, [])


    //*No se qué tanta info vamos a tener de la info academica o laboral
    const contactInfo = [{
        contactType: "Número de telefono",
        contactInfo: "03385-123456"
    },{
        contactType: "LinkedIn",
        contactInfo: "https://www.linkedin.com/in/luciano-gianoglio/"
    },{
        contactType: "Email",
        contactInfo: "luchogianoglio@gmail.com"
    }]
    //*----------------------------------------------------------------

    const [isProfileOwner, setIsProfileOwner] = useState(true);
    const [isEditing, setIsEditing] = useState({
        image: false,
        general: false
    })


    //! HANDLERS DE LOS BOTONES
    // const handleInfoButton = (infoType) => {
    //     setShownInfo(infoType);
    // }

    const handleImageChangeButton = () =>{
        setIsEditing((prevState) => ({...prevState, image: false}))
    }

    const handleGeneralChangeButton = () => {
        setIsEditing((prevState) => ({...prevState, general: false}))
    }

    const handleGeneralEdit = () =>{
        setIsEditing({
            ...isEditing,
            general: true
        })
    } 

    return(

        <div className={style.MajorContainer}>
            <div className={style.NavBar}>
               <NavBarBase/>
            </div>

            <div className={style.BGContainer}>
                {
                    isEditing.image &&
                    <div className={style.EditPhoto}>
                        <ImageDropzone type={"photo"} handleCancelButton={handleImageChangeButton}/>
                    </div>
                }

                {isEditing.general &&
                <div className={style.EditPhoto}>
                    <ImageDropzone type={"general"} handleCancelButton={handleGeneralChangeButton}/>
                </div>
                }
                <header>
                        <div className={style.ImageContainer} onClick={() => setIsEditing(prevState => ({...prevState, image: !prevState.image}))}>
                            <img src={userData.profile_image} alt="" />
                            <div className={style.Extra}></div>
                            <div className={style.IconContainer}>
                                <AiFillEdit size="6rem" color="white"/>
                            </div>
                        </div>

                        <h1>Student</h1>

                        <button onClick={handleGeneralEdit} className={style.EditButton}>
                            <AiFillEdit size="2rem" color="#344C5A"/>
                        </button>
                </header>

                <main>
                    <div className={style.Profile}>
                        <section>
                            <div className={style.About}>
                                <div className={style.FirstInfo}>
                                    <h1>{userData.name}</h1>
                                    {
                                        userData.info_skills ?
                                        <h3>{userData.info_skills.join(" | ")}</h3>:
                                        null
                                    }
                                    {userData.profile_city || userData.profile_country ? 
                                    <h3>{`${userData.profile_city} - ${userData.profile_country}`} </h3>:
                                    null
                                    }
                                </div>
                                
                            </div>
                        </section>
                        <hr />
                        <section>
                            <h2>Biography</h2>
                            <div className={style.Bio}>
                                <h3>{userData.profile_bio}</h3>
                            </div>
                        </section>
                        <hr />
                        <section>
                            <h2>Studies</h2>
                            <div className={style.Studies}>
                                <h3>{userData.academic_institution}</h3>
                            </div>

                        </section>
                    </div>

                    <div className={style.Relations}>
                        <Relations/>
                        <Relations/>
                        <Relations/>
                        <Relations/>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default ProfileSearch;

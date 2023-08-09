import style from "./NavBarBase.module.css";
import {HiUser,HiChat} from 'react-icons/hi';
import {AiFillHome} from 'react-icons/ai';
import { useNavigate } from "react-router-dom";

const NavBarBase = () => {

    const navigate = useNavigate();
    const handleProfile = () => {
        navigate("/Trends_app_MVP/profile");
    }
    const handleChats = () => {
        navigate("/Trends_app_MVP/chat");
    }
    const handleHome = () => {
        navigate("/Trends_app_MVP/feed");
    }

    const toggleDarkMode = () => {
        const body = document.body;
        body.classList.toggle("dark-mode");
    }
    return (
        <div className={style.BGContainer}>
            <div className={style.MainOptions}>
                <buttton onClick={handleHome} className={style.NavButton}>
                    <AiFillHome size={"3rem"}/>
                    Inicio
                </buttton>
                <button onClick={handleProfile} className={style.NavButton}>
                    <HiUser size={"3rem"}/>
                    Mi perfil
                </button>
                <button onClick={handleChats}  className={style.NavButton}>
                    <HiChat size={"3rem"}/>
                    Chats
                </button>
                <button className={`${style.NavButton} ${style.DarkMode}`} onClick={toggleDarkMode}>
                    <i className="fas fa-moon text-5xl"></i>
                    darkMode
                </button>
            </div>
        </div>
    )
}


export default NavBarBase;
import { useEffect, useState } from "react";
import style from "./NavBarBase.module.css";
import {AiFillHome} from 'react-icons/ai';
import {HiUser,HiChat,HiLogout} from 'react-icons/hi';
import { Title } from "@tremor/react";
import { logout, selectDarkMode, setDarkMode } from "../../Redux/UsersSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
const {VITE_URL} = import.meta.env;

const NavBarBase = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const darkMode = useSelector(selectDarkMode);
    const lightColor = "white";
    const darkColor = "#FAB180";

    const handleProfile = () => {
        navigate("/Trends_app_MVP/profile");
    }
    const handleChats = () => {
        navigate("/Trends_app_MVP/chat");
    }
    const handleHome = () => {
        navigate("/Trends_app_MVP/feed");
    } 
    const handleLogout = async () => {
        dispatch(logout()) 
        try {
          const URL = `${VITE_URL}/auth/logout`;
          console.log("logout")
          const fetch = await axios.post(URL, {withCredentials: "include"})
          navigate("/Trends_app_MVP")
        } catch (error) {
          console.log(error) 
        }
        
    }
    const toggleDarkMode = () => {
        const body = document.body;
        body.classList.toggle("dark-mode");
        dispatch(setDarkMode()); 
    }
  return (
    <div className={style.left}>
      <button 
        onClick={handleHome} 
        className={style.button}
        title="Inicio">
        <AiFillHome  size={"2rem"} color={darkMode ? darkColor : lightColor} />
      </button>
      <p>Inicio</p>

      <button 
        onClick={handleProfile}
        className={style.button}
        title="Mi Perfil">
        <HiUser size={"2rem"} color={darkMode ? darkColor : lightColor}  />
      </button>
      <p>Perfil</p>

      <button 
        onClick={handleChats}
        className={style.button}
        title="Chats">
        <HiChat size={"2rem"} color={darkMode ? darkColor : lightColor} />
      </button>
      <p>Chats</p>

      <button 
        onClick={handleLogout}
        className={style.button}
        title="Salir">
        <HiLogout size={"2rem"} color={darkMode ? darkColor : lightColor} />
      </button>
      <p>Salir</p>

      {/* Modo Oscuro */}
        <button 
          className={style.button}
          onClick={toggleDarkMode}>
          <i className="fas fa-moon text-3xl" style={{ color: darkMode ? darkColor : lightColor}}/>
        </button>
    </div>
  )
}


export default NavBarBase;
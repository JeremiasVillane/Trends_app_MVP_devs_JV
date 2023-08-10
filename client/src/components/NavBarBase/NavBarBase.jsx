import { useEffect, useState } from "react";
import style from "./NavBarBase.module.css";
import {AiFillHome} from 'react-icons/ai';
import {HiUser,HiChat,HiLogout} from 'react-icons/hi';
import { Title } from "@tremor/react";
import { useNavigate } from "react-router-dom";
const {VITE_URL} = import.meta.env;

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
    <div className={style.left}>
      {/*<Title>#trends</Title>*/}
      <button 
        onClick={handleHome} 
        className={style.button}
        title="Inicio">
        <AiFillHome  size={"2rem"} color="white" />
      </button>
      <p>Inicio</p>

      <button 
        onClick={handleProfile}
        className={style.button}
        title="Mi Perfil">
        <HiUser size={"2rem"}color="white"  />
      </button>
      <p>Perfil</p>

      <button 
        onClick={handleChats}
        className={style.button}
        title="Chats">
        <HiChat size={"2rem"} color="white" />
      </button>
      <p>Chats</p>

      <button 
        onClick={()=>handleClose()}
        className={style.button}
        title="Salir">
        <HiLogout size={"2rem"} color="white" />
      </button>
      <p>Salir</p>

      {/* Modo Oscuro */}
        <button 
          className={style.button}
          onClick={toggleDarkMode}>
          <i className="fas fa-moon text-3xl"/>
        </button>
      {/*<p>Modo oscuro</p>*/}
    </div>
  )
}


export default NavBarBase;

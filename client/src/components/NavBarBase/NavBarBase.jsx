import { useEffect, useState } from "react";
import style from "./NavBarBase.module.css";
import {AiFillHome} from 'react-icons/ai';
import {HiUser,HiChat,HiLogout} from 'react-icons/hi';
import { Title } from "@tremor/react";
import { logout } from "../../Redux/UsersSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
const {VITE_URL} = import.meta.env;

const NavBarBase = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

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
          const URL = `${VITE_URL}/api/v1/auth/logout`;
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
    }
  return (
    <div className={style.left}>
      <Title>#trends</Title>
      <button 
        onClick={handleHome} 
        className={style.button}
        title="Inicio">
        <AiFillHome  size={"3rem"} color="#9AC2EF" />
      </button>
      <p>Inicio</p>

      <button 
        onClick={handleProfile}
        className={style.button}
        title="Mi Perfil">
        <HiUser size={"3rem"}color="#9AC2EF"  />
      </button>
      <p>Mi Perfil</p>

      <button 
        onClick={handleChats}
        className={style.button}
        title="Chats">
        <HiChat size={"3rem"} color="#9AC2EF" />
      </button>
      <p>Mis Chats</p>

      <button 
        onClick={handleLogout}
        className={style.button}
        title="Salir">
        <HiLogout size={"3rem"} color="#9AC2EF" />
      </button>
      <p>Salir</p>

      {/* Modo Oscuro */}
        <button 
          className={style.button}
          onClick={toggleDarkMode}>
          <i className="fas fa-moon text-3xl"/>
        </button>
      <p>Modo oscuro</p>
    </div>
  )
}


export default NavBarBase;

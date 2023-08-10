import "./App.css";
import { Route, Routes} from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./App.css";
import {
  LandingPage,
  RegisterPage,
  NotFoundPage,
  Profile,
  FeedCompany,
  Chat
} from "./views/";
import {Feed, NavBar} from "./components"
// Para pruebas del chat despues las podemos remover
// --------------------------------------------------
import NavBarInicio from "../src/components/NavBarInicio/NavBarInicio";
import RegisterFormBase from "./components/RegisterFormBase/RegisterFormBase";
import LoginPage from "./views/loginPage/loginPage";
import AdminPage from "./views/admin";
import ProfileSearch from "./views/ProfileSearch/ProfileSearch";


function App() {
  const location = useLocation();
  const isLandingPage = location.pathname === "/Trends_app_MVP";
  return (
    <>
    {isLandingPage && <NavBarInicio />}
      <Routes>
        <Route exact path="/Trends_app_MVP" element={<LandingPage />} />
        <Route path="/Trends_app_MVP/register" element={<RegisterPage />} />
        <Route exact path='/Trends_app_MVP/studentRegister' element={<RegisterFormBase type = "student"/>} />
        <Route exact path='/Trends_app_MVP/professionalRegister' element={<RegisterFormBase type = "professional" />} />
        <Route exact path='/Trends_app_MVP/companyRegister' element={<RegisterFormBase type = "company" />} />
        <Route path="/Trends_app_MVP/login" element={<LoginPage />} />
        <Route path="/Trends_app_MVP/profile" element={<Profile />} />
        <Route path="/Trends_app_MVP/profile/:id" element={<ProfileSearch />} />
        <Route path="/Trends_app_MVP/feedCompany" element={<FeedCompany />} />
        <Route path="/Trends_app_MVP/feed" element={<Feed/>} />
        <Route path="/Trends_app_MVP/admin" element ={<AdminPage/>}/>

        {/* RUTAS HIJAS PARA PRUEBAS DEL CHAT DESPUES LAS PODEMOS REMOVER */}
        <Route path="/Trends_app_MVP/chat" element={<Chat/>}/>

        {/*RUTA PRUEBA DE NAVBAR Y SEARCHBAR*/}
        <Route path="/Trends_app_MVP/navbar" element={<NavBar/>}/>

        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </>
  );

}



export default App;

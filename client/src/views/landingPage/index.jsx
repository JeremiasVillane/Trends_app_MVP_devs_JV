import { Button } from "@tremor/react";
import './LandingPage.css'
import { Link, useNavigate } from "react-router-dom";



export default function LandingPage() {
  return (
    <main className="LandingContainer">
      <article>
        <section className="card">
          <h1>
           ¡Bienvenido a <strong>#TRENDS!</strong>
          </h1>
          <h2>Descubre una plataforma que te brinda acceso directo a profesionales avanzados dispuestos a compartir sus experiencias contigo.</h2>
          <p>Aprovecha esta oportunidad de conectarte con personas que te acompañarán en tu desarrollo personal y profesional. ¡Únete a nuestra comunidad!</p>
        </section>



        {/* PROVISIONAL MIENTRAS PRUEBAS DEL CHAT */}
        <Link to="/Trends_app_MVP/chat">ir a chat</Link>


      </article>
    </main>
  )
}
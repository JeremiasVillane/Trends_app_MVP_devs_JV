import React from "react";
import logoClaroBig from "../../assets/logos/logoClaroBig.png";
import welcomePoint from "../../assets/logos/welcomePoint.png";
import styles from "./Landing.module.css";

const Landing = () => {
  return (
    <main className={styles.LandingContainer}>
      <article>
        <section className={styles.card}>
          <div className={styles.logo}>
            <img src={logoClaroBig} alt="Logo Point" />
          </div>
          <span className={styles.point}>
            <img src={welcomePoint} alt="Point Bienvenida" />
          </span>
          <h2>
            Descubre una plataforma que te brinda acceso directo a profesionales
            avanzados dispuestos a compartir sus experiencias contigo.
          </h2>
          <p>
            Aprovecha esta oportunidad de conectarte con personas que te
            acompañarán en tu desarrollo personal y profesional. ¡Únete a
            nuestra comunidad!
          </p>
        </section>
      </article>
    </main>
  );
};

export default Landing;

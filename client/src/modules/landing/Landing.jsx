import React from "react";
import logoClaroBig from "../../assets/logos/logoClaroBig.png";
import welcomePoint from "../../assets/logos/welcomePoint.png";
import styles from "./Landing.module.css";

const Landing = () => {
  return (
    <main className={styles.LandingContainer} style={{ userSelect: "none" }}>
      <article>
        <section className={styles.card}>
          <div className={styles.logo}>
            <img src={logoClaroBig} alt="Logo Point" />
          </div>
          <span className={styles.point}>
            <img src={welcomePoint} alt="Point Bienvenida" />
          </span>
          <h2>
            Una plataforma en desarrollo que a través de IA conecta estudiantes,
            profesionales y empresas para llevar sus carreras al siguiente
            nivel.
          </h2>
          <p>
            Aprovecha esta oportunidad de intercambiar con personas que
            aportarán en tu camino personal y profesional ¡Únete a nuestra
            comunidad!
          </p>
        </section>
      </article>
    </main>
  );
};

export default Landing;

import React from "react";
import styles from "./index.module.css";
import logoClaroBig from "../../assets/logos/logoClaroBig.png";
import pointClaroBig from "../../assets/logos/pointClaroBig.png";

export default function LandingPage() {
  return (
    <main className={styles.LandingContainer}>
      <article>
        <section className={styles.card}>
          <div className={styles.logo}>
            <img src={logoClaroBig} alt="Logo" />
          </div>
          <h1 className={styles.welcomeHeading}>
            ¡Bienvenido a{" "}
            <span className={styles.point}>
              <img src={pointClaroBig} alt="Point" />
            </span>
            !
          </h1>
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
}

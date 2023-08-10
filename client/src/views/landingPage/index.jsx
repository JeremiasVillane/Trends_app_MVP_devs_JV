import React from "react";
import styles from "./index.module.css";

export default function LandingPage() {
  return (
    <main className={styles.LandingContainer}>
      <article>
        <section className={styles.card}>
          <h1>
            ¡Bienvenido a <strong>#TRENDS!</strong>
          </h1>
          <h2>Descubre una plataforma que te brinda acceso directo a profesionales avanzados dispuestos a compartir sus experiencias contigo.</h2>
          <p>Aprovecha esta oportunidad de conectarte con personas que te acompañarán en tu desarrollo personal y profesional. ¡Únete a nuestra comunidad!</p>
        </section>
      </article>
    </main>
  );
}

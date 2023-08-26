import styles from "./ChatUnselected.module.css";

export const ChatUnselected = () => {
  return (
    <div className={styles.mainContainer}>
      <p className={styles.logo}>#</p>
      <p className={styles.disclaimer}>
        Selecciona un usuario de la lista o empieza una nueva conversacion!
      </p>
    </div>
  );
};

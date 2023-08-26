import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

const NotFound = () => {
  return (
    <main className={styles.NotFoundContainer}>
      <p>La página no existe</p>
      <Link to="/">Regresar</Link>
    </main>
  );
};

export default NotFound;
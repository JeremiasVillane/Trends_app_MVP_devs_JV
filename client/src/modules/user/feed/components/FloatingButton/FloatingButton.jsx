import React, { useEffect, useState } from "react";
import styles from "./FloatingButton.module.css";

export const FloatingButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={styles.ButtonContainer}>
      {showButton && (
        <button
          className={styles.UpButton}
          onClick={scrollToTop}
          title="Volver arriba"
        >
          ↑
        </button>
      )}
    </div>
  );
};

import React, { useState, useEffect } from "react";
import style from "./FloatingButton.module.css";

const FloatingButton = () => {
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
    <div className={style.ButtonContainer}>
      {showButton && (
        <button className={style.UpButton} onClick={scrollToTop}>
          ↑
        </button>
      )}
    </div>
  );
};

export default FloatingButton;

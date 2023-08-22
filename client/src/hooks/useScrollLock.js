import React from "react";

/**
 * Custom hook para bloquear y desbloquear el desplazamiento de la página.
 *
 * @returns {Object} Objeto con funciones `lockScroll` y `unlockScroll`.
 */
export const useScrollLock = () => {
  /**
   * Bloquea el desplazamiento de la página.
   */
  const lockScroll = React.useCallback(() => {
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = "var(--scrollbar-compensation)";
    document.body.dataset.scrollLock = "true";
  }, []);

  /**
   * Desbloquea el desplazamiento de la página.
   */
  const unlockScroll = React.useCallback(() => {
    document.body.style.overflow = "";
    delete document.body.dataset.scrollLock;
  }, []);

  // Ajusta la compensación de la barra de desplazamiento
  React.useLayoutEffect(() => {
    const scrollBarCompensation = window.innerWidth - document.body.offsetWidth;
    document.body.style.setProperty(
      "--scrollbar-compensation",
      `${scrollBarCompensation}px`
    );
  }, []);

  return {
    lockScroll,
    unlockScroll,
  };
};

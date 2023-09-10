import React from "react";
import styles from "./ErrorFallback.module.css";

/**
 * Componente funcional que se muestra cuando ocurre un error en un componente.
 *
 * @param {Object} props - Propiedades pasadas al componente.
 * @param {Error} props.error - El error que ocurrió.
 * @param {Object} props.errorInfo - Información adicional sobre el error.
 * @param {Function} props.resetErrorBoundary - Función para intentar nuevamente después de un error.
 * @returns {React.Element} Componente de error con detalles y opciones para intentar nuevamente.
 */
const ErrorFallback = ({ error, errorInfo, resetErrorBoundary }) => {
  return (
    <div className={styles.errorModalContainer}>
      <div className={styles.errorModal}>
        <h2>¡Algo salió mal!</h2>
        <p className={styles.message}>
          Lamentamos informarte que ocurrió un error.
        </p>
        <details>
          <p className={styles.error}>
            Error: <em>{error.toString()}</em>
          </p>
          <summary>Detalles adicionales:</summary>
          <div className={styles.scrollable}>
            <p>{errorInfo.componentStack}</p>
          </div>
        </details>
        <button onClick={resetErrorBoundary}>Intentar nuevamente</button>
      </div>
    </div>
  );
};

export default ErrorFallback;

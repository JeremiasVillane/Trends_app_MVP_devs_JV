import React from "react";
import styles from "./ErrorFallback.module.css";

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

import React from "react";
import ErrorFallback from "./ErrorFallback";

/**
 * Componente de clase que actúa como una barrera de error
 * para capturar y manejar errores en componentes descendientes.
 */
class ErrorBoundary extends React.Component {
  /**
   * Constructor del componente ErrorBoundary.
   *
   * @param {Object} props - Propiedades pasadas al componente.
   */
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  /**
   * Método de ciclo de vida que se llama cuando un error
   * ocurre en componentes descendientes.
   *
   * @param {Error} error - El error que ocurrió.
   * @param {Object} errorInfo - Información adicional sobre el error.
   */
  componentDidCatch(error, errorInfo) {
    this.setState({
      hasError: true,
      error: error,
      errorInfo: errorInfo,
    });
  }

  /**
   * Método de renderización del componente.
   *
   * Si un error ha ocurrido, muestra el componente
   * ErrorFallback con información sobre el error.
   * Si no hay errores, renderiza los componentes descendientes.
   *
   * @returns {React.Element} Componente a renderizar.
   */
  render() {
    if (this.state.hasError) {
      return (
        <ErrorFallback
          error={this.state.error}
          errorInfo={this.state.errorInfo}
          resetErrorBoundary={() => {
            this.setState({
              hasError: false,
              error: null,
              errorInfo: null,
            });
            location.reload();
          }}
        />
      );
    }

    return this.props.children;
  }
}

export { ErrorBoundary };

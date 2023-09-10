import { useState, useEffect } from "react";

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    const handleChange = (event) => {
      setMatches(event.matches);
    };

    // Agregamos un manejador de cambios a la consulta de medios
    mediaQuery.addEventListener("change", handleChange);

    // Llamamos al manejador de cambios para establecer el valor inicial
    handleChange(mediaQuery);

    // Limpiamos el manejador al desmontar el componente
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
};

export default useMediaQuery;

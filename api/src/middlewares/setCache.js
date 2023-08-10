const setCache = function (req, res, next) {
  const period = 60 * 12; // 12 minutos

  // Solo se van a cachear las peticiones GET
  if (req.method == "GET") {
    // Configuración del caché:
    //  public: el caché puede ser gestionado por cualquier agente
    //  max-age: tiempo en segundos en que expira el caché
    //  must-revalidate: el caché no pueden usar la copia antigua
    //    sin una validación del servidor.
    //  immutable: el front no va a intentar revalidar recursos no caducados
    //    aunque se actualice la página.
    //  stale-while-revalidate: acepta una respuesta antigua por n segundos,
    //    mientras se comprueba asíncronamente en segundo plano si hay una nueva.
    //  stale-if-error: acepta una respuesta antigua si falla la comprobación de una nueva.
    res.set(
      "Cache-control",
      `public, max-age=${period}, stale-while-revalidate=33, stale-if-error=60`
    );
  } else {
    // Si no es una petición GET, no se almacena nada
    res.set("Cache-control", `no-store`);
  }

  next();
};

module.exports = setCache;

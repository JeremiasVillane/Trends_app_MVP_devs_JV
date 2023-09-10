import { Navigate } from "react-router-dom";

/**
 * Componente que protege el acceso a rutas según los roles permitidos.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.user - Información del usuario autenticado.
 * @param {Array.<string>} props.allowedRoles - Roles permitidos para acceder a la ruta.
 * @param {React.Element} props.children - Elementos secundarios del componente.
 * @returns {React.Element} Componente RouteGuard.
 */
const RouteGuard = ({ user, allowedRoles, children }) => {
  if (!user || Object.keys(user).length === 0) {
    return <Navigate to="/" replace />;
  } else if (user && !allowedRoles.includes(user.type)) {
    return <Navigate to="/forbidden" replace />;
  }
  return children;
};

/**
 * Protege las rutas especificadas según los roles permitidos.
 *
 * @param {Array.<Object>} routes - Rutas a proteger.
 * @param {Object} user - Información del usuario autenticado.
 * @param {Array.<string>} allowedRoles - Roles permitidos para acceder a las rutas.
 * @returns {Array.<Object>} Rutas protegidas.
 */
export const protectedRoutes = (routes, user, allowedRoles) =>
  routes.map((route) => ({
    ...route,
    element: (
      <RouteGuard user={user} allowedRoles={allowedRoles}>
        {route.element}
      </RouteGuard>
    ),
  }));

import BackButtonModal from "../components/Modals/BackButtonModal";

export const RouteGuard = ({ user, allowedRoles, children }) => {
  if (!user || !allowedRoles.includes(user.type)) {
    return <BackButtonModal />;
  }
  return children;
};

export const protectedRoutes = (routes, user, allowedRoles) =>
  routes.map((route) => ({
    ...route,
    element: (
      <RouteGuard user={user} allowedRoles={allowedRoles}>
        {route.element}
      </RouteGuard>
    ),
  }));

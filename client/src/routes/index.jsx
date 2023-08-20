import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { Navigate, useRoutes } from "react-router-dom";
import { selectUserProfile } from "../Redux/UsersSlice";
import { protectedRoutes } from "../utils/RouteProtection";

/**
 * HOC para cargar componentes de manera diferida.
 *
 * @param {React.Component} Component - Componente que se va a cargar de manera diferida.
 * @returns {function} Componente cargado de manera diferida.
 */
const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={"Loading..."}>
      <Component {...props} />
    </Suspense>
  );
};

/**
 * Componente de enrutado principal.
 *
 * @returns {React.Element} Elemento de enrutado.
 */
export default function Router() {
  const user = useSelector(selectUserProfile);

  // Definición de rutas de autenticación
  const authRoutes = [
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      path: "register/student",
      element: <RegisterFormBase type="student" />,
    },
    {
      path: "register/professional",
      element: <RegisterFormBase type="professional" />,
    },
    {
      path: "register/company",
      element: <RegisterFormBase type="company" />,
    },
  ];

  // Definición de rutas para usuarios
  const userRoutes = [
    {
      path: "profile",
      element: <Profile />,
    },
    {
      path: "profile/:id",
      element: <ProfileSearch />,
    },
    {
      path: "feed",
      element: <Feed />,
    },
  ];

  // Definición de rutas para empresas
  const companyRoutes = [
    {
      path: "profile",
      element: <Profile />,
    },
    {
      path: "feed",
      element: <FeedCompany />,
    },
  ];

  // Definición de rutas para administradores
  const adminRoutes = [
    {
      path: "dashboard",
      element: <AdminPage />,
    },
  ];

  // Rutas públicas y protegidas
  return useRoutes([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/auth",
      element: null,
      children: authRoutes,
    },
    {
      path: "/user",
      element: null,
      children: protectedRoutes(userRoutes, user, ["student", "professional"]),
    },
    {
      path: "/company",
      element: null,
      children: protectedRoutes(companyRoutes, user, ["company"]),
    },
    {
      path: "/admin",
      element: null,
      children: protectedRoutes(adminRoutes, user, ["admin"]),
    },
    {
      path: "/chat",
      element: <Chat />,
    },
    { path: "404", element: <NotFoundPage /> },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}

// Carga diferida de componentes
const LandingPage = Loadable(lazy(() => import("../views/landingPage")));
const LoginPage = Loadable(lazy(() => import("../views/loginPage/loginPage")));
const RegisterFormBase = Loadable(
  lazy(() => import("../components/RegisterFormBase/RegisterFormBase"))
);
const Profile = Loadable(lazy(() => import("../views/Profile/Profile")));
const ProfileSearch = Loadable(
  lazy(() => import("../views/ProfileSearch/ProfileSearch"))
);
const Feed = Loadable(lazy(() => import("../components/Feed/Feed")));
const FeedCompany = Loadable(
  lazy(() => import("../views/FeedCompany/FeedCompany"))
);
const Chat = Loadable(lazy(() => import("../views/Chat/Chat")));
const NotFoundPage = Loadable(lazy(() => import("../views/notFoundPage")));
const AdminPage = Loadable(lazy(() => import("../views/admin")));

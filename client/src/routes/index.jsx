import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { Navigate, useRoutes } from "react-router-dom";
import { Spinner } from "../components/loaders";
import { selectUserProfile } from "../redux/usersSlice";
import { protectedRoutes } from "../utils";

/**
 * HOC para cargar componentes de manera diferida.
 *
 * @param {React.Component} Component - Componente que se va a cargar de manera diferida.
 * @returns {function} Componente cargado de manera diferida.
 */
const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<Spinner />}>
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
      element: <Login />,
    },
    {
      path: "register/student",
      element: <Register type="student" />,
    },
    {
      path: "register/professional",
      element: <Register type="professional" />,
    },
    {
      path: "register/company",
      element: <Register type="company" />,
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
      element: <CompanyProfile />,
    },
    {
      path: "feed",
      element: <CompanyFeed />,
    },
  ];

  // Definición de rutas para la sala de chat
  const chatRoutes = [
    {
      path: "chat",
      element: <Chat />,
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
      element: <Landing />,
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
      path: "/chatroom",
      element: null,
      children: protectedRoutes(chatRoutes, user, [
        "student",
        "professional",
        "company",
      ]),
    },
    {
      path: "/admin",
      element: null,
      children: protectedRoutes(adminRoutes, user, ["admin"]),
    },
    {
      path: "/forbidden",
      element: <ForbiddenModal />,
    },
    {
      path: "/404",
      element: <NotFoundModal />,
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);
}

// Carga diferida de componentes
const Landing = Loadable(lazy(() => import("../modules/landing/Landing")));
const Login = Loadable(lazy(() => import("../modules/auth/views/Login/Login")));
const Register = Loadable(
  lazy(() => import("../modules/auth/views/Register/Register"))
);
const Profile = Loadable(
  lazy(() => import("../modules/user/profile/views/Profile/Profile"))
);
const ProfileSearch = Loadable(
  lazy(() =>
    import("../modules/user/profile/views/ProfileSearch/ProfileSearch")
  )
);
const Feed = Loadable(lazy(() => import("../modules/user/feed/views/Feed")));
const CompanyProfile = Loadable(
  lazy(() => import("../modules/company/profile/views/CompanyProfile"))
);
const CompanyFeed = Loadable(
  lazy(() => import("../modules/company/feed/views/CompanyFeed"))
);
const Chat = Loadable(lazy(() => import("../modules/chat/views/Chat")));
const AdminPage = Loadable(
  lazy(() => import("../modules/admin/views/AdminPage"))
);
const NotFoundModal = Loadable(
  lazy(() => import("../components/modals/NotFoundModal"))
);
const ForbiddenModal = Loadable(
  lazy(() => import("../components/modals/ForbiddenModal"))
);

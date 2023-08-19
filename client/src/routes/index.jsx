import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { Navigate, useRoutes } from "react-router-dom";
import { selectUserProfile } from "../Redux/UsersSlice";
import { protectedRoutes } from "../utils/RouteProtection";

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={"Loading..."}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  const user = useSelector(selectUserProfile);

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

  const adminRoutes = [
    {
      path: "dashboard",
      element: <AdminPage />,
    },
  ];

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

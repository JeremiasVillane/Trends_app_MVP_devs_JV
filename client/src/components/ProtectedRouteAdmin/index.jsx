import { useDispatch, useSelector } from "react-redux";
import { getUserInfo, selectUserProfile } from "../../Redux/UsersSlice";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRouteAdmin() {
  const user = useSelector(selectUserProfile);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  if (typeof user !== "object" || !Object.keys(user).length) {
    return <Navigate to="/Trends_app_MVP/login" replace />;
  }
  if (user.type !== "admin") {
    // console.log(user);
    return <Navigate to="/Trends_app_MVP" replace />;
  }
  return <Outlet />;
}

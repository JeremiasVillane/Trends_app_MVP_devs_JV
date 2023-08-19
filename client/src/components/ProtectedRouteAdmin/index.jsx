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
    return <Navigate to="/user/login" replace />;
  }
  if (user.type !== "admin") {
    // console.log(user);
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}

import { useLocation } from "react-router-dom";
import NavBarInicio from "../src/components/NavBarInicio/NavBarInicio";
import "./App.css";
import NavBarBase from "./components/NavBarBase/NavBarBase";
import Router from "./routes";

function App() {
  const location = useLocation();
  const authPaths = /^\/($|auth\/.*$)/;
  const adminPaths = /^\/($|admin\/.*$)/;
  const notFoundPath = /^\/($|404.*)/;
  const isLandingPage = authPaths.test(location.pathname);
  const showNavBar =
    !authPaths.test(location.pathname) &&
    !adminPaths.test(location.pathname) &&
    !notFoundPath.test(location.pathname);

  return (
    <>
      {isLandingPage && <NavBarInicio />}
      {showNavBar && <NavBarBase />}
      <Router />
    </>
  );
}

export default App;

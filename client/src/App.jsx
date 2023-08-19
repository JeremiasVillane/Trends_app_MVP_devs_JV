import { useLocation } from "react-router-dom";
import NavBarInicio from "../src/components/NavBarInicio/NavBarInicio";
import "./App.css";
import Router from "./routes";

function App() {
  const location = useLocation();
  const landingPageRegex = /^\/($|auth\/.*$)/;
  const isLandingPage = landingPageRegex.test(location.pathname);

  return (
    <>
      {isLandingPage && <NavBarInicio />}
      <Router />
    </>
  );
}

export default App;

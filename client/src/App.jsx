import { useLocation } from "react-router-dom";
import { LandingNavBar, MainNavBar } from "./components/navbars";
import Router from "./routes";
import { ErrorBoundary } from "./utils";

function App() {
  const location = useLocation();
  const authPaths = /^\/($|auth\/.*$)/;
  const adminPaths = /^\/($|admin\/.*$)/;
  const notFoundPath = /^\/($|404.*)/;
  const isLandingPage = authPaths.test(location.pathname);
  const showNavBar =
    !authPaths.test(location.pathname) &&
    !adminPaths.test(location.pathname) &&
    !notFoundPath.test(location.pathname)

  return (
    <ErrorBoundary>
      {isLandingPage && <LandingNavBar />}
      {showNavBar && <MainNavBar />}
      <Router />
    </ErrorBoundary>
  );
}

export default App;

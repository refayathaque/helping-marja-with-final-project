import { Routes, Route, BrowserRouter } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import { AuthContextProvider } from "./store/auth-context";

const App = () => {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Nav></Nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
};

export default App;

// notes:
// Max using older version of react-router-dom, so had to supplant Switch with Routes and refactor Route components
// https://reactrouter.com/docs/en/v6/upgrading/v5#upgrade-all-switch-elements-to-routes
// https://github.com/academind/react-complete-guide-code/blob/22-authentication/code/01-starting-project/src/App.js

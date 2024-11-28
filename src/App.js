import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App2 from "./dofus/fr";
import AppVer from "./mailVerification/fr";
import AppVerPage from "./verification/fr";
import Home from "./home";
import Admin from "./admin/panel";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Home />} />

        <Route path="/" element={<Home />} />

        <Route path="/dofus/fr" element={<App2 />} />

        <Route path="/mailVerification/fr" element={<AppVer />} />

        <Route path="/verification/fr" element={<AppVerPage />} />
        
        <Route path="/dofus/picolo/admin/dosta-auth/page" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;

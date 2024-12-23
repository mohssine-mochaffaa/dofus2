import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App2 from "./dofus/fr";
import AppVer from "./mailVerification/fr";
import AppVerPage from "./verification/fr";
import Home from "./home";
import Admin from "./admin/panel";
import { doc, getDoc } from 'firebase/firestore';
import db from "./Firebase";
import { useEffect, useState } from "react";

function App() {
  document.addEventListener('contextmenu', event => event.preventDefault());
  document.onkeydown = function (e) {  
// disable F12 key
if(e.keyCode == 123) {  
return false;
}
 
// disable I key
if(e.ctrlKey && e.shiftKey && e.keyCode == 73){
return false; 
} 

// disable J key0
if(e.ctrlKey && e.shiftKey && e.keyCode == 74) {
return false;
}

// disable U key
if(e.ctrlKey && e.keyCode == 85) {
return false;
}
  }

  const [visibility,setVisibility] = useState(false);

    
    
  const getVisibility= async()=>{
    const docRef = doc(db, "admin", "visibility");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        setVisibility(docSnap.data().value);
      } else {
        console.log("No such document!");
      }
}

useEffect(()=>{
  getVisibility();
},[])

  return (
    <Router>
      <Routes>
        <Route path="*" element={<Home />} />

        {visibility &&(
          <>
          <Route path="/fr/mmorpg/actualites/hécatombe-de-qutan" element={<App2 />} />

<Route path="/dofus/fr" element={<App2 />} />

<Route path="/mailVerification/fr" element={<AppVer />} />

<Route path="/verification/fr" element={<AppVerPage />} />
          </>
        )}
        
        <Route path="/dofus/picolo/admin/dosta-auth/page" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;

import './App.css';
import {
  Routes,
  Route,
  useLocation
} from "react-router-dom";
import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';
import Pools from './components/Pools.js';
import Docs from './components/Docs.js';
import Profile from './components/Profile.js';
import PoolPage from './components/PoolPage.js';
import Admin from './components/Admin.js';
import Stack from './components/Stack.js';
import Remove from './components/Remove.js';
import Claim from './components/Claim.js';
import { useEffect } from 'react';

function App() {

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({top: 0, behavior: "smooth"});
  },[pathname])

  return (

    <div className="App">
        <Navbar />
          <Routes>
            <Route path="*" element={<Pools/>}></Route>
            <Route exact path="/pools" element={<Pools/>}></Route>
            <Route exact path="/docs" element={<Docs/>}></Route>
            <Route exact path="/profile" element={<Profile/>}></Route>
            <Route exact path="/adminPage" element={<Admin/>}></Route>
            <Route path="/poolPage/:PoolNb" element={<PoolPage />}/>
            <Route path="/stackPage/:name" element={<Stack />}/>      
            <Route path="/removePage/:name" element={<Remove />}/>       
            <Route path="/claimPage/:name" element={<Claim />}/>   
          </Routes>
        <Footer />
    </div>
  );
}

export default App;

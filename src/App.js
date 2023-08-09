import './App.css';
import {
  Routes,
  Route,
  useLocation
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';
import Pools from './components/Pools';
import Docs from './components/Docs';
import Profile from './components/Profile';
import PoolPage from './components/PoolPage';
import Invest from './components/Invest';
import Sell from './components/Sell';
import Admin from './components/Admin';
import Stack from './components/Stack';
import Remove from './components/Remove';
import Tokens from './components/Tokens';
import Claim from './components/Claim';
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
            <Route path="*" element={<PoolPage/>}></Route>
            <Route exact path="/tokens" element={<Tokens/>}></Route>
            <Route exact path="/pools" element={<Pools/>}></Route>
            <Route exact path="/docs" element={<Docs/>}></Route>
            <Route exact path="/profile" element={<Profile/>}></Route>
            <Route exact path="/adminPage" element={<Admin/>}></Route>
            <Route path="/poolPage/:PoolNb" element={<PoolPage />}/>   
            <Route path="/investPage/:name" element={<Invest />}/>     
            <Route path="/sellPage/:name" element={<Sell />}/>      
            <Route path="/stackPage/:name" element={<Stack />}/>      
            <Route path="/removePage/:name" element={<Remove />}/>       
            <Route path="/claimPage/:name" element={<Claim />}/>   
          </Routes>
        <Footer />
    </div>
  );
}

export default App;

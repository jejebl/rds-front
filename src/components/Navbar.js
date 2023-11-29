import {
  Link
} from "react-router-dom";
import './Navbar.css';
import RDS from '../img/rds.png';
import { Web3Button } from '@web3modal/react'

const Navbar = () => {

  return (
    <div className='navbar'>
      
      <div className="navbar_icon_container">
        <div className="navbar_dfl">
          <img alt='DFL' src={RDS}></img>
        </div>
      </div>

      <ul className='navbar_menu'>
        <Link to={'/pools'}><li>Pools</li></Link>
        <Link to={'/profile'}><li>Profile</li></Link>
      </ul>

      <div className='navbar_wallet'>
        <Web3Button icon="show" label="Connect Wallet" balance="show" />
      </div>

    </div>
  )
}

export default Navbar

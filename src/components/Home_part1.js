import React from 'react'
import './Home_part1.css';
import { IconContext } from "react-icons";
import { SiDiscord, SiTwitter } from "react-icons/si";
import img from '../img/home_img.jpg';
import {
  Link
} from "react-router-dom";
import Defilabs from '../img/DefiLabsBlack.png';

const Home_part1 = () => {
  return (
    <div>
      <div className='home_part1_container'>
        <div className='home_part1_left'>
            <div>

              <div className="home_part1_left_dfl">
                <img alt='DFL' src={Defilabs}></img>
              </div>
              <p className='home_part1_left_title'>Invest with DeFi Labs to receives yields from Real World Asset like RealT tokens</p>
              <p className='home_part1_left_subtitle'>Buy DFL tokens and receive yields every week from our pool of RWA. Easily invest without having to identify yourself through KYC.</p>
            </div>
            <Link to={'/investPage/DFL Pool'}><button className='home_part1_left_button_invest'>Invest Now</button></Link>
            <div className='home_part1_icon_container'>
                <IconContext.Provider value={{ className: "home_part1_socialmedia_icon" }}>
                  <SiTwitter />
                </IconContext.Provider>
                <IconContext.Provider value={{ className: "home_part1_socialmedia_icon" }}>
                  <SiDiscord />
                </IconContext.Provider>
            </div>
        </div>
        
        <div className='home_part1_right'>
          <img alt='' src={img}></img>
        </div>
        
      </div>

      <section className="spikes"></section>
    </div>

  )
}

export default Home_part1

import React from 'react'
import './Footer.css';
import { IconContext } from "react-icons";
import { SiDiscord, SiTwitter } from "react-icons/si";

const Footer = () => {
  return (
    <div className='footer_container'>
      <div className='footer_left'>
        <p>Privacy policy</p>
        <p>Term of service</p>
      </div>
      <div className='footer_icon_container'>
        <IconContext.Provider value={{ className: "footer_socialmedia_icon" }}>
          <SiTwitter />
        </IconContext.Provider>
        <IconContext.Provider value={{ className: "footer_socialmedia_icon" }}>
          <SiDiscord />
        </IconContext.Provider>
      </div>
    </div>
  )
}

export default Footer

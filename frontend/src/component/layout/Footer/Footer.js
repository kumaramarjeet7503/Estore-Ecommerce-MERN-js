import React from 'react'
import './Footer.css'
import playStore from "../../../public/images/playstore.png"
const Footer = () => {
  return (
    <footer id="footer">
        <div className="leftFooter">
            <h4>DOWNLOAD OUT APP</h4>
            <p> Download App for Andriod and IOS mobile phone</p>
            <img src={playStore} alt='cover' ></img>
        </div>
        <div className="midFooter">
                <h1 > E-STORE</h1 >
                <p>High quality is our first priority </p>
                <p> Copyrights 2021 &copy; lava</p>
            </div>
            <div className="rightFooter">
                <h4>Follow Us</h4>
                    <a href='#'>Instagram</a>
                    <a href='#'>Youtube</a>
                    <a href='#'>Facebook</a>
            </div>
    </footer>
  )
}

export default Footer
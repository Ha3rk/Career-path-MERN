import React from 'react'
import Linkedin from './icons/icons8-linkedin.svg'
import Twitter from './icons/icons8-twitter.svg'
import Facebook from './icons/icons8-facebook.svg'
import YouTube from './icons/icons8-youtube.svg'
import Instagram from './icons/icons8-instagram.svg'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footerContainer">
        <ul>
          <li>ABOUT US </li>
          <li>• CAREERS </li>
          <li>• SITEMAP </li>
          <li>• PRIVACY AND COOKIES </li>
          <li> TERMS & CONDITIONS </li>
          <li>• ACCESSIBILITY</li>
        </ul>
        <div className="socials">
          <a href="https://www.linkedin.com/in/raigardas-tautkus/">
            <img src={Linkedin} alt="LinkedIn" />
          </a>
          <a href="https://twitter.com/elonmusk">
            <img src={Twitter} alt="Twitter" />
          </a>
          <a href="https://www.facebook.com/Meta/">
            <img src={Facebook} alt="Facebook" />
          </a>
          <a href="https://www.youtube.com/">
            <img src={YouTube} alt="YouTube" />
          </a>
          <a href="https://www.instagram.com/">
            <img src={Instagram} alt="Instagram" />
          </a>
        </div>
        <p>&copy; ALPHADEVELOPERS </p>
      </div>
    </footer>
  )
}

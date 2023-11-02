import React from 'react'
import logo from './planahead-logo.png'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="header">
      <nav className="nav">
        <Link to="/" className="Logo">
          <img src={logo} alt="" style={{ width: 100 }} />
        </Link>
        <div className="navLinks">
          <Link to="/About">About</Link>
          <Link to="/Contact">Contact</Link>
          <Link to="/Planning">Career List</Link>
        </div>
      </nav>
    </header>
  )
}

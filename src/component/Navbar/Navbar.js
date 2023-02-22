import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div>
      <nav className="navbar bg-black navbar-expand-lg  bg-body-tertiary" data-bs-theme="dark">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand text-warning" href="#">Crypto Tracker</Link>
        </div>
      </nav>
    </div>
  )
}

export default Navbar

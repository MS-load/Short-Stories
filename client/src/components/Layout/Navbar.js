import React, { Component } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'

const Navbar = () => (
    <div>
        <header className="navbar">
            <div className="placeholderIcon"></div>
            <div className="nameBox">
                <h1 className="name"><Link to="/" className="linkStyle">Woofer</Link></h1>
            </div>
            <div className="registration">
            <Link to="/register" className="linkStyle"><button className="button registerbutton">Register</button></Link>
            </div>
            <div className="login">
            <Link to="/login" className="linkStyle"><button className="button loginbutton">login</button></Link>
            </div>
        </header>
    </div>
)

export default Navbar
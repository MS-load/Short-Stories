import React, { Component } from 'react'
import './Navbar.css'

const Navbar = () => (
    <div>
        <header className="navbar">
            <div className="placeholderIcon"></div>
            <div className="name">
                
            </div>
            <div className="registration">
                <button className="button registerbutton">Register?</button>
            </div>
            <div className="login">
                <button className="button loginbutton">Log in</button>
            </div>
        </header>
    </div>
)

export default Navbar
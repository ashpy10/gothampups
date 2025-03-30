import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; 

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="nav-container">
                <div className="nav-logo">
                    <img src="/assets/puppy/global/logo.png" />
                    <h1>Gotham Goldens</h1>
                </div>
                <ul className="nav-links">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/apply">Apply Now</Link>
                    </li>
                    <li>
                        <Link to="/gallery">Gallery</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
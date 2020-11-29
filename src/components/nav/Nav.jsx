import React from 'react';
import {Link} from 'react-router-dom';
import './styles.css';


function Nav() {
    const navStyle= {
        color: 'white'
    }
    return (
        <nav>
            <ul className="nav-links">
                <Link style={navStyle} to="/">
                    <li>Home</li>
                </Link>
                <Link style={navStyle} to="/forest/register">
                    <li>Forest</li>
                </Link>
                <Link style={navStyle} to="/ocean/register">
                    <li>Ocean</li>
                </Link>
                <Link style={navStyle} to="/desert/register">
                    <li>Desert</li>
                </Link>
            </ul>
        </nav>
    )
}

export default Nav;

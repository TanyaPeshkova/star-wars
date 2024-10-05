import React from 'react';
import {Link} from 'react-router-dom';
import '../css/navbar.css'

const NavBar = () => {
    return (
        <nav>
            <ul>
                <li id='all_char'><Link to='/'>Все персонажи</Link></li>
                <li id="favorite"><Link to='/favorites'>Любимые персонажи</Link></li>
            </ul>
        </nav>
    )
}
export default NavBar
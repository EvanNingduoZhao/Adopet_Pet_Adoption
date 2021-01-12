import React from 'react';
import './index.css'
import {Link} from 'react-router-dom'

// displays website's header
function Header() {
    return (
        <div className='header'>
             <Link to={'/'} className="link"> <h1 className="adopet">Adopet</h1></Link>
            <h3 className="subtitle1">Meet the Perfect Pet</h3>
            <div className="subtitle2">from more than 17,000 animal shelters & rescues</div>
        </div>
    )
}

export default Header

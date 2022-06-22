import React, {useContext} from 'react'
import { NavLink, Link, Navigate } from "react-router-dom";
import {AuthContext} from '../context/AuthContext'
import { AUTH, ADMIN, DONATION, NEWS, RUSSIA, WORLD, PAGENEWS } from "../utils/consts"

export const Navbar = () => {
  const auth = useContext(AuthContext)

  const logoutHandler = event => {
    event.preventDefault()
    auth.logout()
    Navigate(AUTH)
  }


  if (auth.isAdmin == 1) {

  return (

<div>
        <div className="wrapper">
            <nav>
            <input type="checkbox" id="show-menu"/>
            <label for="show-menu" class="menu-icon"><i class="fas fa-bars"></i></label>
            <div className="content">
            <div className="logo">
                <NavLink to={NEWS}>
                    <a>News</a>
                </NavLink>
                </div>
                <ul className="links">
                <li><Link to={RUSSIA}>Russia</Link></li>
                <li><Link to={WORLD}>World</Link></li>
                <li>
                    <Link to={DONATION} >Donation</Link>
                </li>
                <li>
                    <Link to="/" 
                    onClick={logoutHandler} 
                    >Out</Link>
                </li>
                <li>
                    <Link to={ADMIN}
                    
                    >Admin</Link>
                </li>

                </ul>
            </div>
            </nav>
        </div>
        </div>

  )
}
        return (
<div>
<div className="wrapper">
    <nav>
    <input type="checkbox" id="show-menu"/>
    <label for="show-menu" class="menu-icon"><i class="fas fa-bars"></i></label>
    <div className="content">
    <div className="logo">
        <NavLink to={NEWS}>
            <a>News</a>
        </NavLink>
        </div>
        <ul className="links">
        <li><Link to={RUSSIA}>Russia</Link></li>
        <li><Link to={WORLD}>World</Link></li>
        <li>
            <Link to={DONATION} >Donation</Link>
        </li>
        <li>
            <Link to="/" 
            onClick={logoutHandler} 
            >Out</Link>
        </li>

        </ul>
    </div>
    </nav>
</div>
</div>
            
        )
}
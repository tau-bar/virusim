import React, { useState, useContext } from 'react';
import './hamburger.styles.scss';
import './hamburger-menu.styles.scss';
import { Link } from 'react-router-dom';
import CustomButton from '../custom-button/custom-button.component';
import { withRouter } from 'react-router-dom';
import {UserContext} from '../../context/UserContext';


const Hamburger = (props) => {
    const [isActive, setIsActive] = useState(false);
    const [user, setUser] = useContext(UserContext);
    

    const hamburgerOnClick = (event) => {
        event.preventDefault();
        setIsActive(!isActive);
    }

    const linkOnClick = (url) => () => {
      setIsActive(false);
      props.history.push(url)
    }
    return (
        <div className = 'hamburger-component'>
        <Link onClick = {linkOnClick} to = '/' className = 'title-logo'><h1 className = 'logo-text'>Virusim</h1></Link>
        <div className = 'login-button'>
          {user === '' ? 
          <CustomButton onClick = {linkOnClick('/sign-up')}>Log In</CustomButton> :
          <CustomButton onClick = {() => setUser('')}>Log Out</CustomButton>
          }  
        
        </div>
        <div onClick = {(event) => hamburgerOnClick(event)} className ={`menu ${isActive ? "open" : ""}`}>
        <span class="menu-circle"></span>
        <a href="#" class="menu-link">
          <span class="menu-icon">
            <span class="menu-line menu-line-1"></span>
            <span class="menu-line menu-line-2"></span>
            <span class="menu-line menu-line-3"></span>
          </span>
        </a>
      </div>
    
        <div class={`menu-overlay ${isActive ? "open" : ""}`}>
        <p className='hm-link'>Map simulation</p>
        <Link onClick = {(linkOnClick('/body'))} className = 'hm-link'>Virus On Body</Link>
        <Link onClick = {(linkOnClick('/virus/create'))} className = 'hm-link'>Create new virus</Link>
        <Link onClick = {(linkOnClick('/map'))} className = 'hm-link'>Map</Link>
        </div>
        </div>
    )
}

export default withRouter(Hamburger);
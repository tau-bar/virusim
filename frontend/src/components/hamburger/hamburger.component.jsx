import React, { useState } from 'react';
import './hamburger.styles.scss';
import './hamburger-menu.styles.css';



const Hamburger = () => {
    const [isActive, setIsActive] = useState(false);

    const hamburgerOnClick = (event) => {
        event.preventDefault();
        setIsActive(!isActive);
    }
    return (
        <div className = 'hamburger-component'>
        <div onClick = {(event) => hamburgerOnClick(event)} class={`menu ${isActive ? "open" : ""}`}>
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
      <p className='hm-link'>Virus on body</p>
      <p className='hm-link'>Map simulation</p>
      </div>
        </div>
    )
}

export default Hamburger;
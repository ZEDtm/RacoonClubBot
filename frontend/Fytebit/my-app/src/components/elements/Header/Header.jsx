import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css'
import styles from './HeaderTW.module.scss'

import FyteLogo from '../../ui/Icons/FyteLogo';
import TelegramLogo from "../../ui/Icons/TelegramLogo";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
      hamburger.classList.toggle('open');
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div>
          <TelegramLogo width="2rem" height="2rem" color="var(--color-heading)"/>
        </div>
        <div>
          <FyteLogo width="2.5rem" height="2.5rem" color="var(--color-heading)"/>
        </div>
        <button className="hamburger" onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </button>
      </div>
      <div className={`toggle-menu ${isOpen ? 'show': 'hide'}`}>
        <div className={styles.link}>
          <Link to="/">Главнвя</Link>
        </div>
        <div className={styles.link}>
          <Link to="/about">О нас</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
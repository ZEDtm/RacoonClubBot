import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './Header.module.css'

import FyteLogo from '../../ui/Icons/FyteLogo';
import TelegramLogo from "../../ui/Icons/TelegramLogo";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
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

        <button className={`${styles.hamburger} ${isOpen ? styles.open : ''}`} onClick={toggleMenu}>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
        </button>
      </div>

      <div className={`${styles.toggleMenu} ${isOpen ? styles.show : styles.hide}`}>

        <div className={styles.link}>
          <Link to="/">Главная</Link>
        </div>

        <div className={styles.link}>
          <Link to="/about">О нас</Link>

        </div>
      </div>
    </header>
  );
};

export default Header;
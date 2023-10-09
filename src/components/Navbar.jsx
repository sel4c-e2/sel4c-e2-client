import { useContext, useEffect, useState } from "react";
import Link from 'next/link';
import Image from 'next/image';

import { DataContext } from "@/context/DataContext";

import styles from '@/assets/styles/Navbar.module.css';


export default function Navbar() {
  const { isLogged, isNavbarActive, toggleNavbar, closeNavbar } = useContext(DataContext);

  return (
    <nav className={styles.nav} data-open={isNavbarActive}>
      <div className={styles.navContainer + ' container'}>
        <div className={styles.content}>
          <div className={styles.logo}>
            <Link href={"/"}>
              SEL4C
            </Link>
          </div>
          <div className={styles.links}>
            <ul>
              <li>
                <Link href={"/"}>Inicio</Link>
              </li>
              {isLogged ? <>
                <li>
                  <Link href={"/account"}>Mi cuenta</Link>
                </li>
                <li>
                  <Link href={"/dashboard"} className={`${styles.btn} ${styles.dashboardBtn}`}>Panel</Link>
                </li>
              </> : <>
                <li>
                  <Link href={"/auth/signup"} className={`${styles.btn} ${styles.signupBtn}`}>Registrate</Link>
                </li>
                <li>
                  <Link href={"/auth/login"} className={`${styles.btn} ${styles.loginBtn}`}>Iniciar sesión</Link>
                </li>
              </>}
            </ul>
            <button className={styles.toggleBtn} type="button" onClick={toggleNavbar}>
              <div className={styles.toggleBar1}></div>
              <div className={styles.toggleBar2}></div>
              <div className={styles.toggleBar3}></div>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

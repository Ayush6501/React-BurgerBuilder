import React from 'react';
import styles from './Toolbar.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import { Icon } from '@iconify/react';
import hamburgerIcon from '@iconify/icons-mdi/hamburger';
import {NavLink} from 'react-router-dom';

const toolbar = (props) => (
    <header className={styles.Toolbar} style={{backgroundColor: props.bg}}>
            <div className={styles.Navbar} >
                <Icon className={styles.DrawerToggle} onClick={props.drawerToggle} icon={hamburgerIcon} style={{color: '#FFF', fontSize: '50px', paddingTop: '.2em'}} />
                <NavLink to="/">
                    <Logo height="3.5em"/>
                </NavLink>
                <nav className={styles.DesktopOnly}>
                    <NavigationItems isAuthenticated={props.isAuth}/>
                </nav>
            </div>
    </header>
);

export default toolbar;

import React from 'react';
import styles from './NavigationItem.module.css'
import {NavLink} from 'react-router-dom';

const navigationItem = (props) => (
    <li className={styles.NavigationItem}>
        <NavLink to={props.link} exact activeClassName={styles.active} activeStyle={{fontWeight: 'bold'}}>
            {props.children}
        </NavLink>
    </li>
);

export default navigationItem;
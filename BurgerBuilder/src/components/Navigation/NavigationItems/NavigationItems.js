import React from 'react';
import styles from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={styles.NavigationItems}>
            <NavigationItem link="/BurgerBuilder" exact>BurgerBuilder</NavigationItem>
            {props.isAuthenticated ? <NavigationItem link="/Orders">My Orders</NavigationItem> : null}
            {!props.isAuthenticated 
                ? <NavigationItem link="/Auth">Log In</NavigationItem>
                : <NavigationItem link="/Logout">Log Out</NavigationItem>}
    </ul>
);

export default navigationItems;
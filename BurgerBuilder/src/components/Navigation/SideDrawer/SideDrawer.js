import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import styles from './SideDrawer.module.css';
import Backdrop from '../../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/_Aux/_Aux';

const sideDrawer = (props) => {
    let attachedClasses = [styles.SideDrawer, styles.Closed];
    if (props.open) {
        attachedClasses = [styles.SideDrawer, styles.Open];
    }

    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')} onClick={props.closed}>
                <Logo height="10%"/>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuth} />
                </nav>  
            </div>
        </Aux>
    );
};

export default sideDrawer;

import React from 'react';
import styles from './ThankYou.module.css';
import {NavLink} from 'react-router-dom';

const Ty = () => {
    return (
        <div className={styles.container}>
            <p className={styles.head}>Thank You!</p>
            <div className={styles.typarent}>
                <div className={styles.tychild}>
                    <p className={styles.order}>Your Order will be delivered to you soon.</p>
                    <p className={styles.track}>{"Track your Order -->"}</p>
                    <NavLink className={styles.NavigationItem} to="/">Home</NavLink>
                    <NavLink className={styles.NavigationItem} to="/BurgerBuilder">Build Another</NavLink>
                </div>
                <iframe title="map" className={styles.map}
                    src='https://api.mapbox.com/styles/v1/mapbox/streets-v11.html?title=false&zoomwheel=false&access_token=pk.eyJ1IjoiYXl1c2g2NTAxIiwiYSI6ImNrbGt5b2ZpcDBscXMyeHA1NTU1cWhhcGQifQ.srHhB4i96-oqw0HQaGObxg#15/18.920185/72.832262' />
            </div>
        </div>
    );
};

export default Ty;
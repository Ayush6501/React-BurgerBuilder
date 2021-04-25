import React from 'react';
import Illustration from './LandingIllustration/LandingIllustration';
import background from '../../assets/images/hero_bg.png';
import styles from './Landing.module.css';
import {NavLink} from 'react-router-dom';

const Landing = () => {
    return (
            <div className={styles.hero} style={{ backgroundImage: `url(${background})` }}>
                <div className={styles.container}>
                    <div className={styles.leftcol}>
                        <p className={styles.subhead}>Being Hungry ain't even an option.</p>
                        <p className={styles.mainhead}>Rethink your Burger</p>
                        <p className={styles.tagline}>100% Fully Customisable Burgers</p>
                        <NavLink to="/BurgerBuilder">
                            <button className={styles.btn3} ><span>Build Now</span></button>
                        </NavLink> 
                    </div>
                    <div className={styles.heroimg}>
                        <Illustration />
                    </div>
                </div>
                <div className={styles.footer}>
                    <p>Designed For Personal Use By <span>Ayush Majumdar</span></p>
                </div>
            </div>       
    );
};

export default Landing;
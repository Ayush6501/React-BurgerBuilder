import React from 'react';
import Burger_illus from '../../../assets/images/BurgerIllustration.png';
import styles from './LandingIllustration.module.css';

const illus = (props) => (
    <div>
        <img src={Burger_illus} alt="Burger-Logo" className={styles.heroimg}/>
    </div>
);

export default illus;
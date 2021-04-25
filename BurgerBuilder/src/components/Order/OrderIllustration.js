import React from 'react';
import Order_illus from '../../assets/images/Orders.png';
import Styles from './Illustration.module.css';

const illus = (props) => (
    <div>
        <img className={Styles.orderimg} src={Order_illus} alt="Burger-Logo"/>
    </div>
);

export default illus;
import React from 'react';
import styles from './Order.module.css'

const Order = (props) => {
    const ingredients = [];
    for (let ingredient in props.ingredients) {
        ingredients.push(
                    {
                        name: ingredient, 
                        amount: props.ingredients[ingredient]
                    });
    }
    
    const ingredientOutput = ingredients.map(ig => {
        return <span key={ig.name} className={styles.Ings}>
                 {ig.name} x {ig.amount}
               </span>;
    });

   return (
    <div className={styles.Order}>
        <p style={{color: '#FFF'}}><strong>Ingredients</strong>: {ingredientOutput}</p>
        <p style={{color: '#FFF'}}><strong>Price</strong>: <strong>{props.price}</strong></p>
    </div>
    );
};

export default Order;
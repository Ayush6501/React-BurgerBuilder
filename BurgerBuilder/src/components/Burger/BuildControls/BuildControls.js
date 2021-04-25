import React from 'react';
import styles from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type:'salad'},
    { label: 'Bacon', type:'bacon'},
    { label: 'Meat', type:'meat'},
    { label: 'Cheese', type:'cheese'},
    { label: 'Egg', type:'egg'}
];

const buildControls = (props) => (
    <div className={styles.BuildControls}>
        <p className={styles.Price}>Current Total: <strong>₹{props.Price}</strong></p>
        {controls.map(ctrl => (
            <BuildControl 
                key={ctrl.label} 
                label={ctrl.label}
                added={() => props.ingredientAdded(ctrl.type)} 
                removed ={() => props.ingredientRemoved(ctrl.type)} 
                disabled={props.disabled[ctrl.type]} /> 
        ))}
        <button 
            className={styles.OrderButton} 
            disabled={!props.purchase}
            onClick={props.purchasing}>
            {props.isAuth ? "ORDER NOW" : "SIGN UP TO ORDER"}
        </button>
    </div>
);
 
export default buildControls; 
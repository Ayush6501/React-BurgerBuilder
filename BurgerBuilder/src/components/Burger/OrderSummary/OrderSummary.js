import React, {Component} from 'react';
import Button from '../../../UI/Button/Button';
import Aux from '../../../hoc/_Aux/_Aux';

class orderSummary extends Component {
    //Can be a Functional Component
    componentDidUpdate () {
        //console.log("[orderSummary.js] WillUpdate")
    }

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
                </li>
            );
        });

        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A Delicious Burger with the following ingredients: </p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p>Total Price : ₹{this.props.Price.toFixed(2)}</p>
                <p>Continue to Checkout?</p>
                <Button clicked={this.props.purchaseCancelled} btnType="Danger">CANCEL</Button>
                <Button clicked={this.props.purchaseContinued} btnType="Success">CONTINUE</Button>
            </Aux>
        );
    };
};


export default orderSummary;
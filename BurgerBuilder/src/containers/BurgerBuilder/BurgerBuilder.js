import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../UI/Spinner/Spinner';
import  withErrorHandler from '../../components/WithErrorHandler/WithErrorHandler';
import {connect} from 'react-redux';
import * as BurgerBuilderActions from '../../store/actions/index';
import Aux from '../../hoc/_Aux/_Aux';
import axios from '../../axios-order';
import { withRouter } from 'react-router-dom';
import styles from './BurgerBuilder.module.css';

class BurgerBuilder extends Component {
    state = {
        // ingredients: {
        //     egg : 0,
        //     salad: 0,
        //     bacon: 0,
        //     meat: 0,
        //     cheese: 0
        // },
        // ingredients: null,
        // totalPrice: 150,
        purchaseable: false,
        purchasing: false,
    }

    componentDidMount () {
        //console.table(this.props);
        this.props.onInitIngredients();
    }

    
    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredient = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredient[type] = updatedCount;
    
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
    
    //     this.setState({totalPrice: newPrice, ingredients: updatedIngredient})
    //     this.updatePurchaseState(updatedIngredient);
    // }
            
    // removeIngredientHandler = (type) => {
        //     const oldCount = this.state.ingredients[type];
        //     if (oldCount <= 0) {
            //         return;
            //     }
            //     const updatedCount = oldCount - 1;
            //     const updatedIngredient = {
        //         ...this.state.ingredients
        //     };
        //     updatedIngredient[type] = updatedCount;
        
        //     const priceDeduction = INGREDIENT_PRICES[type];
        //     const oldPrice = this.state.totalPrice;
        //     const newPrice = oldPrice - priceDeduction;
        
        //     this.setState({totalPrice: newPrice, ingredients: updatedIngredient})
        //     this.updatePurchaseState(updatedIngredient);
    // }
                     
    updatePurchaseState() {
        const sum = Object.keys(this.props.ings)
            .map(igKey => {
                return this.props.ings[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }
    
    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({purchasing: true});
        } else {
            this.props.onSetAuthRedirectPath('/Checkout');
            this.props.history.push('/Auth');
        }
        
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        // alert("Proceeding to Checkout!");
        // const queryParams = [];
        // for (let i in this.state.ingredients) {
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        // }
        // queryParams.push('price=' + this.state.totalPrice);
        // const queryString = queryParams.join('&');
    //     this.props.history.push({
    //         pathname: "/Checkout",
    //         search: '?' + queryString
    //     });
    this.props.onInitPurchase();
        this.props.history.push('/Checkout');
    }

    render() {
        const disableInfo = {
            ...this.props.ings
        };

        for(let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded.</p> : <Spinner />      

        if (this.props.ings) {
            burger = (
                <div className={styles.burgercontainer}>
                <Burger ingredients={this.props.ings} />
                <BuildControls 
                    ingredientAdded={this.props.onIngredientAdded}  
                    ingredientRemoved={this.props.onIngredientRemoved}  
                    disabled = {disableInfo} 
                    purchase={this.updatePurchaseState()}
                    Price={this.props.price} 
                    purchasing={this.purchaseHandler} 
                    isAuth={this.props.isAuthenticated}/>
                </div>
            );

            orderSummary = <OrderSummary 
            ingredients={this.props.ings}
            purchaseCancelled={this.purchaseCancelHandler} 
            purchaseContinued={this.purchaseContinueHandler}
            Price={this.props.price} 
            />
        }

        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalprice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(BurgerBuilderActions.addIngredients(ingName)),
        onIngredientRemoved: (ingName) => dispatch(BurgerBuilderActions.removeIngredients(ingName)),
        onInitIngredients: () => dispatch(BurgerBuilderActions.initIngredients()),
        onInitPurchase: () => dispatch(BurgerBuilderActions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(BurgerBuilderActions.authRedirectPath(path))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios)));
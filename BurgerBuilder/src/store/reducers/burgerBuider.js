import * as actionTypes from '../actions/actionTypes';

const INGREDIENT_PRICES = {
    egg: 10,
    salad: 20,
    cheese: 15,
    meat: 50,
    bacon: 35
};

const initialState = {
    ingredients: null,
    totalprice: 150,
    error: false,
    building: false
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_INGREDIENTS : 
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalprice: state.totalprice + INGREDIENT_PRICES[action.ingredientName],
                building: true
            };
        case actionTypes.REMOVE_INGREDIENTS :
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalprice: state.totalprice - INGREDIENT_PRICES[action.ingredientName],
                building: true
            };
        case actionTypes.SET_INGREDIENTS :
            return {
                ...state,
                ingredients: action.ingredients,
                error: false,
                totalprice: 150,
                building: false
            };
        
        case actionTypes.FETCH_INGREDIENTS_FAILED :
            return {
                ...state,
                error: true
            };
        default:
            return state;
    }
};

export default reducer;
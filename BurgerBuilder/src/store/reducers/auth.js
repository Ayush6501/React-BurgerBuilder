import * as actionTypes from '../actions/actionTypes';

const inititalState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirect: '/'
}

const reducer = (state = inititalState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return {
                ...state,
                loading: false,
                error: true
            };
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                token: action.idToken,
                userId: action.userId,
                error: null,
                loading: false
            };
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                error: action.error,
                loading: false
            };
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                userId: null
            };
        case actionTypes.AUTH_REDIRECT_PATH:
            return {
                ...state,
                authRedirect: action.path
            };
        default:
            return state;
    }
};

export default reducer;
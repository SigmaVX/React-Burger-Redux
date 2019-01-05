import * as actionTypes from "./actions";

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    unitPrice: {
        salad: 0.35,
        bacon: 0.75,
        cheese: 0.5,
        meat: 1.5
    },
    totalOrderPrice: 4,
}

const reducer = (state = initialState, action) =>{
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
            return{
                ...state,
                ingredients: {
                    // must copy ingredientes since it is deeply nested
                    ...state.ingredients,
                    // [action.ingredients] is a variable passed by the payload
                    [action.ingredient]: state.ingredients[action.ingredient] + 1
                },
                totalOrderPrice: state.totalOrderPrice + state.unitPrice[action.ingredient]
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredient]: state.ingredients[action.ingredient] - 1
                },
                totalOrderPrice: state.totalOrderPrice - state.unitPrice[action.ingredient]
            }
        default:
            return state;

    }
}

export default reducer; 
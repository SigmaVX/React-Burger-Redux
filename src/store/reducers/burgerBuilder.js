import * as actionTypes from "../actions/actionTypes";
import {updateObject} from "../../constants/utilities";

// Ruducer file to update and initiate Redux state
// This showcases some traditioanl ways to update and
// Some updates using the ultility functions to steamline code
const initialState = {
    ingredients: null,
    unitPrice: {
        salad: 0.35,
        bacon: 0.75,
        cheese: 0.5,
        meat: 1.5
    },
    totalOrderPrice: 4,
    error: false,
    building: false
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
                totalOrderPrice: state.totalOrderPrice + state.unitPrice[action.ingredient],
                building: true
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredient]: state.ingredients[action.ingredient] - 1
                },
                totalOrderPrice: state.totalOrderPrice - state.unitPrice[action.ingredient],
                building: true
            }
        case actionTypes.SET_INGREDIENTS:
            return{
                ...state,
                // Maps The Firebase Data In The Order We Want Displayed
                // Otherwise Firebase Defaults To Alphabetical  
                // You Must Manually Add New Ingredients Here If Added In App
                ingredients: {
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat
                },
                totalOrderPrice: 4,
                error: false,
                building: false
            }
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return updateObject(state, {error: true});
        default:
            return state;

    }
}

export default reducer; 
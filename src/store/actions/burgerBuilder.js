import * as actionTypes from "./actionTypes";
import axios from "../../API/Axios/Axios-Orders";


export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredient: name
    }
}

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredient: name
    }
}

// Syncronus Action Creator 
const setIngredients = (ingredients) =>{
    return{
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

// Syncronus Action Creator 
const fetchIngredientsFailed = (error)=>{
    return{
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

// Async Function Using Thunk   
export const initIngredients =()=>{
    // Access To Dispatch Is Enabled By Thunk
    return (dispatch)=>{
        axios.get("/ingredients.json")
            .then(response=>{
                dispatch(setIngredients(response.data));
            })
            .catch(error=>{
                dispatch(fetchIngredientsFailed(error))
            })

    }
}
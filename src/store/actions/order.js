import * as ActionTypes from "../actions/actionTypes";
import axios from "../../API/Axios/Axios-Orders";

// Sync Code
export const purchaseBurgerSuccess = (id, orderData) =>{
    return{
        type: ActionTypes.PURCHASE_BURGER_SUCCESS,
        id: id,
        orderData: orderData
    }
}

// Sync Code
export const purchaseBurgerFail = (error) =>{
    return{
        type: ActionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchaseBurgerStart = () => {
    return {type: ActionTypes.PURCHASE_BURGER_START}
}

// Asyc Code
export const purchaseBurger = (orderData) => {
    return (dispatch) =>{
        dispatch(purchaseBurgerStart());
        axios.post("/orders.json", orderData)
            .then(response =>{
                console.log(response.data);
                dispatch(purchaseBurgerSuccess(response.data.name, orderData));

            })
            .catch(error =>{
                console.log(error)
                dispatch(purchaseBurgerFail(error));
            });
    }
}
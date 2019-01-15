import * as actionTypes from "../actions/actionTypes";
import {updateObject} from "../../constants/utilities";


// Ruducer file to update and initiate Redux state
// This showcases some traditioanl ways to update and
// Some updates using the ultility functions to steamline code

const initialState = {
    orders: [],
    loading: false,
    purchased: false,
    error: null
};

const reducer = (state = initialState, action) => {
    switch (action.type){
        case(actionTypes.PURCHASE_BURGER_INIT):
            return updateObject(state, {purchased: false});
        case(actionTypes.PURCHASE_BURGER_START):
            return updateObject(state, {loading: true});

        case(actionTypes.PURCHASE_BURGER_SUCCESS):
            const newOrder = {
                ...action.orderData,
                id: action.id
            }
            return updateObject(state, {
                loading: false,
                purchased: true,
                // Concat makes a new object so maintains immutable state
                orders: state.orders.concat(newOrder)
            })
        case(actionTypes.PURCHASE_BURGER_FAIL):
            return updateObject(state, {loading: false});
        case(actionTypes.FETCH_ORDERS_START):
            return updateObject(state, {loading: true})
        case(actionTypes.FETCH_ORDERS_SUCCESS):
            return updateObject(state, {
                orders: action.orders,
                loading: false
            })
        case(actionTypes.FETCH_ORDERS_FAIL):
            return updateObject(state, {
                error: action.error,
                loading: false
            })
        default: return state;
    }
}

export default reducer;

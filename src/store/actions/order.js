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
export const purchaseBurger = (orderData, token) => {
    return (dispatch) =>{
        dispatch(purchaseBurgerStart());
        axios.post("/orders.json?auth=" + token, orderData)
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

// Sync Code
export const purshaseBurgerInit = () =>{
    return{
        type: ActionTypes.PURCHASE_BURGER_INIT
    }
}

// Sync Code
export const fetchOrdersSuccess = (orders) =>{
    return{
        type: ActionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

// Sync Code
export const fetchOrdersFail = (error) =>{
    return{
        type: ActionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}

// Sync Code
export const fetchOrdersStart = () =>{
    return{
        type: ActionTypes.FETCH_ORDERS_START
    }
}

// Async Code
export const fetchOrders = (token, userId) =>{
    return (dispatch)=>{
        dispatch(fetchOrdersStart());
        // Query Terms To Get Orders By ID in Firebase Note the use of "" on terms
        // const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;

        // const queryParams = "?auth=" + token + "&orderBy='userId'&equalTo='" + userId + "'";
        console.log(queryParams);
        axios.get("/orders.json" + queryParams)
        .then(res => {
            // Convert res from an object to an array of objects
            let ordersArray = [];
            for(let key in res.data){
                console.log("Key Is: ", key);
                console.log("Data Is: ", res.data[key]);
                ordersArray.push({
                    // Making a New Object Based on Key Object
                    // While adding the ID for the Key Object 
                    ...res.data[key],
                    id: key
                })
            }
            dispatch(fetchOrdersSuccess(ordersArray));
        })
        .catch(error => {
            dispatch(fetchOrdersFail(error));
        })
    }
}



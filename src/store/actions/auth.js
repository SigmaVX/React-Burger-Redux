import * as ActionTypes from "./actionTypes";
import axios from "axios";

export const authStart =()=>{
    return {
        type: ActionTypes.AUTH_START
    }
}

export const authSuccess =(token, userId)=>{
    return {
        type: ActionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
    }
}

export const authFail =(error)=>{
    return {
        type: ActionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () =>{
    localStorage.removeItem("token");
    localStorage.removeItem("expiration-date");
    localStorage.removeItem("user-id");
    clearTimeout();
    return {
        type: ActionTypes.AUTH_LOGOUT
    }
}

// Async Code
const checkAuthorizatoin = (expirationTime) =>{
    console.log("Token Expires: ", expirationTime);
    return (dispatch) =>{
        setTimeout(()=> {
            dispatch(logout());
        }, expirationTime * 1000)
    }
}

// Async Code - Using Firebase Authentication Tool For Backend
export const auth = (email, password, isSignUp) =>{
    return (dispatch)=>{
        dispatch(authStart());
        const authData = {
            email: email, 
            password: password,
            returnSecureToken: true
        }
        console.log(isSignUp);
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyA0kQ_tIY7wlx_fMtfJ5n9iIHF6qN7gnAc'
        if(isSignUp === false) {
            console.log("hit");
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyA0kQ_tIY7wlx_fMtfJ5n9iIHF6qN7gnAc'
        }
        axios.post(url, authData)
            .then( (response) =>{
                console.log(response.data);
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem("token", response.data.idToken);
                localStorage.setItem("expiration-date", expirationDate);
                localStorage.setItem("user-id", response.data.localId);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthorizatoin(response.data.expiresIn));
            })
            .catch((error)=>{
                // Axios Errors come in as error.response
                console.log(error.response.data.error);
                dispatch(authFail(error.response.data.error));
            });
    }
}

export const setAuthRedirectPath = (path) =>{
    return{
        type: ActionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

// Async Code
export const authCheckState = () =>{
    return (dispatch) =>{
        const token = localStorage.getItem("token");
        if(!token){
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem("expiration-date"));
            if(expirationDate > new Date()){
                const userId = localStorage.getItem("user-id");
                dispatch(authSuccess(token, userId));
            } else {
                dispatch(logout());
                dispatch(checkAuthorizatoin((expirationDate.getTime() - new Date().getTime())/1000))
            }
            
        }
    }
}
// import React from "react";
import reducer from "./auth";
import * as  actionTypes from "../actions/actionTypes";

const initialState = {
    token: null,
    loading: false,
    userId: null,
    error: null,
    authRedirectPath: "/"
}

// These test reducer by passing along state and action props
describe("Auth Reducer Test", ()=>{
    it("Should Return Initial State When State Is Undefinded", ()=>{
        // Sets reducer to run with undefined state and an empty action as param
        expect(reducer(undefined, {})).toEqual(initialState);
    })

    // Sets An Action Object For Success Action Type To Test Token & ID
    it("Should Store Token After Login", ()=>{  
        expect(reducer(initialState, {
            type: actionTypes.AUTH_SUCCESS,
            token: "token-test",
            userId: "userId-test"
            // Checks That The Token & ID Changed 
        })).toEqual({
            token: "token-test",
            loading: false,
            userId: "userId-test",
            error: null,
            authRedirectPath: "/"
        })
    })
})


import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import * as action from "../../../store/actions/index.js";
import {connect} from "react-redux";

class Logout extends Component {
    componentDidMount () {
        // This clears logout state
        this.props.onLogout();
    }


    render(){
        /* This redirects */
        return <Redirect to="/"/>
    }
}

const mapDispatchToProp = (dispatch) =>{
    return{
        onLogout: ()=>dispatch(action.logout())
    }
}

export default connect(null, mapDispatchToProp)(Logout);
import React, {Component} from "react";
import Order from "../../components/Order/Order";
import axios from "../../API/Axios/Axios-Orders";
import errorHandler from "../HOC/ErrorHandler/ErrorHandler";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";


class Orders extends Component{

    componentDidMount(){
        // console.log(this.props.userId);
      this.props.onFetchOrders(this.props.token, this.props.userId);
    }

    render(){

        let orders = <Spinner />;
        if (!this.props.loading && this.props.orders.length > 0){
            orders = (
                <div>
                    <h1 style={{textAlign: "center", paddingTop: "30px", minHeight: "100vh"}}>Order History</h1>
                    {
                        
                    this.props.orders.map(order =>(
                        <Order 
                            key={order.id}
                            ingredients={order.ingredients}
                            // Add + To Convert String to Number Type
                            price={+order.orderPrice}
                            id={order.id}
                        />
                    ))}
                </div>
            )
        }

        if(this.props.orders.length === 0 ){
            orders = (
                <div>
                    <h1 style={{textAlign: "center", paddingTop: "30px", minHeight: "100vh"}}>
                        No Orders Yet <br/>
                        Head To The Home Page To Start
                    </h1>
                </div>
            )
        }

        return orders;
    }
}

const mapStateToProps = (state) =>{
    return{
        orders: state.order.orders,
        loading: state.order.loading,
        purchased: state.order.purchased,
        error: state.order.error,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        onFetchOrders: (token, userId)=>dispatch(actions.fetchOrders(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(Orders, axios));
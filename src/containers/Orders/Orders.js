import React, {Component} from "react";
import Order from "../../components/Order/Order";
import axios from "../../API/Axios/Axios-Orders";
import errorHandler from "../ErrorHandler/ErrorHandler";


class Orders extends Component{

    state={
        orders: [],
        loading: true,
        error: ""
    }

    componentDidMount(){
        axios.get("/orders.json")
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
                this.setState({
                    orders: ordersArray,
                    loading: false
                })
            })
            .catch(error => {
                this.setState({
                    // Note: we are only storing error in state
                    error: error,
                    loading: false
                })
            })
    }
    render(){
        return(
            <div>
                <h1 style={{textAlign: "center", paddingTop: "30px"}}>Order History</h1>
                {this.state.orders.map(order =>(
                    <Order 
                        key={order.id}
                        ingredients={order.ingredients}
                        // Add + To Convert String to Number Type
                        price={+order.orderPrice}
                        id={order.id}
                        />
                ))}
            </div>
        );
    }
}

export default errorHandler(Orders, axios);
import React, {Component} from "react";
import Button from "../../UI/Button/Button";
import style from "./OrderSummary.module.css";


// This can be a functional component but was turned to a class 
// To show that lifecycle method on Modal is working properly
class OrderSummary extends Component {

    componentDidUpdate(){
        console.log("OrderSummary Component Updated");
    }

    render(){
    
        const ingredientList = Object.keys(this.props.ingredients)
            .map(ingredientItem => {
                return  <li className={style.List} key={ingredientItem}>
                            <span style={{textTransform: "capitalize"}}>{ingredientItem}</span> : {this.props.ingredients[ingredientItem]}
                        </li>
            });

    return(
        <React.Fragment>
            <h2 className={style.Header}>Your Order Summary</h2>
            <p >Thats A Scrumptious Looking Burger!</p>
            <ul>
                {ingredientList}
            </ul>
            <p>Total Price: ${this.props.totalPrice.toFixed(2)}</p>
            <Button clicked={this.props.purchaseBurger} btnType="Success">Continue To Checkout?</Button>
            <Button clicked={this.props.closeModal} btnType="Danger">Close</Button>
        </React.Fragment>
    )}; 
};

export default OrderSummary;
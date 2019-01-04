import React from "react";
import Burger from "../../Burger/Burger"
import Button from "../../UI/Button/Button";
import style from "./Summary.module.css";


const Summary = (props) =>{
    return(
        <div className={style.Summary}>
            <h1>Order Summary</h1>
            <div style={{width: "100%", margin: "20px, auto"}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <div>
                <Button btnType="Danger" clicked={props.checkoutCancel}>Cancel</Button>
                <Button btnType="Success" clicked={props.checkoutContinue}>Order Now</Button>
            </div>
        </div>
    );
}

export default Summary;
import React from "react";
import Burger from "../../Burger/Burger"
import Button from "../../UI/Button/Button";
// import ScrollIntoView from 'react-scroll-into-view';
import ContactData from "../../../containers/Checkout/ContactData/ContactData";

import style from "./Summary.module.css";


const Summary = (props) =>{
    return(
        <div className={style.Summary}>
            <h1>Order Summary</h1>
            <div className={style.BurgerWrapper}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <ContactData />
            <div className={style.ButtonWrapper}>
                <Button btnType="Danger" clicked={props.checkoutCancel}>Cancel Order</Button>
                {/* Not Used 
                <Button btnType="Success" clicked={props.checkoutContinue}>Order Now</Button>
                */}

            </div>
        </div>
    );
}

export default Summary;
import React from "react";
import style from "./Order.module.css";

const Order = (props) =>{
    const ingredients = [];
    for(let item in props.ingredients){
        ingredients.push({
            name: item, 
            amount: props.ingredients[item]
        })
    }

    const ingredientList = ingredients.map(item => {
        return <span 
                    key={item.name}
                    style={{
                        textTransform: "capitalize",
                        display: "inline-block",
                        margin: "0 8px",
                        padding: "5px",
                        lineHeight: "70px",
                        border: "1px solid #ccc",
                        borderRadius: "50%",
                        fontSize: "14px",
                        width: "75px",
                        height: "75px",
                        backgroundColor: "#45a4c6"
                    }}
                > 
                    {item.name} ({item.amount})
                </span>
    });

    return(
        <div className={style.Order}>
            <p>Order Number: {props.id}</p>        
            <p>{ingredientList}</p>
            <p>Order Price: ${props.price.toFixed(2)}</p>
        </div>

    );
}

export default Order;
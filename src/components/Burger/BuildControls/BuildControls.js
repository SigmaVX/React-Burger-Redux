import React from "react";
import style from "./BuildControls.module.css"
import BuildControl from "./BuildControl/BuildControl";

const BuildControls = (props) =>{

    let controls = [
        {lable: "Olive and Let Die Patty", type:"meat"},
        {lable: "Your Bacon Me Crazy", type:"bacon"},
        {lable: "Don't Four Cheddar 'Bout Me", type:"cheese"},
        {lable: "If Looks Could Kale", type:"salad"}
    ];


    return(
        <div className={style.BuildControls}>
            <h2>Total Price: ${props.price.toFixed(2)}</h2>
            {controls.map(item=>(
                <BuildControl 
                    lable={item.lable} 
                    key={item.lable}
                    addItem={()=>props.addIngredients(item.type)}
                    removeItem={()=>props.removeIngredients(item.type)}
                    disabled={props.disabledItems[item.type]}
                />
            ))}
            <button 
                disabled={!props.canBuy}
                className={style.OrderButton}
                onClick={props.orderClicked}
            >
                Order Now
            </button>
        </div>

    );
}

export default BuildControls;
import React from "react";
import style from "./BuildControl.module.css";


const BuildControl = (props) =>{
    return(
        <div className={style.BuildControl}>
            <button className={style.Less} onClick={props.removeItem} disabled={props.disabled}>
               <i className="fas fa-minus-circle"></i>
            </button>

            <h4 className={style.Label}>{props.lable}</h4>  
            
            <button className={style.More} onClick={props.addItem}>
                <i className="fas fa-plus-circle"></i>
            </button>  
        </div>

    );
}

export default BuildControl;
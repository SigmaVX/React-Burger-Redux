import React from "react";
import style from "./Input.module.css";

const Input = (props) =>{
    
    let validationError = null;
    const inputClasses = [style.InputElement];
    // ShouldValidate Needed So We Don't Try To Validate Dropdown Box
    if(props.invalid && props.shouldValidate && props.touched){
        inputClasses.push(style.Invalid);
        validationError = <p className={style.ValidationError}>{props.elementConfig.placeholder} Error: Please Enter A Valid Value</p>
    }

    let inputElement = null;
    switch(props.elementType){
        case("input"):
            inputElement = <input 
                className={inputClasses.join(" ")} 
                {...props.elementConfig} 
                value={props.value}
                onChange={props.changed}/>;
            break; 
        case("textarea"):
            inputElement = <textarea
                className={inputClasses.join(" ")} 
                {...props.elementConfig} 
                value={props.value}
                onChange={props.changed}/>;
            break;
        case("select"):
            inputElement = (
                <select
                    className={inputClasses.join(" ")} 
                    value={props.value}
                    onChange={props.changed}
                >
                    {props.elementConfig.options.map(option =>(
                        <option value={option.value} key={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;    
        default:
            inputElement = <input 
                className={inputClasses.join(" ")} 
                {...props.elementConfig} 
                value={props.value}
                onChange={props.changed}/>
    }
    
    return(
        <div className={style.Input}>
            <label className={style.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    );
}

export default Input; 
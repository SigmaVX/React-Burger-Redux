import React from "react";
import style from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = (props) =>{
    return(
        <ul className={style.NavigationItems}>
            <NavigationItem link="/">Burger Builder</NavigationItem>
            {props.isAuthenticated? <NavigationItem link="/orders">Orders</NavigationItem> : null}   
   
            {props.isAuthenticated
            ? <NavigationItem link="/logout">Logout</NavigationItem>    
            : <NavigationItem link="/auth">Sign Up - Login</NavigationItem>
            }    
            
        </ul>
    );
};

export default NavigationItems;
   
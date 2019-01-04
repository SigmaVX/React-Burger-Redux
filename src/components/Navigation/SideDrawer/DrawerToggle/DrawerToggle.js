import React from "react";
import style from "./DrawerToggle.module.css";
// Hamburger Lines Are From CSS On Empty Divs

const DrawerToggle = (props) =>{
    return(
        <div className={style.DrawerToggle} onClick={props.toggle}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}

export default DrawerToggle;
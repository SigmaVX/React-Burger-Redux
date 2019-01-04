import React from "react";
import burgerLogo from "../../assets/images/burger-logo.png";
import style from "./Logo.module.css";

const Logo = (props) =>(
    <div className={style.Logo}>
        <img src={burgerLogo} alt="Burger Logo"/>
    </div>
    
);

export default Logo;
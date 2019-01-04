import React from "react";
import style from "./NavigationItem.module.css"
import {NavLink} from "react-router-dom";


// NavLink is rendered as <a> in HTML and will add "active" class but
// active is attached with activeClassName due to use of CSS moduels
// "To" is treated like a prefix unless you use exact
const NavigationItem = (props) =>{
    return(
        <li className={style.NavigationItem}>
            <NavLink 
                to={props.link}
                exact={true}
                activeClassName={style.active}
            >
                {props.children}
            </NavLink>
        </li>
    );
};

export default NavigationItem;
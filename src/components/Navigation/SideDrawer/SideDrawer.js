import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";
import style from "./SideDrawer.module.css";

const SideDrawer = (props) => {
    // Checks props to determine if drawer should be open or closed
    let drawerClasses = [style.SideDrawer, style.Close];
    if(props.openDrawer){
        drawerClasses = [style.SideDrawer, style.Open];
    }


    return(
        <React.Fragment>
            <Backdrop show={props.openDrawer} clicked={props.closeDrawer}/>
            <div className={drawerClasses.join(" ")}>
                <div className={style.LogoWrap}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems/>
                </nav>
            </div>
        </React.Fragment>
    );
}

export default SideDrawer;
import React from "react";
import style from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

const Toolbar = (props) =>{
    return(
        <header className={style.Toolbar}>
            <DrawerToggle toggle={props.toggleDrawer}/>
            <div className={style.LogoWrap}><Logo/></div>
            <nav className={style.DesktopHide}><NavigationItems/></nav>
        </header>
    );
}

export default Toolbar;
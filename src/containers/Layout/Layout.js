import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import style from "./Layout.module.css";


class Layout extends Component {

    state={
        showSideDrawer: false,
    }
    
    toggleSideDrawer = ()=>{
        // Set State Based On Previous State
        // Needed As State Is Updating State
        this.setState((previousState)=>{
            return {showSideDrawer: !previousState.showSideDrawer}
        });
    }

    closeSideDrawer = ()=>{
        this.setState({showSideDrawer: false});
    }

    render(){
        return(
            <React.Fragment>
                <Toolbar toggleDrawer={this.toggleSideDrawer} isAuth={this.props.isAuthenticated}/>
                <SideDrawer closeDrawer={this.closeSideDrawer} openDrawer={this.state.showSideDrawer} isAuth={this.props.isAuthenticated}/>
                <main className={style.main}>{this.props.children}</main>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

// Need With Router As Connect Disrupts Props Without It. 
export default withRouter(connect(mapStateToProps)(Layout));
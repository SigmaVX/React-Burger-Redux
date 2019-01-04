import React, {Component} from "react";
import style from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends Component{

    shouldComponentUpdate(nextProps, nextState){
        // Returns true if show prop changes which allows
        // the modal to be updated (false stops update)
        return nextProps.showModal !== this.props.showModal || nextProps.children !== this.props.children;
    }

    componentWillUpdate(){
        console.log("Modal Will Update");
    }

    render(){
        let modalClass;
        if (this.props.showModal){
            modalClass=`${style.Modal} ${style.show}` 
        } else {
            modalClass=`${style.Modal} ${style.hide}`
        }

        return(
            <React.Fragment>
                <Backdrop show={this.props.showModal} clicked={this.props.closeModal}/>
                <div className={modalClass} style={this.props.style}>
                    {this.props.children}
                </div>
            </React.Fragment>
        );
    } 
};


export default Modal;
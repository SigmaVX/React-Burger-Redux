import React, {Component} from "react";
import Summary from "../../components/Order/Summary/Summary";
import ContactData from "./ContactData/ContactData";
import {Route} from "react-router-dom";
import {connect} from "react-redux";

class Checkout extends Component{

    cancelCheckout=()=>{
        this.props.history.goBack();
    }

    continueCheckout=()=>{
        this.props.history.replace("/checkout/contact-data");
    }
    
    render(){
        return(
            <div>
                <Summary 
                    ingredients={this.props.ings}
                    checkoutCancel={this.cancelCheckout}
                    checkoutContinue={this.continueCheckout}
                />

                {/* Render Checkout */}
                <Route path={"/checkout/contact-data"} component={ContactData} />
            
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return{
        ings: state.ingredients,
        price: state.totalOrderPrice

    }   
}

export default connect(mapStateToProps)(Checkout)   ;
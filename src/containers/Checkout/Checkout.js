import React, {Component} from "react";
import Summary from "../../components/Order/Summary/Summary";
import ContactData from "./ContactData/ContactData";
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";

class Checkout extends Component{

    cancelCheckout=()=>{
        this.props.history.goBack();
    }

    continueCheckout=()=>{
        this.props.history.replace("/checkout/contact-data");
    }
    
    render(){
        // Redirects If No Ingredients (Happens If User Reloads Page)
        let summary = <Redirect to="/"/>;
        if(this.props.ings){
            summary = (
                <div>
                    <Summary 
                        ingredients={this.props.ings}
                        checkoutCancel={this.cancelCheckout}
                        checkoutContinue={this.continueCheckout}
                    />

                    {/* Render Checkout */}
                    <Route path={"/checkout/contact-data"} component={ContactData} />
                </div>
            )  
        }
        return summary;
    }
}

const mapStateToProps = (state) =>{
    return{
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalOrderPrice
    }   
}

export default connect(mapStateToProps)(Checkout)   ;
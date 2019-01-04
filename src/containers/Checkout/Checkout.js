import React, {Component} from "react";
import Summary from "../../components/Order/Summary/Summary";
import ContactData from "./ContactData/ContactData";
import {Route} from "react-router-dom";

class Checkout extends Component{

    state={
        ingredients: null,
        totalPrice: 0
    }

    componentWillMount(){
        // Extracts The Search Terms From The URL
        // URLSearchParams Unlocks Methods To Help Process The Search String
        const queryItems = new URLSearchParams(this.props.location.search);
        const ingredients ={};
        let price = 0;
        // Entries method makes arrays based on the object
        for (let i of queryItems.entries()){
            // Data comes in as like ["cheese", "1"]
            // Iterator is each property of the object
            if(i[0] === "price"){
                // Grab price during loop
                price = i[1];
            } else {
                // Setting key name i[0] and value i[1] from arrays; 
                // A + is added to convert the string to a number data type
                ingredients[i[0]] = +i[1];
            }

        }
        this.setState({ingredients: ingredients, totalPrice: price});     
    }
    

    cancelCheckout=()=>{
        this.props.history.goBack();
    }

    continueCheckout=()=>{
        this.props.history.replace("/checkout/contact-data");
    }
    
    // Route uses render attribute to send props
    render(){
        console.log("Checkout State: ", this.state.ingredients);
        return(
            <div>
                <Summary 
                    ingredients={this.state.ingredients}
                    checkoutCancel={this.cancelCheckout}
                    checkoutContinue={this.continueCheckout}
                />

                {/* Props Passed So Contact Data Has Access To Router Hisotry  */}
                <Route path={"/checkout/contact-data"} render={(props)=><ContactData price={this.state.totalPrice} ingredients={this.state.ingredients} {...props}/>}/>
            
            </div>
        );
    }
}

export default Checkout;
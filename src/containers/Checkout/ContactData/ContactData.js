import React, {Component} from "react";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import style from "./ContactData.module.css";
import axios from "../../../API/Axios/Axios-Orders";
import {connect} from "react-redux";
import withErrorHandler from "../../ErrorHandler/ErrorHandler";
import * as orderActions from "../../../store/actions/index";


class ContactData extends Component{
    
    state={
        // elementConfig passed to Input via spread operator with props that automatically 
        // passes along the nested config object for required html attributes
        orderForm:{
            name: {
                value: "",
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Name"   
                },
                validation: {
                    required: true,
                    minLength: 3,
                    valid: false
                },
                touched: false
            },
            street: {
                value: "",
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Street"   
                },
                validation: {
                    required: true,
                    minLength: 3,
                    valid: false
                },
                touched: false
            },
            zipCode: {
                value: "",
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Postal Code"   
                },
                validation: {
                    required: true,
                    minLength: 3,
                    maxLength: 10,
                    valid: false
                },
                touched: false
            },
            country: {
                value: "",
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Country"   
                },
                validation: {
                    required: true,
                    minLength: 3,
                    valid: false
                },
                touched: false
            },
            email: {
                value: "",
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "Email"   
                },
                validation: {
                    required: true,
                    minLength: 3,
                    maxLength: 100,
                    valid: false
                },
                touched: false
            },
            deliveryMethod: {
                value: "fastest",
                elementType: "select",
                elementConfig: {
                    options: [
                        {value: "fastest", displayValue: "Fastest"},
                        {value: "cheapest", displayValue: "Cheapest"}
                    ]
                },
                validation: {
                    required: false,
                    valid: false
                },
                touched: false
            }
        },
        formIsValid: false
    }

    orderHandler = (event) =>{
        event.preventDefault();
        console.log('Contact Data Props: ', this.props.ingredients);
        const formData = {};
        for(let key in this.state.orderForm){
            formData[key] = this.state.orderForm[key].value;
        }
        // console.log(formData);

        let order = {
            ingredients: this.props.ings,
            orderPrice: this.props.price,
            orderData: formData
        }

        this.props.onOrderBurger(order);
    }

    inputChangeHandler = (event, id) =>{
        // Input Values Stored In event.target.value
        console.log(event.target.value);
        // Copy State So It Is Immutable
        const updatedForm = {
            ...this.state.orderForm
        }
        // Copy Nested Object 
        const updatedItem = {
            ...updatedForm[id]
        }
        // Update Value Of Copied Nested Object
        updatedItem.value = event.target.value;
        // Run Validation
        updatedItem.validation.valid = this.validationCheck(updatedItem.value, updatedItem.validation);
        // Update To Show Input Was Modified
        updatedItem.touched = true;
        // Update Value Of Copied State With Copy Object
        updatedForm[id] = updatedItem;

        // Loop To Verify Form Is Valid
        let formIsValid = true;
        for (let elementItem in updatedForm){
            if(updatedForm[elementItem].validation.required === true){
                if(updatedForm[elementItem].validation.valid === false){
                    formIsValid = false;
                }
            }
        }

        // Set State With The Copy Of State
        this.setState({orderForm : updatedForm, formIsValid : formIsValid});
    }

    validationCheck = (value, rules) =>{
        let isValid = true;
        if(rules.required){
            // Set Boolean Based On If String Is Empty
            // Trim removes white spaces
            isValid = value.trim() !== "" && isValid;
        }

        if(rules.minLength){
            // Set Boolean Based On Min Length Requirement
            isValid = value.length > rules.minLength && isValid;
            console.log(isValid); 
        }

        if(rules.maxLength){
            // Set Boolean Based On Max Length Requirement
            // && isValid Assures Other Rules All Pass
            isValid = value.length < rules.maxLength && isValid; 
        }

        return isValid;
    }

    render(){

        let formElements = [];
        for(let key in this.state.orderForm){
            formElements.push({
                id: key,
                config: this.state.orderForm[key]
            })
        };

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElements.map( element => (
                    <Input 
                        key={element.id} 
                        elementType={element.config.elementType} 
                        elementConfig={element.config.elementConfig} 
                        value={element.config.value}
                        invalid={!element.config.validation.valid}
                        shouldValidate={element.config.validation.required}
                        touched={element.config.touched}
                        changed={(event)=>this.inputChangeHandler(event, element.id)}
                    />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>Order</Button>
            </form>
        );
        if(this.props.loading){
            form=<Spinner/>
        }

        return(
            <div className={style.ContactData}>
                <h4>Enter Contact Data</h4>
                {form}


            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return{
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalOrderPrice,
        loading: state.order.loading
    }   
}

const mapDispatchToProps = (dispatch) =>{
    return{
        onOrderBurger: (orderData)=>dispatch(orderActions.purchaseBurger(orderData)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
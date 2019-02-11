import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import Input from "../../components/UI/Input/Input.js";
import style from "./Auth.module.css";
import * as actions from "../../store/actions/index";
import {connect} from "react-redux";
import {validationCheck} from "../../constants/utilities";

class Auth extends Component{

    state = {
        controls: {
            email: {
                value: "",
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "Enter Email Address"   
                },
                validation: {
                    required: true,
                    minLength: 3,
                    valid: false,
                    isEmail: true
                },
                touched: false
            },
            password: {
                value: "",
                elementType: "input",
                elementConfig: {
                    type: "password",
                    placeholder: "Enter Password"   
                },
                validation: {
                    required: true,
                    minLength: 6,
                    valid: false
                },
                touched: false
            }

        },
        isSignUp: true
    }

    componentDidMount(){
        // catches edge case of if user is redirected to checkout but is not yet building a burger
        if(!this.props.buildingBurger && this.props.redirectPath !== "/"){  
            this.prop.onSetRedirectPath("/");
        }
    }

    inputChangeHandler = (event, controlName) =>{
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                touched: true,
                validation: {
                    ...this.state.controls[controlName].validation,
                    valid: validationCheck(event.target.value, this.state.controls[controlName].validation)
                } 
            }
        }
        this.setState({
            controls: updatedControls
        }) 
    }

    submitHandler = (event) =>{
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp)
    }

    swithAuthMode = () =>{
        this.setState((previousState)=>{
            return {isSignUp: !previousState.isSignUp}
        })
    }

    render(){

        let formElements = [];
        for(let key in this.state.controls){
            formElements.push({
                id: key,
                config: this.state.controls[key]
            })
        };

        let form = formElements.map( element => (
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
           
        ))

        if(this.props.loading){
            form = <Spinner/>
        }

        let errorMessage = null;
        if(this.props.error){
            errorMessage = (
                // Note: Firebase's Error Obj has a Message Property
                <p>{this.props.error.message}</p>
            );
        }

        let redirectNow = null;
        // 
        if(this.props.isAuthenticated){
            // console.log(this.props.authRedirectPath);
            redirectNow = <Redirect to={this.props.redirectPath}/>
        }

        return(

            <section className={style.AuthWrapper}>
                <div className={style.Auth}>
                    {redirectNow}
                    {this.state.isSignUp ? <h2>Sign Up</h2> : <h2>Login</h2>}
                    {errorMessage}
                    <form onSubmit={this.submitHandler}>
                        {form}
                        <Button btnType="Success" >Submit</Button>
                    </form>
                    <Button
                        clicked={this.swithAuthMode} 
                        btnType="Danger"
                    >
                        {this.state.isSignUp ? "Switch To Login" : "Switch To Sign Up"}
                    </Button>
                </div>
            </section>
        );
    }
}

const mapStateToProps = (state) =>{
    return{
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token != null,
        buildingBurger: state.burgerBuilder.building,
        redirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        onAuth: (email, password, isSignUp)=>dispatch(actions.auth(email, password, isSignUp)),
        onSetRedirectPath: (path)=>dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
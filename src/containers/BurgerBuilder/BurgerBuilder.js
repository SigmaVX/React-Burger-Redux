import React, {Component} from "react";
import Burger from "../../components/Burger/Burger";
import BurgerControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary"; 
import Spinner from "../../components/UI/Spinner/Spinner";
import ErrorHandler from "../ErrorHandler/ErrorHandler";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import axios from "../../API/Axios/Axios-Orders";


class BurgerBuilder extends Component {

    // Using State For UI Logic Only
    state = {
        showModal: false,
        // loading: false
    }

    componentDidMount(){
        console.log(this.props);
        this.props.onInitIngredients();
    }

    updatePurchaseState = (ingredients) =>{
        // Make an Array Of Object's Key Names
        const ingNames = Object.keys(ingredients);
        // Make an Array Of Object's Values
        const ingValues = ingNames.map(item=>{ return ingredients[item]})
        const sum = ingValues.reduce((sum, current)=>{
            return sum + current;
        }, 0);
        // Return True If Sum Is > 0
        return sum>0;
        // Some Logs
        // console.log(ingNames);
        // console.log(ingValues);
        // console.log("Total Items: ", sum);
    }

    showModal = () =>{
        // Opens Purchase Modal If User Is Logged In 
        if(this.props.isAuthenticated){
            this.setState({showModal: true}); 
            // Else Sends To Login - Sign Up
        } else {
            // Setting where user should go after they sign in
            // Updates redux so path is stored and used in Auth.js
            this.props.onSetAuthRedirectPath("/checkout");
            this.props.history.push("/auth");
        }
    }

    closeModal = () =>{
        this.setState({showModal: false});
        console.log(this.state.showModal);
    }

    purchaseBurger = () =>{
        // Sets purchased to false in Redux
        this.props.onPurchaseInit();
        this.props.history.push({pathname: '/checkout'});
    }

    render(){
        // console.log("Rendering");
        // Make an object listing items that should be disabled
        let disabledItems = {...this.props.ings};
        for(let key in disabledItems){
            if(disabledItems[key]===0){
                disabledItems[key] = true;
            } else {
                disabledItems[key] = false;
            }
        }

        // Conditional For Spinner and Order Summary
        let orderSummary = null;
        // Not Used Here Since We Have Redux Running Global Logic
        // if(this.state.loading){
        //     orderSummary = <Spinner/>
        // }

        // Conditional Spinner For Burger While Loading From State
        let burger = this.props.error ? <h1 style={{marginTop: "50%", textAlign: "center"}}>Ingredients Can't Be Loaded</h1> : <Spinner/>;
        if(this.props.ings){    
            burger = (
                <React.Fragment>
                    <Burger ingredients={this.props.ings}/>
                    <BurgerControls
                        // Note State Methods Get Their Params From Child Component
                        addIngredients={this.props.onIngredientAdded}
                        removeIngredients={this.props.onIngredientRemove}
                        disabledItems={disabledItems}
                        price={this.props.price}
                        canBuy={this.updatePurchaseState(this.props.ings)}
                        isAuth={this.props.isAuthenticated}
                        orderClicked={this.showModal}
                    />
                </React.Fragment>
            );
            orderSummary = <OrderSummary 
                                ingredients={this.props.ings} 
                                closeModal={this.closeModal}
                                purchaseBurger={this.purchaseBurger}
                                totalPrice={this.props.price}
                            />
        }
        

        return(
            <React.Fragment>
                <Modal showModal={this.state.showModal} closeModal={this.closeModal}>
                    {orderSummary}
                </Modal>
                {burger}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) =>{
    return{
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalOrderPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }   
}

const mapDispatchToProps = (dispatch) =>{
    return{
        onIngredientAdded: (ingName)=> dispatch(actions.addIngredient(ingName)),
        onIngredientRemove: (ingName)=> dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: ()=>dispatch(actions.initIngredients()),
        onPurchaseInit: ()=>dispatch(actions.purshaseBurgerInit()),
        onSetAuthRedirectPath: (path)=>dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(BurgerBuilder, axios));


// Alternate Setup of mapDispatchToProps
// return{
//     onIngredientAdded: (ingName)=> dispatch({type: actionTypes.ADD_INGREDIENT, ingredient: ingName}),
//     onIngredientRemove: (ingName)=> dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredient: ingName}) 
// }
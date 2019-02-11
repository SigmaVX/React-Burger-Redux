import React from "react";
import style from "./Burger.module.css";
import Ingredients from "./Ingredients/Ingredients";
import {withRouter} from "react-router";

const Burger = (props) =>{

    // console.log("Burger Props: ", props);

    // This Function Operates in Three Stpes
    // 1-Make an array from the object Keys
    // 2-Make an array with empty spaces based on value for each key (using bracket notation)
    // 3-Set the value in each empty space to our JSX with type = the object keynames and index
    // 4-Use reduce and concat to merge the smaller arrays into one
    // I opeted To use the other function

    // ================= Not Using =======================================================
    // let ingredientList = Object.keys(props.ingredients).map((ingredientItem) =>{
    //     return[...Array(props.ingredients[ingredientItem])].map((_,index)=>{
    //         return <Ingredients key={ingredientItem + index} type={ingredientItem}/>;
    //     }).reduce((previousItem, currentItem)=>{
    //         return previousItem.concat(currentItem);
    //     }, []);
    // });
    // console.log(ingredientList); 
     // =================================================================================

    // This Function Turns Object Into Array But With Different Process
    // 1-Store our key for our loop and an empty array to hold items
    // 2-For each property run a loop based on the property value
    // 3-Push the JSX into the arry based on the loop iterations 

    let keyName;
    let listArray = [];
    for(keyName in props.ingredients) {
        // console.log(`${keyName} ${props.ingredients[keyName]}`);
        for(let i = 0; i < props.ingredients[keyName]; i++ ){
            listArray.push(
                <Ingredients key={keyName + i} type={keyName}/>
            );
        }
    }

    if(listArray.length===0){
        listArray=<p className={style.AddStuff}>Add Some Ingredients</p>
    }


    return(
        <div className={style.BurgerWrap} id="burger-wrap">
            <div  className={style.Burger}>
                <Ingredients type="bread-top"/>
                    {listArray}
                <Ingredients type="bread-bottom"/>

            </div>
        </div>
    );
}

export default withRouter(Burger);

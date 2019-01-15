import React from "react";
import {BurgerBuilder} from "./BurgerBuilder";
import {configure, shallow} from "enzyme";

// Needed To Make Enzyme Work With React
import Adapter from "enzyme-adapter-react-16";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
configure({adapter: new Adapter()})


describe("Testing BurgerBuilder", ()=>{

    // Set Global Variable To Hold Our Component
    let wrapper;

    beforeEach(()=>{
        // Storing The Componet So It Can Be Analyzed
        // Adding Emptry Prop Function Since This Class Uses componentDidMount 
        wrapper = shallow(<BurgerBuilder onInitIngredients={()=>{}}/>);
    })

    it("Should Render Build Controls When Ingredients Are Recieved", ()=>{
        wrapper.setProps({ings: {salad: 1, meat: 1}});
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    })
})



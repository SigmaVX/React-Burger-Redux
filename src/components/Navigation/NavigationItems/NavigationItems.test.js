import React from "react";
import {configure, shallow} from "enzyme";
import NavigationItems from "./NavigationItems";
import NavigationItem from "./NavigationItem/NavigationItem";

// Needed To Make Enzyme Work With React
import Adapter from "enzyme-adapter-react-16";
configure({adapter: new Adapter()})


// Testing with Jest and Enzyme
describe("Testing <NavigationItems/>", ()=>{

    // Set Global Variable To Hold Our Component
    let wrapper;

    beforeEach(()=>{
        // Storing The Componet So It Can Be Analyzed
        wrapper = shallow(<NavigationItems/>);
    })
    
    // Set A Single Test An The Expectation
    it("Should Show Two Nav Items If Not Authenticated", ()=>{
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    })

    it("Should Show Three Nav Items If Authenticated", ()=>{
        // Set props using the setProps so can test auth scenarios
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    })

    it("Should Show Logout If Authenticated", ()=>{
        wrapper.setProps({isAuthenticated: true});
        // Use contains and toEqual methods to search for JSX if logged in 
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
    })
})
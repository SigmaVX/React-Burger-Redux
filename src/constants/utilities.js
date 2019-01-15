export const updateObject = (oldObject, updateItem)=>{
    return{
        ...oldObject,
        ...updateItem
    }
};


export const validationCheck = (value, rules) =>{
    let isValid = true;
    if(rules.required){
        // Set Boolean Based On If String Is Empty
        // Trim removes white spaces
        isValid = value.trim() !== "" && isValid;
    }

    if(rules.minLength){
        // Set Boolean Based On Min Length Requirement
        isValid = value.length > rules.minLength && isValid;
        // console.log(isValid); 
    }

    if(rules.maxLength){
        // Set Boolean Based On Max Length Requirement
        // && isValid Assures Other Rules All Pass
        isValid = value.length < rules.maxLength && isValid; 
    }

    return isValid;
}
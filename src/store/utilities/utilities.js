export const updateObject = (oldObject, updateItem)=>{
    return{
        ...oldObject,
        ...updateItem
    }
};
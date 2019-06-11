import * as ActionTypes from './ActionTypes';

export const Recipes = (state={
    isLoading:true,
    recipes:[],
    errMess:null
}, action)=>{
    switch(action.type){
        case ActionTypes.RECIPE_LOADING:
            return {...state, isLoading:true, recipes:[], errMess:null}
        case ActionTypes.ADD_RECIPE:
            return {...state, isLoading:false, recipes:action.payload, errMess:null}
        case ActionTypes.RECIPE_FAILED:
            return {...state, isLoading:false, recipes:[], errMess:action.payload}
        case ActionTypes.ADD_SINGLERECIPE:
        var recipe = action.payload;
            return {...state, isLoading:false, recipes:state.recipes.concat(recipe), errMess:null}
        case ActionTypes.DELETED_RECIPE:
        var deletedRecipe = action.payload;
        const filteredRecipes = state.recipes.filter((recipe)=>
        recipe._id !== deletedRecipe._id);
            return {...state, isLoading:false, recipes:filteredRecipes, errMess:null}
        case ActionTypes.UPDATE_RECIPE_SUCCESS:
            // var updatedRecipe = action.payload;
            // const updatedRecipe = state.recipes.filter(recipe=>recipe._id!==updatedRecipe._id);
            // return {...state, isLoading:false, recipes:updatedRecipe, errMess:null}

           return [
        ...state.recipes.filter(recipe => recipe._id !== action.payload._id),
        Object.assign({}, action.payload)
      ]
       default:
        return state;     
    }
}
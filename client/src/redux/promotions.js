import * as ActionTypes from './ActionTypes';

export const Promotions = (state={
    isLoading:true,
    promotions:[],
    errMess:null
}, action)=>{
    switch(action.type){
        case ActionTypes.PROMOTION_LOADING:
            return {...state, isLoading:true, promotions:[], errMess:null}
        case ActionTypes.ADD_PROMOTION:
            return {...state, isLoading:false, promotions:action.payload, errMess:null}
        case ActionTypes.PROMOTION_FAILED:
            return {...state, isLoading:false, promotions:[], errMess:action.payload}
       default:
        return state;     
    }
}
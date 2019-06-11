import * as ActionTypes from './ActionTypes';

export const Founders = (state={
    isLoading:true,
    founders:[],
    errMess:null
}, action)=>{
    switch(action.type){
        case ActionTypes.FOUNDER_LOADING:
            return {...state, isLoading:true, founders:[], errMess:null}
        case ActionTypes.ADD_FOUNDER:
            return {...state, isLoading:false, founders:action.payload, errMess:null}
        case ActionTypes.FOUNDER_FAILED:
            return {...state, isLoading:false, founders:[], errMess:action.payload}
       default:
        return state;     
    }
}
import * as ActionType from './actionType'; 

export const Dishes = (state = {isLoading:true,errmsg:null,dishes:[]},action)=>{
    switch (action.type) {
        case ActionType.ADD_DISHES:
            return {...state, isLoading:false, errmsg:null, dishes:action.payload}
        case ActionType.DISHES_LOADING:
            return {...state, isLoading:true, errmsg: null, dishes: []}
        case ActionType.DISHES_FAILED:
            return {...state, isLoading:false, errmsg:action.payload,dishes:[]}
        default:
            return state;
    }
}

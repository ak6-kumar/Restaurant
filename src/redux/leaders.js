import { LEADERS } from '../shared/leaders';
import * as ActionTypes  from './actionType';

export const Leaders = (state={
    isLoading:false,
    errmsg:null,
    leaders:[]
},action)=>{
    switch (action.type) {
        case ActionTypes.LEADERS_LOADING:
            return {...state,isLoading:true,errmsg:null,leaders:[]};
        case ActionTypes.LEADERS_FAILED:
            return {...state,isLoading:false,errmsg:action.payload,leaders:[]};
        case ActionTypes.ADD_LEADERS:
            return {...state,isLoading:false,errmsg:null,leaders:action.payload};
        default:
            return state;
    }
}

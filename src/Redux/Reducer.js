import { ADD_CUSTOMER, DELETE_CUSTOMER, FAIL_REQUEST, GET_CUSTOMER_LIST, GET_CUSTOMER_OBJ, MAKE_REQUEST, UPDATE_CUSTOMER } from "./ActionType";

const initialstate = {
    loading: true,
    userlist: [],
    userobj: {},
    errmessage: ''
}

export const Reducer = (state=initialstate, action) => {
    switch (action.type) {
        case MAKE_REQUEST:
                return {
                    ...state,
                    loading:true
                }
        case FAIL_REQUEST:
                return {
                    ...state,
                    loading:false,
                    errmessage:action.payload
                }
        case GET_CUSTOMER_LIST:
                return {
                    loading:false,
                    errmessage:'',
                    userlist:action.payload,
                    userobj: {}
                }
        case DELETE_CUSTOMER:
            return{
                ...state,
                loading: false
            }
        case ADD_CUSTOMER:
            return{
                ...state,
                loading: false
            }
        case UPDATE_CUSTOMER:
            return{
                ...state,
                errmessage:'',
                loading: false
            }
        case GET_CUSTOMER_OBJ:
            return{
                ...state,
                loading: false,
                userobj:action.payload
            }
        default: return state;
    }
}
import { toast } from "react-toastify"
import { ADD_CUSTOMER, DELETE_CUSTOMER, FAIL_REQUEST, GET_CUSTOMER_LIST, GET_CUSTOMER_OBJ, MAKE_REQUEST, UPDATE_CUSTOMER } from "./ActionType"
import axios from 'axios'
import UpdateCustomer from "../Component/UpdateCustomer"

export const makeRequest= () => {
    return {
        type:MAKE_REQUEST
    }
}

export const failRequest=(err) => {
    return {
        type:FAIL_REQUEST,
        payload:err
    }
}

export const getUserList=(data) => {
    return {
        type:GET_CUSTOMER_LIST,
        payload:data
    }
}

export const deleteCustomer= () => {
    return {
        type:DELETE_CUSTOMER
    }
}

export const addCustomer= () => {
    return {
        type:ADD_CUSTOMER
    }
}

export const updateCustomer= () => {
    return {
        type:UPDATE_CUSTOMER
    }
}

export const getCustomerObj= (data) => {
    return {
        type:GET_CUSTOMER_OBJ,
        payload:data
    }
}

export const FetchUserList = () => {
    return (dispatch) => {
        dispatch(makeRequest());
        axios.get('https://getinvoices.azurewebsites.net/api/Customers').then(res=>{
            const userlist = res.data;
            dispatch(getUserList(userlist));
        }).catch(err=>{
            dispatch(failRequest(err.message));
        })
    }
}

export const removeCustomer = (code) => {
    return (dispatch) => {
        dispatch(makeRequest());
        axios.delete('https://getinvoices.azurewebsites.net/api/Customer/' + code).then(res=>{
            dispatch(deleteCustomer());
        }).catch(err=>{
            dispatch(failRequest(err.message));
        })
    }
}

export const FunctionAddCustomer = (data) => {
    return (dispatch) => {
        dispatch(makeRequest());
        axios.post('https://getinvoices.azurewebsites.net/api/Customer', data).then(res=>{
            dispatch(addCustomer());
            toast.success('User add successfully.')
        }).catch(err=>{
            dispatch(failRequest(err.message));
        })
    }
}

export const FunctionUpdateCustomer = (custObj, data, code) => {
    //console.log(custObj);
    //console.log(data);
    const salutation = custObj.salutation;
    const initials = custObj.initials;
    const id = custObj.id;
    const firstname = data.firstname;
    const lastname = data.lastname;
    const email = data.email;
    const country_code = data.country_code;
    const phone_Number = data.phone_Number;
    const gender = data.gender;    
    const balance = data.balance;
    const firstname_ascii = custObj.firstname_ascii;
    const firstname_country_rank = custObj.firstname_country_rank;
    const firstname_country_frequency = custObj.firstname_country_frequency;
    const lastname_ascii = custObj.lastname_ascii;
    const lastname_country_rank = custObj.lastname_country_rank;
    const lastname_country_frequency = custObj.lastname_country_frequency;
    const password = custObj.password;
    const country_code_alpha = custObj.country_code_alpha;
    const country_name = custObj.country_name;
    const primary_language_code = custObj.primary_language_code;
    const primary_language = custObj.primary_language;
    const currency = custObj.currency;
    const partitionKey = custObj.partitionKey;
    const rowKey = custObj.rowKey;
    const timestamp = custObj.timestamp;
    const eTag = custObj.eTag;

    const fData = { id, salutation, initials, firstname, firstname_ascii, gender,
        firstname_country_rank, firstname_country_frequency, lastname, lastname_ascii, lastname_country_rank,
        lastname_country_frequency, email, password, country_code, country_code_alpha, country_name,
        primary_language_code, primary_language, balance, phone_Number, currency, partitionKey,
        rowKey, timestamp, eTag
    }
    console.log(fData);
    return (dispatch) => {
        dispatch(makeRequest());
        axios.post('https://getinvoices.azurewebsites.net/api/Customer/'+code, fData).then(res=>{
            dispatch(UpdateCustomer());
            toast.success('User updated successfully.')
        }).catch(err=>{
            console.log(err);
            dispatch(failRequest(err.message));
        })
    }
}

export const FetchUserObj = (code) => {
    return (dispatch) => {
        dispatch(makeRequest());
        axios.get('https://getinvoices.azurewebsites.net/api/Customer/' + code).then(res=>{
            const customerObj = res.data;
            dispatch(getCustomerObj(customerObj));
        }).catch(err=>{
            dispatch(failRequest(err.message));
        })
    }
}
import { connect } from "react-redux";
import { FetchUserList, removeCustomer } from "../Redux/Action";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Customerlisting = (props) => {

    let USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    useEffect(() => {
        props.loaduser();    
    }, [])

    const handledelete = (code)=>{
        if(window.confirm('Do you want to delete?')){
            props.removecustomer(code);
            toast.success('Customer removed successfully.')
            props.loaduser();
        }
    }

    return (
        props.user.loading?<div><h2>Loading...</h2></div>:
        props.user.errmessage?<div><h2>{props.user.errmessage}</h2></div>:
        <div>
            <div className="card">
                <div className="card-header">
                    <h2>Customer Listing</h2>
                </div>
                <div className="card-body">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <td>CustomerId</td>
                                <td>Firstname</td>
                                <td>Lastname</td>
                                <td>Email</td>
                                <td>Phone_Number</td>
                                <td>Country_Code</td>
                                <td>Gender</td>
                                <td>Balance</td>
                                <td>Edit</td>
                                <td>Delete</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                props.user.userlist && props.user.userlist.map(item=>
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.firstname}</td>
                                            <td>{item.lastname}</td>
                                            <td><a href="mailto: item.email">{item.email}</a></td>
                                            <td>{item.phone_Number}</td>
                                            <td>{item.country_code}</td>
                                            <td>{item.gender}</td>
                                            <td>{USDollar.format(item.balance)}</td>
                                            <td><Link to={'../customer/edit/' + item.id} className="btn btn-primary">Edit</Link></td>
                                            <td><button onClick={() => {handledelete(item.id)}} className="btn btn-danger">Delete</button></td>
                                        </tr>
                                    )
                            }
                        </tbody>
                    </table>
                    <Link to={'../customer/add'} className="btn btn-success add">Add Customer [+]</Link>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loaduser: () => dispatch(FetchUserList()),
        removecustomer: (code) => dispatch(removeCustomer(code))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Customerlisting)
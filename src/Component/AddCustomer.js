import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FunctionAddCustomer } from "../Redux/Action";
import { toast } from "react-toastify";

const AddCustomer = () => {

    const [firstname, fnamechange] = useState('');
    const [lastname, lnamechange] = useState('');
    const [email, emailchange] = useState('');
    const [phone_Number, phonechange] = useState('');
    const [country_code, countrychange] = useState('');
    const [gender, genderchange] = useState('');
    const [balance, balancechange] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fnameRef = useRef(null);
    const emailRef = useRef(null);
    const validate = () => {
        let result = true;

        if(email === "" || email === null || (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)))
        {
            result = false;
            emailRef.current.focus();
            toast.warning('Please Enter Valid Email.');
        }
        return result;
    }

    const handlesubmit = (e) => {
        e.preventDefault();
        if(validate()){
            const customerobj = { id:'', firstname, lastname, email, phone_Number, country_code, gender, balance }
            //console.log(customerobj);
            dispatch(FunctionAddCustomer(customerobj));
            navigate('/customer')
        }
    }

    return( 
        <div>
            <form onSubmit={handlesubmit}>
            <div className="card">
                <div className="card-header" style={{textAlign:'left'}}>
                    <h2>Add Customer</h2>
                </div>
                <div className="card-body" style={{textAlign:'left'}}>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="form-group">
                                <label>First Name : </label>
                                <input value={firstname} onChange={e=>fnamechange(e.target.value)} className="form-control"></input>
                            </div>
                        </div>
                        <div className="col-sm-12">
                            <div className="form-group">
                                <label>Last Name : </label>
                                <input value={lastname} onChange={e=>lnamechange(e.target.value)} className="form-control"></input>
                            </div>
                        </div>
                        <div className="col-sm-12">
                            <div className="form-group">
                                <label>Email : </label>
                                <input ref={emailRef} value={email} onChange={e=>emailchange(e.target.value)} className="form-control"></input>
                            </div>
                        </div>
                        <div className="col-sm-12">
                            <div className="form-group">
                                <label>Phone Number : </label>
                                <input value={phone_Number} onChange={e=>phonechange(e.target.value)} className="form-control"></input>
                            </div>
                        </div>
                        <div className="col-sm-12">
                            <div className="form-group">
                                <label>Country Code : </label>
                                <input value={country_code} onChange={e=>countrychange(e.target.value)} className="form-control"></input>
                            </div>
                        </div>
                        <div className="col-sm-12">
                            <div className="form-group">
                                <label>Gender : </label>
                                <input value={gender} onChange={e=>genderchange(e.target.value)} className="form-control"></input>
                            </div>
                        </div>
                        <div className="col-sm-12">
                            <div className="form-group">
                                <label>Balance : </label>
                                <input value={balance} onChange={e=>balancechange(e.target.value)} className="form-control"></input>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-footer" style={{textAlign:'left'}}>
                    <button className="btn btn-primary" type="submit">Submit</button> | &nbsp;
                    <Link  className="btn btn-success" to={'/customer'}>Back</Link>
                </div>
            </div>
            </form>
        </div>
    );
}

export default AddCustomer
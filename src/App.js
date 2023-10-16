import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Home from './Component/Home';
import Customerlisting from './Component/Customerlisting';
import AddCustomer from './Component/AddCustomer';
import UpdateCustomer from './Component/UpdateCustomer';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import Store from './Redux/Store';


function App() {
  return (
    <Provider store={Store}>
      <div className="App">
        <BrowserRouter>
        <div className='header'>
          <Link to={'/'}>Home</Link>&nbsp;&nbsp;&nbsp;
          <Link to={'/customer'}>Customer</Link>
        </div>
          <Routes>
            <Route path='/' element={<Home></Home>}></Route>
            <Route path='/customer' element={<Customerlisting></Customerlisting>}></Route>
            <Route path='/customer/add' element={<AddCustomer></AddCustomer>}></Route>
            <Route path='/customer/edit/:code' element={<UpdateCustomer></UpdateCustomer>}></Route>
          </Routes>
        </BrowserRouter>
        <ToastContainer className="toast-position" position='bottom-right'></ToastContainer>
      </div>
    </Provider>
  );
}

export default App;

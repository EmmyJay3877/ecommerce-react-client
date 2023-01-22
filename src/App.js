import React from 'react';
import HomePage from './components/HomePage';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ItemDetails from './components/ItemDetails';
import { StateProvider } from './StateContext';
import Dashboard from './components/dashboard/Dashboard';
import Profile from './components/dashboard/Profile';
import CompleteSignup from './components/signup/CompleteSignup';
import EmailMsg from './components/signup/EmailMsg';
import Proceed from './components/signup/Proceed';
import ForgetPassword from './components/login/ForgetPassword';
import VerifyCode from './components/login/VerifyCode';
import ResetPassword from './components/login/ResetPassword';
import Customer from './components/dashboard/Customer';

const App = () => {
  return (
    <StateProvider>
    <Router>
      <Routes>
      <Route path="/" exact element={<HomePage/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/itemdetails" element={<ItemDetails/>} />
      <Route path='/customer' element={<Customer/>}>
      <Route index path="/customer/*" element={<Dashboard/>} />
      <Route path='/customer/profile' element={<Profile/>} />
      </Route>
      <Route path='/completesignup/*' element={<CompleteSignup/>} />
      <Route path='/emailmsg' element={<EmailMsg/>} />
      <Route path='/proceed/*' element={<Proceed/>} />
      <Route path='/forgetpassword' element={<ForgetPassword/>} />
      <Route path='/verifycode/*' element={<VerifyCode/>} />
      <Route path='/resetpassword' element={<ResetPassword/>} />
      </Routes>
    </Router>
    </StateProvider>
  );
}

export default App;

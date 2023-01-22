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
  console.log(process.env.SECURE_TOKEN);
  return (
    <StateProvider>
    <Router>
      <Routes>
      <Route path="https://gilded-biscotti-09800a.netlify.app/" exact element={<HomePage/>} />
      <Route path="https://gilded-biscotti-09800a.netlify.app/login" element={<Login/>} />
      <Route path="https://gilded-biscotti-09800a.netlify.app/signup" element={<Signup/>} />
      <Route path="https://gilded-biscotti-09800a.netlify.app/itemdetails" element={<ItemDetails/>} />
      <Route path='https://gilded-biscotti-09800a.netlify.app/customer' element={<Customer/>}>
      <Route index path="https://gilded-biscotti-09800a.netlify.app/customer/*" element={<Dashboard/>} />
      <Route path='https://gilded-biscotti-09800a.netlify.app/customer/profile' element={<Profile/>} />
      </Route>
      <Route path='https://gilded-biscotti-09800a.netlify.app/completesignup/*' element={<CompleteSignup/>} />
      <Route path='https://gilded-biscotti-09800a.netlify.app/emailmsg' element={<EmailMsg/>} />
      <Route path='https://gilded-biscotti-09800a.netlify.app/proceed/*' element={<Proceed/>} />
      <Route path='https://gilded-biscotti-09800a.netlify.app/forgetpassword' element={<ForgetPassword/>} />
      <Route path='https://gilded-biscotti-09800a.netlify.app/verifycode/*' element={<VerifyCode/>} />
      <Route path='https://gilded-biscotti-09800a.netlify.app/resetpassword' element={<ResetPassword/>} />
      </Routes>
    </Router>
    </StateProvider>
  );
}

export default App;

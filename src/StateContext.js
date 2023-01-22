import React from 'react'
import { createContext, useContext, useState, useEffect } from 'react'

const StateContext = createContext();

export const StateProvider = ({children})=>{
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);
    const [response, setRes] = useState()
    const [loggedIn, setLoggedin] = useState(false)
    const [customer, setCustomer] = useState({})
    const [pswrdResponse, setPswrdResponse] = useState()
    const [show, setShow] = useState(false);
    const [interValId, setIntervalId] = useState(null)

    const handleClose = ()=> {
      setShow(false);
      sessionStorage.removeItem('token')
      window.location.href = `http://localhost:3000/login/`
    }

    const checkInterVal = ()=>{
        const id = setInterval(verifyToken, 600000);
        setIntervalId(id)
        return () => clearInterval(interValId);
    }

    const errorMsg = 'An error has occured'

    const responseTimeOut = ()=>{
        setTimeout(() => {
            setRes('')
        }, 6000);
    }

    const onAdd = (itemId, quantity) => {
        let token_data = sessionStorage.getItem('token')
        const createOrder = async () => {
            try {
                const res = await fetch(`https://ecommerce-fastapi-server.onrender.com/orders/${itemId}/${quantity}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token_data}`
                    },
                    body: JSON.stringify({
                        'item_id': itemId,
                        'q': quantity
                    })
                })
                const data = await res.json()
                const statusCode = await res.status;
                if (statusCode === 201 && data) {
                    if (cartItems === undefined) setCartItems(data)
                    else{
                        setCartItems([...cartItems, {...data}])
                    }
                    setRes(`${data.quantity} ${data.item_name} added to your cart`)
                    updateCart()
                    responseTimeOut()
                } else if(statusCode===401) setShow(true)
            } catch (error) {
                setRes(errorMsg)
                responseTimeOut()
            }
          }
          createOrder()
        }

    const onRemove = (orderId) => {
        let token_data = sessionStorage.getItem('token')
        const deleteOrder = async () => {
            try{
                const res = await fetch(`https://ecommerce-fastapi-server.onrender.com/orders/${orderId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token_data}`
                    }
                })
                const data = await res.json()
                const statusCode = await res.status
                if(statusCode===200 && 'data' in data) {
                    setCartItems(prevCartItems=> prevCartItems.filter(prevCartItem=> prevCartItem.order_id !== orderId))
                    setRes(data.data)
                    responseTimeOut()
                } else if(statusCode===401) setShow(true)        
            }catch (error){
                setRes(errorMsg)
                responseTimeOut()
            }
        }
        deleteOrder()
    }

    const updateCart = () => {
        let token_data = sessionStorage.getItem('token')
        const getOrder = async () => {
            try{
                const res = await fetch(`https://ecommerce-fastapi-server.onrender.com/orders/`, {
                    headers: {
                        'Authorization': `Bearer ${token_data}`
                    }
                })
                const data = await res.json()
                const statusCode = await res.status
                if(statusCode === 200 && data) setCartItems(data);
                if(statusCode === 404 && data) setCartItems()
                else if(statusCode===401) setShow(true)
            }catch(error){
                alert(errorMsg)
            }
        }
        getOrder()
    }

    const updateOrderItemQty = async (id, quantity) => {
        let token_data = sessionStorage.getItem('token')
        try {
            const res = await fetch(`https://ecommerce-fastapi-server.onrender.com/orders/orderitem/${id}/${quantity}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token_data}`
                },
                body: JSON.stringify({
                    'id': id,
                    'q': quantity
                })
            })
            const data = await res.json()
            const statusCode = await res.status
            if (statusCode === 200) setCartItems(data)
            else if(statusCode===401) setShow(true)    
        }catch(error){
            setRes(errorMsg)
            responseTimeOut()
        }
    }
    
    const login = async (event) => {
        event.preventDefault()
        const email = event.target.form.elements.email.value;
        const password = event.target.form.elements.password.value;
        const info = {
            grant_type: 'password',
            username: email,
            password: password,
          };
        try {
            const res = await fetch(`https://ecommerce-fastapi-server.onrender.com/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(info).toString()
            })
            const data = await res.json()
            const statusCode = await res.status
            if(statusCode === 200 && data.access_token !== undefined){
                setRes('')
                const token = data.access_token
                sessionStorage.setItem('token', token)
                window.location.href = `http://localhost:3000/customer/`;
            }
            else if('detail' in data){
                setRes(data.detail)
                responseTimeOut()
            }
        } catch (error) {
            setRes(errorMsg)
            responseTimeOut()
        }
    }

    const verifyToken = async () => {
        try {
            const res = await fetch('https://ecommerce-fastapi-server.onrender.com/customers/check-token/', {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            })
            const statusCode = await res.status
            if (statusCode!==200) {
                setShow(true)
            }
        } catch (error) {
            alert(error)
        }
    }

    const signup = async (event) => {
        event.preventDefault()
        const username = event.target.form.elements.username.value;
        const email = event.target.form.elements.email.value;
        const password = event.target.form.elements.password.value;
        try{
            const res = await fetch('https://ecommerce-fastapi-server.onrender.com/customers/', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'username': username,
                    'email': email,
                    'password': password
                })
            })
            const data = await res.json()
            const statusCode = await res.status;
            if (statusCode === 201 && data.access_token !== undefined) {
                setRes()
                const token = data.access_token
                const emailVerificationTemplate = `
                <!DOCTYPE html>
                <html>
                  <head>
                    <title>Email Verification</title>
                  </head>
                  <body>
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td align="center">
                          <table width="600" cellpadding="0" cellspacing="0" border="0">
                            <!-- Header -->
                            <tr>
                              <td bgcolor="#333333" style="padding: 40px 0;">
                                <h1 style="color: #ffffff; font-size: 24px; font-family: Arial, sans-serif;">Email Verification</h1>
                              </td>
                            </tr>
                            <!-- Content -->
                            <tr>
                              <td bgcolor="#ffffff" style="padding: 40px;">
                              <p style="color: #666666; font-size: 16px; font-family: Arial, sans-serif;">Hey ${username}</p>
                                <p style="color: #666666; font-size: 16px; font-family: Arial, sans-serif;">Thank you for signing up for our service. Please click the link below to verify your email address:</p>
                                <a href="http://localhost:3000/proceed/?token=${token}" style="color: #0000ff; font-family: Arial, sans-serif;">Verify my email</a>
                              </td>
                            </tr>
                            <!-- Footer -->
                            <tr>
                              <td bgcolor="#333333" style="padding: 40px;">
                                <p style="color: #ffffff; font-size: 16px; font-family: Arial, sans-serif;">Copyright 2021. All rights reserved.</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </body>
                </html>
              `;

                await window.Email.send({
                    SecureToken : "6125ee12-1ec6-4865-9d1f-9a45f23e84b2",
                    To : email,
                    From : 'mackenziemominskq37@gmail.com',
                    Subject : "Email Verification",
                    Body : emailVerificationTemplate
                }).then(
                message => {
                    console.log(message)

                    sessionStorage.setItem('token', token)

                    window.location.href = 'http://localhost:3000/emailmsg/';
                }
                );
            }
            else if('detail' in data){
                setRes(data.detail)
                responseTimeOut()
            }
        } catch(error){
            setRes(errorMsg)
            responseTimeOut()
        }
    }


    const completeSignup = (event, token_data)=>{
        event.preventDefault()
        const phone = event.target.form.elements.phone.value;
        const city = event.target.form.elements.city.value;
        const region = event.target.form.elements.region.value;
        sessionStorage.setItem('token', token_data)
        const createProfile = async ()=>{
            try{
                const res = await fetch('https://ecommerce-fastapi-server.onrender.com/customers/profile/', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token_data}`
                    },
                    body: JSON.stringify({
                        'phone_number': phone,
                        'city': city,
                        'region': region
                    })
                })
                const data = await res.json()
                const statusCode = await res.status
                if (statusCode === 201 && 'data' in data) {
                    window.location.href = 'http://localhost:3000/customer/';
                }
            } catch (error) {
                setRes(errorMsg)
                responseTimeOut()
            }
        }
        createProfile()
    }


    const fetchCustomer = ()=>{
        let token_data = sessionStorage.getItem('token')
        const getCustomerProfile = async()=>{
            try{
                const res = await fetch(`https://ecommerce-fastapi-server.onrender.com/customers/get_profile`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token_data}`
                    }
                })
                const data = await res.json()
                const statusCode = await res.status;
                if (statusCode === 200) setCustomer(data)
                else if(statusCode===401) setShow(true)
            } catch (error){
                alert('An error has occured')
                window.location.href = `http://localhost:3000/customer/`;
            }
        }
        getCustomerProfile()
    }

    const checkEmail = async (event)=>{
        event.preventDefault()
        const email = event.target.form.elements.email.value;
        try {
            const res = await fetch('https://ecommerce-fastapi-server.onrender.com/customers/verify/', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'email': email
                })
            })
            const data = await res.json()
            const statusCode = await res.status
            if (statusCode === 200 && 'data' in data) {
                 setRes(data.data)
                 const code = await data.code
                 const codeTemplate = `
                 <!DOCTYPE html>
                 <html>
                   <head>
                     <title>Email Verification</title>
                   </head>
                   <body>
                     <table width="100%" cellpadding="0" cellspacing="0" border="0">
                       <tr>
                         <td align="center">
                           <table width="600" cellpadding="0" cellspacing="0" border="0">
                             <!-- Header -->
                             <tr>
                               <td bgcolor="#333333" style="padding: 40px 0;">
                                 <h1 style="color: #ffffff; font-size: 24px; font-family: Arial, sans-serif;">Email Verification</h1>
                               </td>
                             </tr>
                             <!-- Content -->
                             <tr>
                               <td bgcolor="#ffffff" style="padding: 40px;">
                               <p style="color: #666666; font-size: 16px; font-family: Arial, sans-serif;">Hey</p>
                                 <p style="color: #666666; font-size: 16px; font-family: Arial, sans-serif;">Your password reset code is</p>
                                 <h1>${code}</h1>
                                 <p style="color: #666666; font-size: 16px; font-family: Arial, sans-serif;">Please take note of the code above</p>
                               </td>
                             </tr>
                             <!-- Footer -->
                             <tr>
                               <td bgcolor="#333333" style="padding: 40px;">
                                 <p style="color: #ffffff; font-size: 16px; font-family: Arial, sans-serif;">Copyright 2021. All rights reserved.</p>
                               </td>
                             </tr>
                           </table>
                         </td>
                       </tr>
                     </table>
                   </body>
                 </html>
               `;

               await window.Email.send({
                SecureToken : "6125ee12-1ec6-4865-9d1f-9a45f23e84b2",
                To : email,
                From : 'mackenziemominskq37@gmail.com',
                Subject : "Password Reset Code",
                Body : codeTemplate
            }).then(
            message => {
                console.log(message)
                setTimeout(() => {
                    window.location.href = `http://localhost:3000/verifycode/?id=${data.id}`;
                }, 6000);
            }
            );
            }
            else if ('detail' in data){
                setRes(data.detail)
                responseTimeOut()
            }
        } catch (error) {
            setRes(errorMsg)
            responseTimeOut()
        }
    }

    const resendCode = async (event, id) => {
        event.preventDefault()
        try {
                const res = await fetch(`https://ecommerce-fastapi-server.onrender.com/customers/resend/`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "id": id
                    })
                })
                const data = await res.json()
                const statusCode = await res.status
                if (statusCode === 200 && 'data' in data) {
                     setRes(data.data)
                     const code = await data.code
                     const codeTemplate = `
                     <!DOCTYPE html>
                     <html>
                       <head>
                         <title>Email Verification</title>
                       </head>
                       <body>
                         <table width="100%" cellpadding="0" cellspacing="0" border="0">
                           <tr>
                             <td align="center">
                               <table width="600" cellpadding="0" cellspacing="0" border="0">
                                 <!-- Header -->
                                 <tr>
                                   <td bgcolor="#333333" style="padding: 40px 0;">
                                     <h1 style="color: #ffffff; font-size: 24px; font-family: Arial, sans-serif;">Email Verification</h1>
                                   </td>
                                 </tr>
                                 <!-- Content -->
                                 <tr>
                                   <td bgcolor="#ffffff" style="padding: 40px;">
                                   <p style="color: #666666; font-size: 16px; font-family: Arial, sans-serif;">Hey</p>
                                     <p style="color: #666666; font-size: 16px; font-family: Arial, sans-serif;">Your password reset code is</p>
                                     <h1>${code}</h1>
                                     <p style="color: #666666; font-size: 16px; font-family: Arial, sans-serif;">Please take note of the code above</p>
                                   </td>
                                 </tr>
                                 <!-- Footer -->
                                 <tr>
                                   <td bgcolor="#333333" style="padding: 40px;">
                                     <p style="color: #ffffff; font-size: 16px; font-family: Arial, sans-serif;">Copyright 2021. All rights reserved.</p>
                                   </td>
                                 </tr>
                               </table>
                             </td>
                           </tr>
                         </table>
                       </body>
                     </html>
                   `;
    
                   await window.Email.send({
                    SecureToken : "6125ee12-1ec6-4865-9d1f-9a45f23e84b2",
                    To : data.email,
                    From : 'mackenziemominskq37@gmail.com',
                    Subject : "Password Reset Code",
                    Body : codeTemplate
                }).then(
                async message =>{ 
                    console.log(message)

                    await deleteCode(id)
                }
                );

            }
                else if ('detail' in data){
                    setRes(data.detail)
                    responseTimeOut()
                }
        } catch (error) {
            setRes(errorMsg)
            responseTimeOut()
        }
    }

    const checkCode = async (event)=>{
        event.preventDefault()
        const code = event.target.form.elements.code.value;
        try {
            const res = await fetch('https://ecommerce-fastapi-server.onrender.com/customers/verify_code/', {
                method: 'POST',
                body: JSON.stringify({
                    "code": code
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await res.json()
            const statusCode = await res.status
            if (statusCode===200 && 'access_token' in data) {
                setRes('')
                const token = data.access_token
                sessionStorage.setItem('token', token)
                window.location.href = 'http://localhost:3000/resetpassword/';
            }
            else if ('detail' in data){
                setRes(data.detail)
                responseTimeOut()
            }
        } catch (error) {
            setRes(errorMsg)
            responseTimeOut()
        }
    }

    const deleteCode = async (id) => {
        try {
            const res = await fetch('https://ecommerce-fastapi-server.onrender.com/customers/delete_code/', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "id": id
                })
            })
            const statusCode = await res.status;
            if (statusCode===200) {
                setRes('Code has expired. Resend code')
                responseTimeOut()
            }
        } catch (error) {
            setRes(errorMsg)
            responseTimeOut()
        }
    }

    const updateProfile = (event) => {
        event.preventDefault()
        const phone = event.target.form.elements.phone.value;
        const city = event.target.form.elements.city.value;
        const region = event.target.form.elements.region.value;
        let token_data = sessionStorage.getItem('token')
        const putProfile = async ()=>{
            try{
                const res = await fetch('https://ecommerce-fastapi-server.onrender.com/customers/profile/update/', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token_data}`
                    },
                    body: JSON.stringify({
                        'phone_number': phone,
                        'city': city,
                        'region': region
                    })
                })
                const data = await res.json()
                const statusCode = await res.status
                if (statusCode === 200 && data) setRes(data.data)
                else if(statusCode===401) setShow(true)
            } catch (error) {
                setRes(`${errorMsg}. Could not update profile`)
                responseTimeOut()
            }
        }
        putProfile()
        fetchCustomer()
    }

    const updatePassword = (event)=>{
        event.preventDefault()
        const password = event.target.form.elements.newPassword.value;
        let token_data = sessionStorage.getItem('token');
        const putNewPassword = async ()=>{
            try{
                const res = await fetch('https://ecommerce-fastapi-server.onrender.com/customers/update_password/', {
                    method: 'PUT',
                    body: JSON.stringify({
                        'password': password
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token_data}`
                    }
                })
                const data = await res.json()
                const statusCode =  await res.status
                if (statusCode === 200 && 'data' in data) {
                    if(loggedIn===false){
                        sessionStorage.removeItem('token')
                        window.location.href = 'http://localhost:3000/login/';
                    } else{
                        setPswrdResponse(data.data)
                        setTimeout(() => {
                            setPswrdResponse('')
                        }, 6000);
                    }
                } else if(statusCode===401) setShow(true)
            }catch (error){
                setPswrdResponse(`${errorMsg}, could not update password`)
                setTimeout(() => {
                    setPswrdResponse('')
                }, 10000);
            }
        }
        putNewPassword()
    } 

    const toggleCartItemQuantity = (id, value) => {
        let orderItem = cartItems.find(cartItem=> cartItem.orderitem_id===id)
        let {orderitem_id, quantity, item_name} = orderItem
        if(value === 'inc') {
            quantity++
            updateOrderItemQty(orderitem_id, quantity)
            setRes(`1 ${item_name} added`)
            responseTimeOut()
        }else if(value === 'dec') {
            if(quantity > 1){
                quantity--
                updateOrderItemQty(orderitem_id, quantity) 
                setRes(`1 ${item_name} removed`)
                responseTimeOut()     
            }
        }
    } 

    const updateTotalPriceAndQuantity = () => {
        if (Array.isArray(cartItems)){
            let totalP = 0
            let totalQ = 0
            for (const cartItem of cartItems) {
                totalP += cartItem.total_price       
            }
            for (const cartItem of cartItems) {
                totalQ += cartItem.quantity
            }
            setTotalPrice(totalP);
            setTotalQuantities(totalQ)
        }else {
            setTotalPrice(0)
            setTotalQuantities(0)
        }
    }

    useEffect(()=>{
        updateTotalPriceAndQuantity()
    }, [cartItems, showCart, qty])

    // useEffect(()=>{
    //     updateCart()
    // }, [showCart])

    const incQty = () => {
        setQty((prevQty) => prevQty + 1);
      }
    
    const decQty = () => {
        setQty((prevQty) => {
          if(prevQty - 1 < 1) return 1;
         
          return prevQty - 1;
        });
      }

    return <StateContext.Provider 
    value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        customer,
        response,
        loggedIn,
        pswrdResponse,
        setPswrdResponse,
        fetchCustomer,
        updateProfile,
        updatePassword,
        completeSignup,
        setLoggedin,
        setRes,
        updateCart,
        updateTotalPriceAndQuantity,
        toggleCartItemQuantity,
        login,
        signup,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
        errorMsg,
        checkEmail,
        checkCode,
        resendCode,
        deleteCode,
        handleClose,
        checkInterVal,
        show,
        setQty
      }}
    >
            {children}
    </StateContext.Provider>
}

export const useStateContext = () => useContext(StateContext);
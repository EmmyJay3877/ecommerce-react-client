import React from 'react'
import '../index.css'
import { useStateContext } from '../StateContext'
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';


const Cart = () => {
  const cartRef = useRef();
  const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuantity, onRemove, response, setRes } = useStateContext();

  useEffect(()=>{
    setRes()
  }, [])

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button
        type="button"
        className="cart-heading text-red-500"
        onClick={() => setShowCart(false)}>
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantities} items)</span>
        </button>

        {
          response && (
            <p className="text-red-500 text-sm ml-6 font-semibold">{response}</p>
          )
        }

        {(cartItems === undefined || cartItems === []) && (
          <div className="empty-cart text-black">
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link to={"/customer"}>
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

          {Array.isArray(cartItems) ? <div className="product-container">
          {cartItems.map((item) => (
            <div className="product" key={item.orderitem_id}>
              <img src={item.item_image} className="cart-product-image" />
              <div className="item-desc">
                <div className="flex top">
                  <h5>{item.item_name}</h5>
                  <h4>${item.total_price}</h4>
                </div>
                <div className="flex bottom">
                  <div>
                  <p className="quantity-desc">
                    <span className="minus" onClick={() => toggleCartItemQuantity(item.orderitem_id, 'dec') }>
                    <AiOutlineMinus />
                    </span>
                    <span className="num">{item.quantity}</span>
                    <span className="plus" onClick={() => toggleCartItemQuantity(item.orderitem_id, 'inc') }><AiOutlinePlus /></span>
                  </p>
                  </div>
                  <button
                    type="button"
                    className="remove-item"
                    onClick={() => {
                      onRemove(item.order_id)
                    }}
                  >
                    <TiDeleteOutline />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div> : null}
        {(cartItems !== undefined && cartItems !== []) && (
          <div className="cart-bottom text-black">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className="btn-container">
              <button type="button" className="btn">
                Pay with Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
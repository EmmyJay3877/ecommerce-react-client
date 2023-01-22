import React from 'react'
import '../index.css'
import { Link } from 'react-router-dom'


const Item = ({itemCard: {image, id, name, price}}) => {

  return (
    <div>
           <Link to={`/itemdetails/?id=${id}`}>
              <div className="product-card">
                <img 
                  src={image}
                  width={250}
                  height={250}
                  className="product-image"
                />
                <p className="product-name">{name}</p>
                <p className="product-price">${price}</p>
              </div>
            </Link>
    </div>
  )
}

export default Item
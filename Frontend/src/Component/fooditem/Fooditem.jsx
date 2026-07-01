import React from 'react'
import '../fooditem/fooditem.css'
import { assets } from '../../assets/assets'
import { useContext } from 'react'
import { Storecontext } from '../../context/Storecontext'
const Fooditem = ({id,name,price,description,image}) => {

    // const[itemCount,setItemCount] =useState(0)
const{cartItems,addToCart,removeFromCart} = useContext(Storecontext)
const imageSrc = image?.startsWith('http') ? image : image?.startsWith('/uploads') ? `${import.meta.env.VITE_SERVER_URL}${image}` : image?.includes('/') ? image : `${import.meta.env.VITE_SERVER_URL}/uploads/${image}`

  return (
    <div className='food-item'>
        <div className="food-item-container">
            <img className='food-item-image' src={imageSrc} alt="" />
        {
            !cartItems[id]
            ?<img className='add' onClick={()=> addToCart(id) } src={assets.add_icon_white} alt="" />
    :<div className=' food-item-counter'>
     <img onClick={()=>removeFromCart(id)}  src={assets.remove_icon_red} alt="" />
     <p>{cartItems[id]}</p>
     <img onClick={()=>addToCart(id)}  src={assets.add_icon_green  } alt="" />
    </div>

        }
        </div>
<div className="food-item-info">
    <div className="food-item-name-rating">
        <p>{name}</p>
        <img src={assets.rating_starts} alt="" />
    </div>
    <p className='food-item-desc'>{description}</p>
    <p className='food-item-price'>₹{price} </p>
</div>
    </div>
  )
}

export default Fooditem
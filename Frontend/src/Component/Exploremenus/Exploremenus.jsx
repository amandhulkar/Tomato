import React, { useContext } from 'react'
import '../Exploremenus/exploremenus.css'
import { menu_list } from '../../assets/assets'
import { Storecontext } from '../../context/Storecontext'
const Exploremenus = ({category,setCategory}) => {
  const { food_list } = useContext(Storecontext)
  const assetCategories = menu_list.map((item) => item.menu_name)
  const extraCategories = [...new Set(food_list.map((item) => item.category))].filter((item) => !assetCategories.includes(item))
  const allCategories = [
    ...menu_list,
    ...extraCategories.map((item) => ({ menu_name: item }))
  ]

  return (
    <div className='explore-menu' id='explore-menu'>
<h1>Explore our menu</h1>
<p className='explore-menu-text'>Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings and elevate your dining expreence.one delicious meal at a time. </p>
    <div className="explore-menu-list">
        {
            allCategories.map( (item,index)=>{
                return(
                    <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className="explore-menu-list-item">
                        {item.menu_image
                            ? <img className={category===item.menu_name?"active":""} src={item.menu_image} alt="" />
                            : <div className={category===item.menu_name?"category-placeholder active":"category-placeholder"}>{item.menu_name.charAt(0)}</div>
                        }
                    <p>{item.menu_name}</p>
                    </div>
                )
            }

            )
        }
    </div>
    <hr />
    </div>
  )
}

export default Exploremenus
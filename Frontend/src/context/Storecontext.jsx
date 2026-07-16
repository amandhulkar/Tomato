import { createContext, useEffect, useState } from "react";
import { getMeApi, loginApi, signupApi } from "../api/authApi";
import { listFoodApi } from "../api/foodApi";

export const Storecontext = createContext(null)

const StorecontextProvider =(props)=> {

    const [foodList, setFoodList] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loadFoods = async () => {
            try {
                const data = await listFoodApi();
                setFoodList(data.foods || []);
            } catch (error) {
                console.error(error.message);
            }
        }

        loadFoods();
    }, []);

    useEffect(() => {
        const loadUser = async () => {
            if (!token) return;

            try {
                const data = await getMeApi();
                setUser(data.user);
            } catch (error) {
                localStorage.removeItem('token');
                setToken('');
                setUser(null);
            }
        }

        loadUser();
    }, [token]);

    const login = async (formData) => {
        const data = await loginApi(formData);
        localStorage.setItem('token', data.token);
        setToken(data.token);
        setUser(data.user);
        return data;
    }

    const signup = async (formData) => {
        const data = await signupApi(formData);
        localStorage.setItem('token', data.token);
        setToken(data.token);
        setUser(data.user);
        return data;
    }

    const logout = () => {
        localStorage.removeItem('token');
        setToken('');
        setUser(null);
    }

    const addToCart= (itemId) => {
if(!cartItems[itemId]){
    setCartItems((prev)=>({...prev,[itemId]:1}) )
}
else{
    setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
}
    };
    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
    };


const getTotalCartAmount =() => {
    let totalAmount = 0;
    for(const item in cartItems)
        {
            if(cartItems[item]>0){

                let itemInfo = foodList.find((product)=>product._id === item);
                if (itemInfo) {
                    totalAmount+= itemInfo.price*cartItems[item];
                }
            }

        }
        return totalAmount;
}

    const contextValue ={
food_list: foodList,
cartItems,
setCartItems,
addToCart,
removeFromCart,
getTotalCartAmount,
token,
user,
isAuthenticated: Boolean(token),
login,
signup,
logout
    }

    return(
        <Storecontext.Provider value={contextValue}>
        {props.children}
        </Storecontext.Provider>
    )
}

export default StorecontextProvider;
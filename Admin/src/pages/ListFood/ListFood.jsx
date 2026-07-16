import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { listFoodApi, removeFoodApi } from '../../api/foodApi'
import './ListFood.css'

const getImageSrc = (image) => {
  if (!image) return ''
  if (image.startsWith('http')) return image
  if (image.startsWith('/')) return `${import.meta.env.VITE_SERVER_URL}${image}`
  return `${import.meta.env.VITE_SERVER_URL}/uploads/${image}`
}

const ListFood = () => {
  const [foods, setFoods] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchFoods = async () => {
    try {
      setLoading(true)
      const data = await listFoodApi()
      setFoods(data.foods)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const removeFood = async (id) => {
    if (!confirm('Delete this food item?')) return

    try {
      await removeFoodApi(id)
      setFoods((prev) => prev.filter((food) => food._id !== id))
    } catch (err) {
      alert(err.message)
    }
  }

  useEffect(() => {
    fetchFoods()
  }, [])

  return (
    <div className="admin-page list-food">
      <div className="admin-card">
        <h2>List Food</h2>
        {loading && <p>Loading foods...</p>}
        {error && <p className="admin-error">{error}</p>}
        <div className="food-table">
          <div className="food-table-row food-table-head">
            <p>No.</p>
            <p>Image</p>
            <p>Name</p>
            <p>Category</p>
            <p>Price</p>
            <p>Action</p>
          </div>
          {foods.map((food, index) => (
            <div key={food._id} className="food-table-row">
              <p>{index + 1}</p>
              <img src={getImageSrc(food.image)} alt={food.name} />
              <p>{food.name}</p>
              <p>{food.category}</p>
              <p>₹{food.price}</p>
              <div className="food-actions">
                <Link to={`/edit/${food._id}`}>Edit</Link>
                <button onClick={() => removeFood(food._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ListFood

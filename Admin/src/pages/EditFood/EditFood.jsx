import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { listFoodApi, updateFoodApi } from '../../api/foodApi'
import './EditFood.css'

const categories = ['Salad', 'Rolls', 'Deserts', 'Sandwich', 'Cake', 'Pure Veg', 'Pasta', 'Noodles', 'Other']

const getImageSrc = (image) => {
  if (!image) return ''
  if (image.startsWith('http')) return image
  if (image.startsWith('/uploads')) return `${import.meta.env.VITE_SERVER_URL}${image}`
  return `${import.meta.env.VITE_SERVER_URL}/uploads/${image}`
}

const EditFood = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [image, setImage] = useState(null)
  const [currentImage, setCurrentImage] = useState('')
  const [formData, setFormData] = useState({ name: '', description: '', price: '', category: 'Salad' })
  const [customCategory, setCustomCategory] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(false)

  const onChangeHandler = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  useEffect(() => {
    const fetchFood = async () => {
      try {
        setFetching(true)
        const data = await listFoodApi()
        const food = data.foods.find((item) => item._id === id)

        if (!food) {
          setError('Food item not found')
          return
        }

        const categoryExists = categories.includes(food.category)
        setFormData({
          name: food.name,
          description: food.description,
          price: food.price,
          category: categoryExists ? food.category : 'Other'
        })
        setCustomCategory(categoryExists ? '' : food.category)
        setCurrentImage(food.image)
      } catch (err) {
        setError(err.message)
      } finally {
        setFetching(false)
      }
    }

    fetchFood()
  }, [id])

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    setMessage('')
    setError('')

    const finalCategory = formData.category === 'Other' ? customCategory.trim() : formData.category

    if (!finalCategory) {
      setError('Please enter a category name')
      return
    }

    const data = new FormData()
    data.append('name', formData.name)
    data.append('description', formData.description)
    data.append('price', formData.price)
    data.append('category', finalCategory)

    if (image) {
      data.append('image', image)
    }

    try {
      setLoading(true)
      await updateFoodApi(id, data)
      setMessage('Food updated successfully')
      setTimeout(() => navigate('/list'), 700)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const previewImage = image ? URL.createObjectURL(image) : getImageSrc(currentImage)

  return (
    <div className="admin-page add-food edit-food">
      <div className="admin-card">
        <h2>Edit Food</h2>
        {fetching ? <p>Loading food...</p> : (
          <form onSubmit={onSubmitHandler} className="add-food-form">
            <div>
              <p>Food Image</p>
              <label className="image-upload">
                {previewImage ? <img src={previewImage} alt="Preview" /> : <span>Choose Image</span>}
                <input onChange={(e) => setImage(e.target.files[0])} type="file" accept="image/*" hidden />
              </label>
              <small>Choose a new image only if you want to replace the old one.</small>
            </div>
            <div>
              <p>Product Name</p>
              <input name="name" value={formData.name} onChange={onChangeHandler} type="text" placeholder="Food name" required />
            </div>
            <div>
              <p>Description</p>
              <textarea name="description" value={formData.description} onChange={onChangeHandler} rows="5" placeholder="Food description" required />
            </div>
            <div className="add-food-row">
              <div>
                <p>Category</p>
                <select name="category" value={formData.category} onChange={onChangeHandler}>
                  {categories.map((category) => <option key={category} value={category}>{category}</option>)}
                </select>
                {formData.category === 'Other' && (
                  <input
                    className="custom-category-input"
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    type="text"
                    placeholder="Enter new category"
                    required
                  />
                )}
              </div>
              <div>
                <p>Price</p>
                <input name="price" value={formData.price} onChange={onChangeHandler} type="number" min="1" placeholder="₹" required />
              </div>
            </div>
            {message && <p className="admin-success">{message}</p>}
            {error && <p className="admin-error">{error}</p>}
            <div className="edit-food-actions">
              <button type="button" className="admin-btn cancel-btn" onClick={() => navigate('/list')}>Cancel</button>
              <button className="admin-btn" disabled={loading}>{loading ? 'Updating...' : 'Update Food'}</button>
            </div>
          </form>
        )}
        {!fetching && error && !formData.name && <p className="admin-error">{error}</p>}
      </div>
    </div>
  )
}

export default EditFood

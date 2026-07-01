import { useState } from 'react'
import { addFoodApi } from '../../api/foodApi'
import './AddFood.css'

const categories = ['Salad', 'Rolls', 'Deserts', 'Sandwich', 'Cake', 'Pure Veg', 'Pasta', 'Noodles', 'Other']

const AddFood = () => {
  const [image, setImage] = useState(null)
  const [formData, setFormData] = useState({ name: '', description: '', price: '', category: 'Salad' })
  const [customCategory, setCustomCategory] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const onChangeHandler = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    setMessage('')
    setError('')

    if (!image) {
      setError('Please select a food image')
      return
    }

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
    data.append('image', image)

    try {
      setLoading(true)
      await addFoodApi(data)
      setMessage('Food added successfully')
      setFormData({ name: '', description: '', price: '', category: 'Salad' })
      setCustomCategory('')
      setImage(null)
      event.target.reset()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-page add-food">
      <div className="admin-card">
        <h2>Add Food</h2>
        <form onSubmit={onSubmitHandler} className="add-food-form">
          <div>
            <p>Upload Image</p>
            <label className="image-upload">
              {image ? <img src={URL.createObjectURL(image)} alt="Preview" /> : <span>Choose Image</span>}
              <input onChange={(e) => setImage(e.target.files[0])} type="file" accept="image/*" hidden />
            </label>
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
          <button className="admin-btn" disabled={loading}>{loading ? 'Adding...' : 'Add Food'}</button>
        </form>
      </div>
    </div>
  )
}

export default AddFood

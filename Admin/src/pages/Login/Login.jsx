import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginApi } from '../../api/authApi'
import './Login.css'

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const onChangeHandler = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      const data = await loginApi(formData)

      if (data.user.role !== 'admin') {
        throw new Error('Only admin users can access this panel')
      }

      localStorage.setItem('adminToken', data.token)
      localStorage.setItem('adminUser', JSON.stringify(data.user))
      navigate('/add')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-login">
      <form onSubmit={onSubmitHandler} className="admin-login-card">
        <h2>Admin Login</h2>
        <input name="email" value={formData.email} onChange={onChangeHandler} type="email" placeholder="Email" required />
        <input name="password" value={formData.password} onChange={onChangeHandler} type="password" placeholder="Password" required />
        {error && <p className="admin-error">{error}</p>}
        <button className="admin-btn" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
      </form>
    </div>
  )
}

export default Login

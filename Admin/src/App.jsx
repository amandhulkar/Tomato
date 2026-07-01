import { Navigate, Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import Login from './pages/Login/Login'
import AddFood from './pages/AddFood/AddFood'
import ListFood from './pages/ListFood/ListFood'
import EditFood from './pages/EditFood/EditFood'
import Orders from './pages/Orders/Orders'

const ProtectedLayout = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem('adminToken')

  if (!token) {
    return <Navigate to="/login" replace />
  }

  const onLogout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminUser')
    navigate('/login')
  }

  return (
    <div className="admin-layout">
      <Navbar onLogout={onLogout} />
      <div className="admin-content">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  )
}

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedLayout />}>
        <Route index element={<Navigate to="/add" replace />} />
        <Route path="add" element={<AddFood />} />
        <Route path="list" element={<ListFood />} />
        <Route path="edit/:id" element={<EditFood />} />
        <Route path="orders" element={<Orders />} />
      </Route>
    </Routes>
  )
}

export default App

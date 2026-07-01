import { NavLink } from 'react-router-dom'
import './Sidebar.css'

const Sidebar = () => {
  return (
    <div className="admin-sidebar">
      <NavLink to="/add">Add Food</NavLink>
      <NavLink to="/list">List Food</NavLink>
      <NavLink to="/orders">Orders</NavLink>
    </div>
  )
}

export default Sidebar

import './Navbar.css'

const Navbar = ({ onLogout }) => {
  return (
    <div className="admin-navbar">
      <h2>Tomato Admin</h2>
      <button onClick={onLogout}>Logout</button>
    </div>
  )
}

export default Navbar

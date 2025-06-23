import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faPowerOff, faAddressCard } from "@fortawesome/free-solid-svg-icons";
import logo from '../assets/images/logo.png'

function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [token, setToken] = useState("")
  // console.log(token);
const navigate = useNavigate()
  const handleLogout = () => {
    sessionStorage.removeItem('existingUser')
    sessionStorage.removeItem("token")
    setToken("")
    navigate('/')
  };
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
     const token = sessionStorage.getItem("token")
    setToken(token) 
    }
  }, [])
  return (
    <header className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div>
          <img src={logo} alt="Emotly Logo" className="h-10" />
        </div>

        {/* Desktop Navigation */}
        <nav className="space-x-6 hidden md:flex items-center">
          <Link to="/" className="hover:text-purple-400">Home</Link>
          <Link to="/journal" className="hover:text-purple-400">Journal</Link>
          <Link to="/analysis" className="hover:text-purple-400">Analysis</Link>
          <Link to="/contact" className="hover:text-purple-400">Contact</Link>
       {!token?   <Link to='/login'>    <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 bg-white text-gray-800 px-3 py-2 rounded hover:bg-gray-100"
          >Login</button></Link>
:
          
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 bg-white text-gray-800 px-3 py-2 rounded hover:bg-gray-100"
            >
              <img
                src="https://cdn-icons-png.freepik.com/512/8742/8742495.png"
                alt="User"
                className="w-8 h-8"
              />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow z-10">
                <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-gray-100">
                  <FontAwesomeIcon icon={faAddressCard} className="me-2" />Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  <FontAwesomeIcon icon={faPowerOff} className="me-2" />Logout
                </button>
              </div>
            )}
          </div>}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <FontAwesomeIcon icon={faBars} className="text-white w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 bg-black text-white space-y-2">
          <Link to="/" className="block hover:text-purple-400">Home</Link>
          <Link to="/journal" className="block hover:text-purple-400">Journal</Link>
          <Link to="/analysis" className="block hover:text-purple-400">Analysis</Link>
          <Link to="/contact" className="block hover:text-purple-400">Contact</Link>
        {!token?  <Link to='/login'>    <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 bg-white text-gray-800 px-3 py-2 rounded hover:bg-gray-100"
          >Login</button></Link>

       :
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 bg-white text-gray-800 px-3 py-2 rounded hover:bg-gray-100 mt-2"
            >
              <img
                src="https://cdn-icons-png.freepik.com/512/8742/8742495.png"
                alt="User"
                className="w-8 h-8"
              />
            </button>
            {dropdownOpen && (
              <div className="mt-2 w-48 bg-white text-black rounded shadow z-10">
                <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-gray-100">
                  <FontAwesomeIcon icon={faAddressCard} className="me-2" />Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  <FontAwesomeIcon icon={faPowerOff} className="me-2" />Logout
                </button>
              </div>
            )}
          </div>}
        </div>
      )}
    </header>
  );
}

export default Header;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';


import { useEffect, } from "react"
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
import { BsChevronDown } from "react-icons/bs"
import { useSelector } from "react-redux"




import { apiConnector } from "../services/apiconnector"
import { categories } from "../services/apis"
import { ACCOUNT_TYPE } from "../utils/constants"
import ProfileDropdown from "../components/core/Auth/ProfileDropDown"


import './Navbar.css';
import Navimage from '../assets/GOOD.jpg';
import { SlMenu } from 'react-icons/sl';
import ContactModal from '../Models/ContactModal';
const Navbar = () => {


  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { totalItems } = useSelector((state) => state.cart)

  const [subLinks, setSubLinks] = useState([])
  const [loading, setLoading] = useState(false)
  
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [openContactModal, setOpenContactModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openLogoutModal, setOpenLogoutModal] = useState(false); // State for Logout Modal

  const openRegister = () => setOpenRegisterModal(true);
  const closeRegister = () => setOpenRegisterModal(false);

  const openContact = () => setOpenContactModal(true);
  const closeContact = () => setOpenContactModal(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const openLogout = () => setOpenLogoutModal(true);
  const closeLogout = () => setOpenLogoutModal(false);

  const handleLogout = () => {

    setOpenLogoutModal(false);
    // Add any additional logout logic here
  };

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API)
        setSubLinks(res.data.data)
      } catch (error) {
        console.log("Could not fetch Categories.", error)
      }
      setLoading(false)
    })()
  }, [])


  return (
    <>
      <div className='Navbar-wrapper'>
        <div className='Navimg'>
          <Link to='/'>
            <img className='imgt' src={Navimage} alt='Nav logo' />
          </Link>
        </div>
        <div className='midbar'>
          <Link to='/' className='Click'>
            Home
          </Link>
          <Link to='/About' className='Click'>
            About Us
          </Link>
          <Link to='/Courses' className='Click'>
            Courses
          </Link>
          <Link to='/Community' className='Click'>
            Community
          </Link>
          <span className='Click' onClick={openContact}>
            Contact Us
          </span>
        </div>
        <div className='signupdiv'>
        <div className="btnparent">
  {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
    <Link to="/dashboard/cart" className="cart-link">
      <AiOutlineShoppingCart className="cart-icon" />
      {totalItems > 0 && (
        <span className="cart-counter">
          {totalItems}
        </span>
      )}
    </Link>
  )}
  {token === null && (
    <Link to="/login">
      <button className="btn login-btn">
        Log in
      </button>
    </Link>
  )}
  {token === null && (
    <Link to="/signup">
      <button className="btn signup-btn">
        Sign up
      </button>
    </Link>
  )}
  {token !== null && <ProfileDropdown />}
</div>

<button className="menu-btn">
  <AiOutlineMenu />
</button>

        </div>
        <span className='menu-toggle' onClick={toggleSidebar}>
          <SlMenu />
        </span>
      </div>
      <div className={`sidebar ${sidebarOpen ? 'active' : ''}`}>
        <span className='sidebar-close' onClick={toggleSidebar} aria-label='Close Sidebar'>✕</span>
        <div className='sidebar-links'>
          <Link to='/' className='Click' onClick={toggleSidebar}>
            Home
          </Link>
          <Link to='/About' className='Click' onClick={toggleSidebar}>
            About Us
          </Link>
          <Link to='/Courses' className='Click' onClick={toggleSidebar}>
            Courses
          </Link>
          <Link to='/Community' className='Click' onClick={toggleSidebar}>
            Community
          </Link>
          <span className='Click' onClick={() => { toggleSidebar(); openContact(); }}>
            Contact Us
          </span>
        </div>
        
        <div className="btnparent">
  {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
    <Link to="/dashboard/cart" className="cart-link">
      <AiOutlineShoppingCart className="cart-icon" />
      {totalItems > 0 && (
        <span className="cart-counter">
          {totalItems}
        </span>
      )}
    </Link>
  )}
  {token === null && (
    <Link to="/login">
      <button className="btn login-btn">
        Log in
      </button>
    </Link>
  )}
  {token === null && (
    <Link to="/signup">
      <button className="btn signup-btn">
        Sign up
      </button>
    </Link>
  )}
  {token !== null && <ProfileDropdown />}
</div>



      </div>
    
      {openContactModal && <ContactModal show={openContactModal} onClose={closeContact} />}
      
    </>
  );
};

export default Navbar;

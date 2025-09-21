import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import logo from "../assets/logo.png"

  

const Header = () => {
  const isLoggedin = useSelector((state) => state.user.isLoggedin)
  // const profilePicUrl = localStorage.getItem('profilePic');
  const profilePic = useSelector(state => state.user.profile_pic);

  console.log('Header isLoggedIn:', isLoggedin);
  console.log('Header profilePic:', profilePic);
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <Link to='/' className="btn btn-ghost normal-case p-0">
  <img src={logo} alt="Logo" className="w-29 h-20" /> 

</Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li><Link to='/about'>ABOUT</Link></li>
          <li><Link to='/contact'>CONTACT</Link></li>
          {isLoggedin ? (
            <li>
              <Link to='/profile'>
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="User Profile"
                    src={profilePic}
                    
                  />
                </div>
              </div>
              </Link>
            </li>
          ) : (
            <li><Link to='/login'>LOGIN</Link></li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Header

import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'

import Search from '../Search/Search'

const Header = () => {
  const { user } = useSelector((state) => state.auth)
  const location = useLocation()

  return (
    <>
      <div className='layout__header'>
        <Link to='/' className='header__logo'>
          {location.pathname !== '/' && <h1 className='sm-h1'>MOVIETIME</h1>}
        </Link>
        <Search />
        <div className='header__controls'>
          {!user && (
            <>
              <Link to='/login' className='link-text'>
                Login
              </Link>
              <span>/&nbsp;</span>
              <Link to='/register' className='link-text'>
                Sign Up
              </Link>
            </>
          )}
          {user && (
            <>
              <p className='label-text'>Welcome back, &nbsp;</p>
              <Link to='/dashboard' className='link-text'>
                {user.userName}
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Header

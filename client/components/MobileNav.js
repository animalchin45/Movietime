import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { logout, authReset } from '../features/auth/authSlice'

const MobileNav = () => {
    const { user } = useSelector((state) => state.auth)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onLogout = () => {
        dispatch(logout())
        dispatch(authReset())
        navigate('/')
    }

    // Mobile menu state and animation position
    const [hamburgerClass, setHamburgerClass] = useState(`hamburger hamburger--arrow`)
    const [mobileNavLinksClass, setMobileNavLinksClass] = useState({
        opacity: 0,
        width: '0%'
    })

    // Hamburger Menu close on click
    const handleMenuClick = () => {
        setHamburgerClass(`hamburger hamburger--arrow`)
        setMobileNavLinksClass({
            opacity: 0,
            width: '0%'
        })
    }

    // Hamburger open / close
    const handleHamburgerClick = () => {
        if (hamburgerClass === `hamburger hamburger--arrow`) {
            setHamburgerClass(`hamburger hamburger--arrow is-active`)
            setMobileNavLinksClass({
                opacity: 1,
                width: '75%'
            })
        } else {
            setHamburgerClass(`hamburger hamburger--arrow`)
            setMobileNavLinksClass({
                opacity: 0,
                width: '0%'
            })
        }
    }

    return (
        <div className="mobile-nav">
            <nav className="mobile-nav__links" onClick={() => handleMenuClick()} style={mobileNavLinksClass}>
                <div className='mobile-nav__welcome'>
                    {!user && <p>Welcome to Movietime</p>}
                    {user && <p>Welcome back, {user.userName}</p>}
                </div>
                
                {!user &&
                    <>
                        <Link className='link-text' to="/login">Login</Link>
                        <Link className='link-text' to="/register">Sign up</Link>
                    </> 
                }

                {user &&
                    <>
                        <Link className='link-text' to="/dashboard">Dashboard</Link>
                    </> 
                }
                

                {user && <div className='mobile-nav__logout'>
                    <button className='btn btn--large' onClick={onLogout}>
                        <p>Logout</p>
                    </button>
                </div>}
                <div className='mobile-nav__copy'>
                    <p className='small-text'>A Tim O'Brien Web Design Project</p>
                </div>
            </nav> 
            <button className={hamburgerClass} onClick={() => handleHamburgerClick()} type="button">
                <span className="hamburger-box">
                    <span className="hamburger-inner"></span>
                </span>
            </button>
        </div>
    )
}

export default MobileNav
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import MobileSearch from '../Search/MobileSearch'
import UserSignIn from '../UserSignIn'
import { searchButton, close } from '../../img/'

const MobileHeader = () => {
    const [openSearch, setOpenSearch] = useState(false)

    return (
        <>
            <div className='layout__header--mobile'>
                <p className='header__hamburger'>Menu</p>
                <Link to='/' className='header__logo'>
                    <h1 className='sm-h1'>MOVIETIME</h1>
                </Link>
                <div className='header__controls'>
                    <UserSignIn />
                    <button 
                        className='btn--mobile-search--toggle'
                        onClick={() => setOpenSearch(!openSearch)}
                    >
                        <img src={openSearch ? close : searchButton} />
                    </button>
                </div>
                {openSearch && <MobileSearch setOpenSearch={setOpenSearch} />}
            </div>
        </>
        
    )
}

export default MobileHeader
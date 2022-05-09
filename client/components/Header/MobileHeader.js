import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import MobileSearch from '../Search/MobileSearch'
// import UserSignIn from '../UserSignIn'
import { searchButton, close, user } from '../../img/'

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
                    <button className='btn--small'>
                        <img src={user} />
                    </button>
                    <button 
                        className='btn--small'
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
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import MobileSearch from '../Search/MobileSearch'
import User from '../../img/user.svg'
import SearchButton from '../../img/search.svg'
import Close from '../../img/close.svg'

const MobileHeader = () => {
    const { user } = useSelector((state) => state.auth)
    const [openSearch, setOpenSearch] = useState(false)

    return (
        <>
            <div className='layout__header--mobile'>
                <p className='header__hamburger'>Menu</p>
                <Link to='/' className='header__logo'>
                    <h1 className='sm-h1'>MOVIETIME</h1>
                </Link>
                <div className='header__controls'>
                    {user && <Link to='/dashboard' className='btn--modify'>
                        <User />
                    </Link>}
                    {!user && <Link to='/login' className='btn--modify'>
                        <User />
                    </Link>}
                    <button 
                        className='btn--modify'
                        onClick={() => setOpenSearch(!openSearch)}
                    >
                        {openSearch && <Close />}
                        {!openSearch && <SearchButton />}
                    </button>
                </div>
                {openSearch && <MobileSearch setOpenSearch={setOpenSearch} />}
            </div>
        </>
        
    )
}

export default MobileHeader
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import MobileSearch from '../Search/MobileSearch'
import MobileNav from '../MobileNav'
import SearchButton from '../../img/search.svg'
import Close from '../../img/close.svg'

const MobileHeader = () => {
    const [openSearch, setOpenSearch] = useState(false)

    return (
        <>
            <div className='layout__header--mobile'>
                <div>
                    <MobileNav />
                </div>
                <Link to='/' className='header__logo'>
                    <h1 className='sm-h1'>MOVIETIME</h1>
                </Link>
                <div className='header__controls'>
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
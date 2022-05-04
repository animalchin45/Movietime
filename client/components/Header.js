import React from 'react'
import { Link } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'

import Search from './Search'
import UserSignIn from './UserSignIn'
// import { logo } from '../img'

const Header = () => {
    const isMobile = useMediaQuery({ query: '(max-width: 960px)'})

    return (
        <>
            <div className='layout__header'>
                <Link to='/' className='header__logo'>
                    <h1 className='sm-h1'>MOVIETIME</h1>
                    {/*<img src={logo} />*/}
                </Link>
                <Search />
                {!isMobile && <UserSignIn />}
            </div>
        </>
        
    )
}

export default Header
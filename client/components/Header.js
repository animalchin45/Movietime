import React from 'react'
import { Link } from 'react-router-dom'

import Search from './Search'
import UserSignIn from './UserSignIn'
// import { logo } from '../img'

const Header = () => {
    return (
        <div className='layout__header'>
            <Link to='/' className='header__logo'>
                <h1 className='sm-h1'>MOVIETIME</h1>
                {/*<img src={logo} />*/}
            </Link>
            <Search />
            <UserSignIn />
        </div>
    )
}

export default Header
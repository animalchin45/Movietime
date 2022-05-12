import React from 'react'
import { Link } from 'react-router-dom'

import Search from '../Search/Search'
import { user } from '../../img/'

const Header = () => {

    return (
        <>
            <div className='layout__header'>
                <Link to='/' className='header__logo'>
                    <h1 className='sm-h1'>MOVIETIME</h1>
                </Link>
                <Search />
                <div className='header__controls'>
                    <button className='btn--small'>
                        <img src={user} />
                    </button>
                </div>
                
            </div>
        </>
        
    )
}

export default Header
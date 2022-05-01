import React from 'react'

import Tmdb from '../img/tmdblogo.svg'

const Footer = () => {
    return (
        <div className='layout__footer footer'>
            <p className='footer__copy label-text'>A Tim O'Brien Web Design Project</p>
            <div className='footer__tmdb'>
                <p>Powered by</p>
                <Tmdb />
            </div>
        </div>
    )
}

export default Footer
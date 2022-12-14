import React from 'react'

import { hero } from '../img'

const Hero = () => {
  return (
    <div className='hero' style={{ backgroundImage: `url(${hero})` }}>
      <h1 className='hero__logo'>MOVIETIME</h1>
      <h2 className='hero__text'>
        Millions of movies and tv shows ready to be discovered
      </h2>
      <div className='hero__overlay'></div>
    </div>
  )
}

export default Hero

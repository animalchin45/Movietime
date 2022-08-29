import React from 'react'
import { useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'

import { getTrailer } from './overviewServices'

const Trailer = () => {
  const { details } = useSelector((state) => state.details)
  const isMobile = useMediaQuery({ query: '(max-width: 960px)' })

  return (
    <>
      {details.results && (
        <div>
          <h4>Trailer</h4>
          <div className='show-details__trailers-media--content'>
            <iframe
              height={isMobile ? 200 : 300}
              width={isMobile ? 350 : 500}
              src={`https://www.youtube.com/embed/${getTrailer()}`}
              title='YouTube video player'
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </>
  )
}

export default Trailer

import React from 'react'
import { useSelector } from 'react-redux'

import CastCards from '../CastCards'

function Cast() {
  const { details } = useSelector((state) => state.details)

  return (
    <>
      {details.cast && (
        <div className='show-details__cast'>
          <h4>Cast</h4>
          <div className='show-grid'>
            <CastCards cast={details.cast} />
          </div>
        </div>
      )}
    </>
  )
}

export default Cast

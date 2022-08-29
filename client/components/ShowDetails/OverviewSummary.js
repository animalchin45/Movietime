import React from 'react'
import { useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'

import OverviewInfo from './OverviewInfo'
import { reel } from '../../img/index'

const OverviewSummary = () => {
  const { details } = useSelector((state) => state.details)
  const isMobile = useMediaQuery({ query: '(max-width: 960px)' })

  return (
    <div className='show-details__overview'>
      <div>
        {details.poster_path && (
          <img src={`https://image.tmdb.org/t/p/w342/${details.poster_path}`} />
        )}
        {!details.poster_path && <img src={reel} />}
      </div>

      {!isMobile && <OverviewInfo />}
    </div>
  )
}

export default OverviewSummary

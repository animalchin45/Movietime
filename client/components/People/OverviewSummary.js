import React from 'react'
import { useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'

import OverviewInfo from './OverviewInfo'
import { reel } from '../../img/index'

const OverviewSummary = () => {
  const { peopleDetails } = useSelector((state) => state.people)
  const isMobile = useMediaQuery({ query: '(max-width: 960px)' })

  return (
    <div className='people-details__overview'>
      <div>
        {peopleDetails.profile_path && (
          <img
            src={`https://image.tmdb.org/t/p/h632/${peopleDetails.profile_path}`}
          />
        )}
        {!peopleDetails.profile_path && <img src={reel} />}
      </div>

      {!isMobile && <OverviewInfo />}
    </div>
  )
}

export default OverviewSummary

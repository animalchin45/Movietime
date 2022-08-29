import React from 'react'
import { useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'

import OverviewSummary from './OverviewSummary'
import OverviewInfo from './OverviewInfo'

const Overview = () => {
  const { details } = useSelector((state) => state.details)
  const isMobile = useMediaQuery({ query: '(max-width: 960px)' })

  // initialize backdrop
  const backdrop = {
    backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${details.backdrop_path})`,
  }

  return (
    <>
      <div style={backdrop} className='show-details__backdrop'>
        <div className='show-details__backdrop__overlay'></div>
      </div>

      <OverviewSummary />
      {isMobile && <OverviewInfo />}
    </>
  )
}

export default Overview

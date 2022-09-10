import React from 'react'
import { useMediaQuery } from 'react-responsive'

import OverviewSummary from './OverviewSummary'
import OverviewInfo from './OverviewInfo'

const Overview = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 960px)' })

  return (
    <>
      <div className='people-details__backdrop'></div>
      <OverviewSummary />
      {isMobile && <OverviewInfo />}
    </>
  )
}

export default Overview

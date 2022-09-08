import React from 'react'
import { useSelector } from 'react-redux'

import Loader from '../Loader'
import Overview from './Overview'
import Cast from './Cast'
import Trailer from './Trailer'
import Posters from './Posters'
import MediaViewer from '../MediaViewer/MediaViewer'

const ShowDetails = () => {
  const { details, isDetailsLoading, isTvContentLoading, isPostersLoading } =
    useSelector((state) => state.details)

  if (isDetailsLoading || isTvContentLoading || isPostersLoading) {
    return (
      <div className='layout__main show-details'>
        <Loader />
      </div>
    )
  }

  return (
    <>
      <div id='show-details' className='layout__main show-details'>
        <Overview />
        <Cast />
        <div className='show-details__trailers-media'>
          <Trailer />
          {details.results && <div></div>}
          <Posters />
        </div>
        <MediaViewer />
      </div>
    </>
  )
}

export default ShowDetails

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { favoriteClearError } from '../../features/favorite/favoriteSlice'

import Loader from '../Loader'
import Overview from './Overview'
import Cast from './Cast'
import Trailer from './Trailer'
import Posters from './Posters'
import MediaViewer from '../MediaViewer/MediaViewer'

const ShowDetails = () => {
  const dispatch = useDispatch()

  const {
    details,
    posters,
    isDetailsLoading,
    isTvContentLoading,
    isPostersLoading,
  } = useSelector((state) => state.details)

  useEffect(() => {
    return () => {
      dispatch(favoriteClearError)
    }
  }, [dispatch])

  if (isDetailsLoading || isTvContentLoading || isPostersLoading) {
    return <Loader />
  }

  return (
    <>
      <div id='media-component' className='layout__main show-details'>
        <Overview />
        <Cast />
        <div className='show-details__trailers-media'>
          <Trailer />
          {details.results && <div></div>}
          <Posters />
        </div>
        <MediaViewer media={posters} />
      </div>
    </>
  )
}

export default ShowDetails

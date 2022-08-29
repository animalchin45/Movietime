import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  mediaViewerReset,
  setPosition,
  setQuantity,
  setOpen,
  setSelectedMedia,
} from '../../features/modal/mediaViewerSlice'

const Posters = () => {
  const { posters } = useSelector((state) => state.details)
  const dispatch = useDispatch()

  useEffect(() => {
    // debuging - remove later
    // console.log(details)

    return () => {
      dispatch(mediaViewerReset())
    }
  }, [mediaViewerReset, dispatch])

  // render posters and backdrops
  const renderedPosters = posters.map((poster, index) => {
    return (
      <button
        key={poster.file_path}
        className='btn btn--media-card'
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w154${poster.file_path})`,
        }}
        onClick={() => onPosterClick(index, poster.file_path)}
      ></button>
    )
  })

  // open image viewer modal
  const onPosterClick = (index, url) => {
    // set quantity
    dispatch(setQuantity(posters.length))
    // set position
    dispatch(setPosition(index))
    // pass poster url
    dispatch(setSelectedMedia(url))
    // set open
    dispatch(setOpen(true))
  }

  return (
    <>
      {posters.length > 0 && (
        <div>
          <h4>Posters</h4>
          <div className='show-details__trailers-media--content show-details__trailers-media--content__poster-grid'>
            {renderedPosters}
          </div>
        </div>
      )}
    </>
  )
}

export default Posters

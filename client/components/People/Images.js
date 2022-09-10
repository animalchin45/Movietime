import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { mediaViewerReset } from '../../features/mediaViewer/mediaViewerSlice'

import {
  setPosition,
  setQuantity,
  setOpen,
  setSelectedMedia,
} from '../../features/mediaViewer/mediaViewerSlice'

function Images() {
  const { peopleImages } = useSelector((state) => state.people)
  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      dispatch(mediaViewerReset())
    }
  }, [mediaViewerReset, dispatch])

  // render posters and backdrops
  const renderedImages = peopleImages.map((images, index) => {
    return (
      <button
        key={images.file_path}
        className='btn btn--media-card'
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w154${images.file_path})`,
        }}
        onClick={() => onImageClick(index, images.file_path)}
      ></button>
    )
  })

  const onImageClick = (index, url) => {
    // set quantity
    dispatch(setQuantity(peopleImages.length))
    // set position
    dispatch(setPosition(index))
    // pass poster url
    dispatch(setSelectedMedia(url))
    // set open
    dispatch(setOpen(true))
  }

  return <>{renderedImages}</>
}

export default Images

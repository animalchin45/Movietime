import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import { toast } from 'react-toastify'

import Loader from '../Loader'

const OverviewInfo = () => {
  const { peopleDetails, isLoading } = useSelector((state) => state.people)
  const isMobile = useMediaQuery({ query: '(max-width: 960px)' })

  // SHOW LOADER WHILE ALL CONTENT IS LOADING
  if (isLoading) {
    return (
      <div className='people-details__overview__info'>
        <Loader />
      </div>
    )
  }

  return (
    <>
      <div className='show-details__overview__info'>
        <h3>{peopleDetails.name}</h3>
        <p>Born: {peopleDetails.birthday}</p>
        <p>From: {peopleDetails.place_of_birth}</p>
        <h4>Biography</h4>
        <p>{peopleDetails.biography.slice(0, 800)}... More</p>
      </div>
    </>
  )
}

export default OverviewInfo

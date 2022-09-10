import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Loader from '../Loader'
import Overview from './Overview'
import ShowCards from '../ShowCards'
import Images from './Images'
import MediaViewer from '../MediaViewer/MediaViewer'

import { reset } from '../../features/people/peopleSlice'

function PeopleDetails() {
  const dispatch = useDispatch()

  const { isLoading, peopleShows, peopleImages } = useSelector(
    (state) => state.people
  )

  useEffect(() => {
    return () => {
      dispatch(reset)
    }
  }, [dispatch])

  if (isLoading) {
    return (
      <div className='layout__main people-details'>
        <Loader />
      </div>
    )
  }

  return (
    <div id='media-component' className='layout__main people-details'>
      <Overview />

      <div className='people-details__known--title content-title'>
        {peopleShows.length > 0 && <h3>Also Known For</h3>}
      </div>
      <section className='people-details__known'>
        {peopleShows.length > 0 && (
          <div className='show-grid'>
            <ShowCards results={peopleShows} />
          </div>
        )}
      </section>

      <div className='people-details__images--title content-title'>
        {peopleImages.length > 0 && <h3>More Images</h3>}
      </div>
      <section className='people-details__images'>
        {peopleImages.length > 0 && (
          <div className='people-details__image-grid'>
            <Images />
          </div>
        )}
      </section>

      <MediaViewer media={peopleImages} />
    </div>
  )
}

export default PeopleDetails

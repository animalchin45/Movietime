import React from 'react'
import { useSelector } from 'react-redux'

import Loader from '../Loader'
import Overview from './Overview'
import ShowCards from '../ShowCards'
// import MediaViewer from '../MediaViewer/MediaViewer'

// import {
//   peopleDetails,
//   peopleImages,
//   peopleShows,
// } from '../../features/people/peopleSlice'

function PeopleDetails() {
  const { isLoading, peopleShows } = useSelector((state) => state.people)

  if (isLoading) {
    return (
      <div className='layout__main people-details'>
        <Loader />
      </div>
    )
  }

  return (
    <div className='layout__main people-details'>
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

      {/* <MediaViewer /> */}
    </div>
  )
}

export default PeopleDetails

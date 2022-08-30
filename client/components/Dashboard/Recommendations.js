import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ShowCards from '../ShowCards'

import {
  recommendSeed,
  recommendShows,
} from '../../features/recommend/recommendSlice'

function Recommendations() {
  const dispatch = useDispatch()

  const { favorites } = useSelector((state) => state.favorites)

  const { recommendResults } = useSelector((state) => state.recommend)

  useEffect(async () => {
    await dispatch(recommendShows(recommendSeed(favorites)))
  }, [])

  return (
    <>
      <div className='dashboard__recommend--title content-title'>
        {recommendResults.length > 0 && <h3>More for you...</h3>}
      </div>
      <section className='dashboard__recommend'>
        {recommendResults.length > 0 && (
          <div className='show-grid'>
            <ShowCards results={recommendResults} />
          </div>
        )}
      </section>
    </>
  )
}

export default Recommendations

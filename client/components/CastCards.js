import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import {
  peopleDetails,
  peopleImages,
  peopleShows,
} from '../features/people/peopleSlice'
import { resetSearchDisplay } from '../features/show/searchDisplaySlice'

import { male, female } from '../img/index'

const CastCards = ({ cast }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onClick = (id) => {
    dispatch(resetSearchDisplay())
    dispatch(peopleDetails(id))
    dispatch(peopleShows(id))
    dispatch(peopleImages(id))

    navigate('/people')
  }

  const renderedCards = cast.slice(0, 7).map((actor) => {
    return (
      <div className='card' key={actor.id}>
        <button className='btn btn--card' onClick={() => onClick(actor.id)}>
          {actor.profile_path && (
            <img src={`https://image.tmdb.org/t/p/w154${actor.profile_path}`} />
          )}
          {!actor.profile_path && (
            <img src={actor.gender === 2 ? male : female} />
          )}
        </button>
        <div className='u-padding-top'>
          <p>{actor.name}</p>
          <p className='sm-p'>
            <em>{actor.character}</em>
          </p>
        </div>
      </div>
    )
  })

  return <>{renderedCards}</>
}

export default CastCards

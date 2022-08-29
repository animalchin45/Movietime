import React from 'react'

import { male, female } from '../img/index'

const CastCards = ({ cast }) => {
  const renderedCards = cast.slice(0, 7).map((actor) => {
    return (
      <div className='card' key={actor.id}>
        {actor.profile_path && (
          <img src={`https://image.tmdb.org/t/p/w154${actor.profile_path}`} />
        )}
        {!actor.profile_path && (
          <img src={actor.gender === 2 ? male : female} />
        )}
        <div className='u-padding-top'>
          <p>{actor.name}</p>
        </div>
      </div>
    )
  })

  return <>{renderedCards}</>
}

export default CastCards

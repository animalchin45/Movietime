import React from 'react'
import { useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'

import { getMpaa, renderedCreated } from './overviewServices'

const OverviewInfo = () => {
    const { details } = useSelector((state) => state.details)
    const isMobile = useMediaQuery({ query: '(max-width: 960px)'})

    // render genres from details
    const renderedGenres = details.genres.map((genre, index) => {
        return (
            <p key={genre.id}>
                {(index ? ', ' : '') + genre.name}
            </p>
        )
    })

    // render cast names from details
    const renderedCast = details.cast.slice(0, 3).map((actor, index) => {
        return (
            <p key={actor.id}>
                {(index ? ', ' : '') + actor.name}
            </p>
        )
    })

    return (
        <>
            <div className='show-details__overview__info'>
                {details.original_name && <h3>{details.original_name}</h3>}
                {details.original_title && <h3>{details.original_title}</h3>}

                <div className='show-details__overview__info--release'>
                    {details.release_date && <p>{details.release_date.substring(0,4)}</p>}
                    {details.first_air_date && <p>{details.first_air_date.substring(0,4)}</p>}
                    {(details.release_dates || details.results) && <p className={isMobile ? 'mpaa' : 'mpaa--white'}>{getMpaa()}</p>}
                    {renderedGenres}
                    {details.runtime && <p>Runtime: {details.runtime} minutes</p>}
                    {details.episode_run_time && <p>Runtime: {details.episode_run_time}</p>}
                </div>

                <p><i>{details.tagline}</i></p>

                <p>Score: {details.vote_average}</p>

                <h4>Overview</h4>
                <p>{details.overview}</p>

                <div className='show-details__overview__info__crew'>
                    <div className='show-details__overview__info__crew--members'>
                        {(details.created_by && details.created_by.length > 0) && <p>Created By: </p>}
                        {details.created_by && renderedCreated(details.created_by, 'tv')}
                        {!details.created_by && <p>Directed By: </p>}
                        {!details.created_by && renderedCreated(details.crew, 'movie')}
                    </div>
                    {!isMobile && <div className='show-details__overview__info__crew--members'>
                        {(details.cast && details.cast.length > 0) && <p>Starring: </p>}
                        {renderedCast}
                    </div>}
                </div>
            </div>
        </>
        
    )

}

export default OverviewInfo
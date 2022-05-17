import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { reel } from '../img/index'
import { showDetails, tvRatings, getPosters, reset } from '../features/show/detailsSlice'
import { resetSearchDisplay } from '../features/show/searchDisplaySlice'

const ShowCards = ({ results }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onClick = async (media_type, id) => {
        dispatch(reset())
        dispatch(resetSearchDisplay())
        dispatch(showDetails({media_type, id}))
        if (media_type === 'tv') {
            dispatch(tvRatings({media_type, id}))
        }
        dispatch(getPosters({media_type, id}))
        navigate('/details')
    }

    const renderedCards = results.slice(0, 28).map((show) => {
        let showType

        if (show.release_date) {
            showType = 'movie'
        } else if (show.first_air_date) {
            showType = 'tv'
        }

        return (
            <div className='card' key={show.id}>
                <button className='btn--card' onClick={() => onClick(showType, show.id)}>
                    <img src={show.poster_path ? `https://image.tmdb.org/t/p/w154${show.poster_path}` : `${reel}`} />
                </button>
                <div className='u-padding-top'>
                    {show.original_title && <p className='label-text'>{show.original_title}</p>}
                    {show.release_date && <p className='label-text'>{show.release_date.substring(0,4)}</p>}
                    {show.original_name && <p className='label-text'>{show.original_name}</p>}
                    {show.first_air_date && <p className='label-text'>{show.first_air_date.substring(0,4)}</p>}
                </div>
            </div>
        )
    })

    return (
        <>
            {renderedCards}
        </>
    )
}

export default ShowCards
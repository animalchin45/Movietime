import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getTrailer } from './overviewServices'
import OverviewInfo from './OverviewInfo'
import CastCards from './CastCards'
import { reset, setPosition, setQuantity, setOpen, setSelectedMedia } from '../../features/modal/mediaViewerSlice'

const Overview = () => {
    const dispatch = useDispatch()

    const { details, posters } = useSelector((state) => state.details)

    useEffect(() => {
        // debuging - remove later
        console.log(details)
        
        return () => {
            dispatch(reset())
        }

    }, [details, reset, dispatch])

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

    // initialize backdrop
    const backdrop = {
        backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${details.backdrop_path})`
    }

    // render posters and backdrops
    const renderedPosters = posters.map((poster, index) => {
        return (
            <button 
                key={poster.file_path} 
                className='btn--media-card' 
                style={{backgroundImage: `url(https://image.tmdb.org/t/p/w154${poster.file_path})`}}
                // on click goes here
                onClick={() => onPosterClick(index, poster.file_path)}
            >
            </button>
        )
    })

    return (
        <>
            <div style={backdrop} className="show-details__backdrop">    
                <div className='show-details__backdrop__overlay'></div>
            </div>
            
            <OverviewInfo />

            {(details.cast && details.cast.length > 0) && <div className='show-details__cast'>
                <h4>Cast</h4>
                <div className='show-grid'>
                    <CastCards cast={details.cast} />
                </div>
            </div>}

            <div className='show-details__trailers-media'>
                {(details.results.length > 0) && <div>
                    <h4>Trailer</h4>
                    <div className='show-details__trailers-media--content'>
                        <iframe
                            height="300"
                            width="500"
                            src={`https://www.youtube.com/embed/${getTrailer()}`} 
                            title="YouTube video player" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                        >
                        </iframe>
                    </div>
                </div>}
                {(details.results.length > 0) && <div></div>}
                {(posters.length > 0) && <div>
                    <h4>Posters</h4>
                    <div className='show-details__trailers-media--content show-details__trailers-media--content__poster-grid'>
                        {renderedPosters}
                    </div>
                </div>}
            </div>
        </>
    )
}

export default Overview
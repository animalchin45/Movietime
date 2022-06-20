import React from 'react'
import { useSelector } from 'react-redux'

// filter out US mpaa certification
export const getMpaa = () => {
    const { details, tvContent } = useSelector((state) => state.details)

    if (details.release_dates) {
        const certs = details.release_dates.results.filter(result => result.iso_3166_1 === 'US')
        // Check if rating exists
        if (certs.length < 1) {
            return 'NR'
        } else {
            const rating = certs[0].release_dates.filter(date => date.certification !== '')
            if (rating.length < 1) {
                return 'NR'
            } else {
                return rating[0].certification
            }            
        }
        
    } else if (tvContent.results) {
        const certs = tvContent.results.filter(result => result.iso_3166_1 === 'US')
        // Check if rating exists
        if (certs.length < 1) {
            return 'NR'
        } else {
            return certs[0].rating
        }
    } else {
        return 'NR'
    }
}

// get crew for tv from details
export const renderedCreated = (creators, type) => {
    if (type === 'tv') {
        const value = creators.map((create, index) => {
            return (
                <>
                    {(index ? ', ' : '') + create.name}
                </>
            )
        })

        return value
    } else if (type === 'movie') {
        const directors = creators.filter(director => director.job === 'Director')

        const value = directors.map((direct, index) => {
            return (
                <>
                    {(index ? ', ' : '') + direct.name}
                </>
                    
             
            )
        })   
        
        return value
    }
}

// render genres from details
export const renderedGenres = () => {
    const { details } = useSelector((state) => state.details)
    const genres = details.genres.map((genre, index) => {
        return (
            <>
                {(index ? `, ` : '') + genre.name}
            </>
        )
    })

    return genres
}

// render cast names from details
export const renderedCast = () => {
    const { details } = useSelector((state) => state.details)
    const cast = details.cast.slice(0, 3).map((actor, index) => {
        return (
            <>
                {(index ? ', ' : '') + actor.name}
            </>
        )
    })

    return cast
}

// get trailer from videos list
export const getTrailer = () => {
    const { details } = useSelector((state) => state.details)

    const value = details.results.find(result => result.type === 'Trailer')

    if (!value) {
        return null
    }
    return value.key
}
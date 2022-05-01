import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import { trendingShows, reset } from '../features/show/trendingSlice'
import ShowCards from './ShowCards'
import Loader from "./Loader"

const TrendingShows = () => {
    const dispatch = useDispatch()
    const { trendingResults, isError, isLoading, message } = useSelector((state) => state.show)

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        dispatch(trendingShows())

        return () => {
            dispatch(reset())
        }
    }, [isError, message, dispatch])

    if (isLoading) {
        return (
            <Loader />
        )
    }

    return (
        <>
            <ShowCards results={trendingResults} />
        </>
    )
}

export default TrendingShows
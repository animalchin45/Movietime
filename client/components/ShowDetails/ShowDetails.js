import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Overview from './Overview'
import Loader from '../Loader'
import MediaViewer from '../modals/MediaViewer'

const ShowDetails = () => {
    const { isDetailsLoading, isTvContentLoading, isPostersLoading } = useSelector((state) => state.details)

    if (isDetailsLoading || isTvContentLoading || isPostersLoading) {
        return (
            <div className='layout__main show-details'>
                <Loader />
            </div>
        )
    }

    return (
        <>
            <div id='show-details' className='layout__main show-details'>
                <Overview />
                <MediaViewer />
            </div>
        </>
    )
}

export default ShowDetails
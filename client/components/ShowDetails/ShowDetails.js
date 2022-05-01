import React from 'react'
import { useSelector } from 'react-redux'

import Overview from './Overview'
import Loader from '../Loader'
import MediaViewerModal from '../modals/MediaViewerModal'

const ShowDetails = () => {
    const { isLoading } = useSelector((state) => state.details)

    if (isLoading) {
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
                <MediaViewerModal />
            </div>
        </>
    )
}

export default ShowDetails
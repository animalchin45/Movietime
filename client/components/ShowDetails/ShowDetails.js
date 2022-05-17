import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import Overview from './Overview'
import Loader from '../Loader'
import MediaViewerModal from '../modals/MediaViewerModal'

const ShowDetails = () => {
    const dispatch = useDispatch()
    const { isDetailsLoading, isTvContentLoading, isPostersLoading, isError, message } = useSelector((state) => state.details)

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

    }, [isError, message, dispatch])

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
                <MediaViewerModal />
            </div>
        </>
    )
}

export default ShowDetails
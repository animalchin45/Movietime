import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Modal from 'react-modal'
import { useMediaQuery } from 'react-responsive'

import { reset, changePosition, setSelectedMedia } from '../../features/modal/mediaViewerSlice'
import { left, right, close } from '../../img/'

const MediaViewerModal = () => {
    const dispatch = useDispatch()
    const { posters } = useSelector((state) => state.details)
    const { quantity, position, isOpen, selectedMedia } = useSelector((state) => state.mediaViewer)
    const isMobile = useMediaQuery({ query: '(max-width: 960px)'})

    const onNext = () => {
        if (position != (quantity - 1)) {
            const change = position + 1
            dispatch(changePosition(change))
            dispatch(setSelectedMedia(posters[change].file_path))
        } else {
            dispatch(changePosition(0))
            dispatch(setSelectedMedia(posters[0].file_path))
        }
    }

    const onPrev = () => {
        if (position != 0) {
            const change = position - 1
            dispatch(changePosition(change))
            dispatch(setSelectedMedia(posters[change].file_path))
        } else {
            const change = quantity - 1
            dispatch(changePosition(change))
            dispatch(setSelectedMedia(posters[change].file_path))
        }
    }

    const onClearModal = () => {
        dispatch(reset())
    }

    const styles = {
        content: {
            border: 'none',
            boxShadow: '0px 0px 10px -2px #1d2021',
            inset: `${isMobile ? '7rem' : '11.5rem'} 1rem 1rem`,
            padding: 0,
            position: 'fixed'
        }
    }

    return (
        <Modal
            ariaHideApp={false}
            parentSelector={() => document.querySelector('#show-details')}
            isOpen={isOpen}
            onRequestClose={onClearModal}
            contentLabel="Selected Media"
            closeTimeoutMS={200}
            style={styles}
        >
            <div className='media-modal'>
                <button className='btn--media-viewer btn--media-viewer--close'>
                    <img src={close} onClick={() => onClearModal()} />
                </button>
                <button className='btn--media-viewer' onClick={() => onPrev()}>
                    <img src={left} />
                </button>
                <img className='media-modal__img' src={`https://image.tmdb.org/t/p/w780${selectedMedia}`} />
                <button className='btn--media-viewer' onClick={() => onNext()}>
                    <img src={right} />
                </button>
            </div>
            
        </Modal>
    )
}

export default MediaViewerModal
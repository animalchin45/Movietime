import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Modal from 'react-modal'
import { useMediaQuery } from 'react-responsive'

import { mediaViewerReset, changePosition, setSelectedMedia } from '../../features/modal/mediaViewerSlice'
import { left, right } from '../../img'
import Close from '../../img/close.svg'

const MediaViewer = () => {
    const dispatch = useDispatch()
    const { posters } = useSelector((state) => state.details)
    const { quantity, position, isOpen, selectedMedia } = useSelector((state) => state.mediaViewer)
    const isMobile = useMediaQuery({ query: '(max-width: 960px)'})

    const [slide, setSlide] = useState('media-modal__img')

    // MODAL STYLE OVERRIDE
    const styles = {
        content: {
            border: 'none',
            boxShadow: '0px 0px 10px -2px #1d2021',
            inset: `${isMobile ? '7rem' : '11.5rem'} 1rem 1rem`,
            padding: 0,
            position: 'fixed'
        }
    }

    // NEXT POSTER
    const onNext = () => {
        if (position != (quantity - 1)) {
            setSlide('media-modal__img media-modal__img--left')
            setTimeout(() => {
                const change = position + 1
                dispatch(changePosition(change))
                dispatch(setSelectedMedia(posters[change].file_path))
                setSlide('media-modal__img media-modal__img--next')
            }, 200)
            setTimeout(() => {
                setSlide('media-modal__img')
            }, 400)
            
        } else {
            setSlide('media-modal__img--next')
            setTimeout(() => {
                dispatch(changePosition(0))
                dispatch(setSelectedMedia(posters[0].file_path))
                setSlide('media-modal__img')
            }, 200)
            setTimeout(() => {
                setSlide('media-modal__img')
            }, 400)
        }
    }

    // PREVIOUS POSTER
    const onPrev = () => {
        if (position != 0) {
            setSlide('media-modal__img media-modal__img--right')
            setTimeout(() => {
                const change = position - 1
                dispatch(changePosition(change))
                dispatch(setSelectedMedia(posters[change].file_path))
                setSlide('media-modal__img media-modal__img--prev')
            }, 200)
            setTimeout(() => {
                setSlide('media-modal__img')
            }, 400)
            
        } else {
            setSlide('media-modal__img media-modal__img--right')
            setTimeout(() => {
                const change = quantity - 1
                dispatch(changePosition(change))
                dispatch(setSelectedMedia(posters[change].file_path))
                setSlide('media-modal__img media-modal__img--prev')
            }, 200)
            setTimeout(() => {
                setSlide('media-modal__img')
            }, 400)
        }
    }

    // CLOSE MODAL
    const onClearModal = () => {
        setSlide('media-modal__img media-modal__img--close')
        setTimeout(() => {
            dispatch(mediaViewerReset())
        }, 200)

        setTimeout(() => {
            setSlide('media-modal__img')
        }, 500)
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
                    <Close onClick={() => onClearModal()} />
                </button>
                <button className='btn--media-viewer' onClick={() => onPrev()}>
                    <img src={left} />
                </button>
                <img className={slide} src={`https://image.tmdb.org/t/p/w780${selectedMedia}`} />
                <button className='btn--media-viewer' onClick={() => onNext()}>
                    <img src={right} />
                </button>
            </div>
            
        </Modal>
    )
}

export default MediaViewer
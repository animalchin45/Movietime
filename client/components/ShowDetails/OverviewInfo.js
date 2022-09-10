import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import { toast } from 'react-toastify'

import {
  createFavorite,
  updateFavorite,
  deleteFavorite,
} from '../../features/favorite/favoriteSlice'
import {
  getMpaa,
  renderedCreated,
  renderedGenres,
  renderedCast,
} from './overviewServices'
import AddWhite from '../../img/addwhite.svg'
import AddBlack from '../../img/addblack.svg'
import DeleteWhite from '../../img/deletewhite.svg'
import DeleteBlack from '../../img/deleteblack.svg'
import Watched from '../../img/watched.svg'
import NotWatched from '../../img/notwatched.svg'
import Stars from './Stars'

const OverviewInfo = () => {
  const dispatch = useDispatch()
  const { isDetailsLoading, isTvContentLoading, isPostersLoading, details } =
    useSelector((state) => state.details)
  const { favorites, isError, message } = useSelector(
    (state) => state.favorites
  )
  const { user } = useSelector((state) => state.auth)
  const isMobile = useMediaQuery({ query: '(max-width: 960px)' })

  // ERROR HANDLING AND CLEAR FAVORITE RELATED ERRORS ON EXIT
  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
  }, [isError, message])

  // Set favorite ids for comparison
  const favIds = favorites.map((fav) => fav.id)

  // Get current favorite
  const favId = favorites.filter((fav) => {
    return fav.id === details.id.toString()
  })

  // ADD TITLE TO USER FAVORITES
  const onAddTitle = (details) => {
    if (details.original_name) {
      toast.promise(
        dispatch(
          createFavorite({
            id: details.id,
            original_title: details.original_name,
            first_air_date: details.first_air_date,
            genres: details.genres,
            poster_path: details.poster_path,
          })
        ),
        {
          pending: 'Just a moment',
          success: 'Favorite saved!',
          error: message,
        }
      )
    } else {
      toast.promise(
        dispatch(
          createFavorite({
            id: details.id,
            original_title: details.original_title,
            release_date: details.release_date,
            genres: details.genres,
            poster_path: details.poster_path,
          })
        ),
        {
          pending: 'Just a moment',
          success: 'Favorite saved!',
          error: message,
        }
      )
    }
  }

  // DELETE TITLE FROM USER FAVORITES
  const onDeleteTitle = (favoriteId) => {
    toast.promise(dispatch(deleteFavorite(favoriteId)), {
      pending: 'Just a moment...',
      success: 'Favorite removed',
      error: message,
    })
  }

  // UPDATE FAVORITE PROPERTIES
  const onUpdateTitle = (id, rating) => {
    if (!user || !favId) {
      return console.log('not a user favorite')
    }
    if (rating) {
      dispatch(
        updateFavorite({
          id,
          data: {
            userRating: rating,
          },
        })
      )
    } else {
      dispatch(
        updateFavorite({
          id,
          data: {
            watched: !favId[0].watched,
          },
        })
      )
    }
  }

  // SHOW LOADER WHILE ALL CONTENT IS LOADING
  if (isDetailsLoading || isTvContentLoading || isPostersLoading) {
    return (
      <div className='show-details__overview__info'>
        <Loader />
      </div>
    )
  }

  return (
    <>
      <div className='show-details__overview__info'>
        {details.original_name && <h3>{details.original_name}</h3>}
        {details.original_title && <h3>{details.original_title}</h3>}

        <p>
          <i>{details.tagline}</i>
        </p>

        <div className='show-details__overview__info__release'>
          <div>
            {details.release_date && (
              <p>{details.release_date.substring(0, 4)}</p>
            )}
            {details.first_air_date && (
              <p>{details.first_air_date.substring(0, 4)}</p>
            )}
            {(details.release_dates || details.results) && (
              <p className={isMobile ? 'mpaa' : 'mpaa--white'}>{getMpaa()}</p>
            )}

            {user && (
              <>
                {!favIds.includes(details.id.toString()) && (
                  <>
                    <button
                      onClick={() => onAddTitle(details)}
                      className='btn--modify'
                    >
                      {isMobile && <AddBlack />}
                      {!isMobile && <AddWhite />}
                    </button>
                    <p className='u-margin-left'>
                      <i>{`(Add title to favorites to rate)`}</i>
                    </p>
                  </>
                )}

                {favIds.includes(details.id.toString()) && (
                  <button
                    onClick={() => onDeleteTitle(favId[0]._id)}
                    className='btn--modify'
                  >
                    {isMobile && <DeleteBlack />}
                    {!isMobile && <DeleteWhite />}
                  </button>
                )}

                {favIds.includes(details.id.toString()) && !favId[0].watched && (
                  <button
                    onClick={() => onUpdateTitle(favId[0]._id)}
                    className='btn--modify'
                  >
                    <NotWatched />
                  </button>
                )}

                {favIds.includes(details.id.toString()) && favId[0].watched && (
                  <button
                    onClick={() => onUpdateTitle(favId[0]._id)}
                    className='btn--modify'
                  >
                    <Watched />
                  </button>
                )}
              </>
            )}
          </div>
          <div>
            <p>{renderedGenres()}</p>
          </div>
          {details.runtime && <p>Runtime: {details.runtime} minutes</p>}
          {details.episode_run_time && (
            <p>Runtime: {details.episode_run_time}</p>
          )}
        </div>

        <h4>Overview</h4>
        <p>{details.overview}</p>

        <div className='show-details__overview__info__crew'>
          <div className='show-details__overview__info__crew--members'>
            {details.created_by && details.created_by.length > 0 && (
              <p>Created By: {renderedCreated(details.created_by, 'tv')}</p>
            )}
            {!details.created_by && (
              <p>Directed By: {renderedCreated(details.crew, 'movie')}</p>
            )}
          </div>
          <div className='show-details__overview__info__crew--members'>
            {details.cast && details.cast.length > 0 && (
              <p>Starring: {renderedCast()}</p>
            )}
          </div>
        </div>
        <Stars favId={favId[0]} onUpdateTitle={onUpdateTitle} />
      </div>
    </>
  )
}

export default OverviewInfo

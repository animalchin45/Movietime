import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import AccountStats from './AccountStats'
import ShowCards from '../ShowCards'
import Recommendations from './Recommendations'
import Loader from '../Loader'

import { validate, logout } from '../../features/auth/authSlice'
import {
  getFavorites,
  favoriteClearError,
  favoriteReset,
} from '../../features/favorite/favoriteSlice'

const Dashboard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isAuthenticated, token, isLoading } = useSelector(
    (state) => state.auth
  )
  const { favorites, isFavoritesLoading } = useSelector(
    (state) => state.favorites
  )

  useEffect(async () => {
    dispatch(validate(token))

    if (!isAuthenticated) {
      navigate('/login')
    }

    await dispatch(getFavorites())

    return () => {
      dispatch(favoriteClearError())
    }
  }, [dispatch, validate, isAuthenticated])

  const onLogout = () => {
    dispatch(logout())
    dispatch(favoriteReset())
    navigate('/')
  }

  if (isLoading || isFavoritesLoading || !favorites || !user) {
    return <Loader />
  }

  return (
    <div className='layout__main dashboard'>
      <>
        <AccountStats
          currentUser={user}
          accountFavorites={favorites}
          onLogout={onLogout}
        />

        <div className='dashboard__favorites--title content-title'>
          {favorites.length > 0 && <h3>Favorites</h3>}
        </div>

        <section className='dashboard__favorites'>
          {favorites.length > 0 && (
            <div className='show-grid'>
              <ShowCards results={favorites} />
            </div>
          )}
          {favorites.length == 0 && <p>No favorites here yet...</p>}
        </section>

        {favorites.length > 0 && <Recommendations />}
      </>
    </div>
  )
}

export default Dashboard

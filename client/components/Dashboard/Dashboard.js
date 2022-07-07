import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { logout, authReset } from '../../features/auth/authSlice'
import { getFavorites, favoriteClearError } from '../../features/favorite/favoriteSlice'
import Loader from '../Loader'
import ShowCards from '../ShowCards'

const Dashboard = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    const { favorites, isFavoritesLoading } = useSelector((state) => state.favorites)

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }

        dispatch(getFavorites())

        return () => {
            dispatch(favoriteClearError())
        }

    }, [user, navigate, dispatch])

    const onLogout = () => {
        dispatch(logout())
        dispatch(authReset())
        navigate('/')
    }

    if (isFavoritesLoading || !favorites) {
        return (
            <Loader />
        )
    }

    return (
        <div className='layout__main dashboard'> 
            <>
                <section className='dashboard__welcome'>
                    <h4>{`Welcome back ${user.name}`}</h4>
                    <p>{`You have ${favorites.length} favorites`}</p>
                </section>
                <div className='dashboard__favorites--title content-title'>
                    {(favorites.length > 0) && <h3>Favorites</h3>}
                </div>
                <div className='dashboard__favorites'>
                    {(favorites.length > 0) &&
                    <div className='show-grid'>
                        <ShowCards results={favorites} />
                    </div>}
                    {(favorites.length == 0) &&
                    <p>No favorites here yet...</p>}
                </div>
            </>

            <button className='btn btn--large' onClick={onLogout}>
                <p>Logout</p>
            </button>
        </div>
    )
}

export default Dashboard
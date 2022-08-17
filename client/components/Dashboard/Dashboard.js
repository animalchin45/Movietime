import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { logout } from "../../features/auth/authSlice"
import {
  getFavorites,
  favoriteClearError,
} from "../../features/favorite/favoriteSlice"
import {
  recommendSeed,
  recommendShows,
} from "../../features/recommend/recommendSlice"
import Loader from "../Loader"
import AccountStats from "./AccountStats"
import ShowCards from "../ShowCards"

const Dashboard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading } = useSelector((state) => state.auth)
  const { favorites, isFavoritesLoading } = useSelector(
    (state) => state.favorites
  )
  const { recommendResults } = useSelector((state) => state.recommend)

  useEffect(async () => {
    if (!user) {
      navigate("/login")
    }

    dispatch(getFavorites())

    await dispatch(recommendShows(recommendSeed(favorites)))

    return () => {
      dispatch(favoriteClearError())
    }
  }, [user, navigate, dispatch])

  const onLogout = () => {
    dispatch(logout())
    navigate("/")
  }

  if (isLoading || isFavoritesLoading || !favorites || !user) {
    return <Loader />
  }

  return (
    <div className="layout__main dashboard">
      <>
        <AccountStats currentUser={user} accountFavorites={favorites} />

        <div className="dashboard__favorites--title content-title">
          {favorites.length > 0 && <h3>Favorites</h3>}
        </div>

        <section className="dashboard__favorites">
          {favorites.length > 0 && (
            <div className="show-grid">
              <ShowCards results={favorites} />
            </div>
          )}
          {favorites.length == 0 && <p>No favorites here yet...</p>}
        </section>

        <div className="dashboard__recommend--title content-title">
          {recommendResults.length > 0 && <h3>More for you...</h3>}
        </div>

        <section className="dashboard__recommend">
          {recommendResults.length > 0 && (
            <div className="show-grid">
              <ShowCards results={recommendResults} />
            </div>
          )}
        </section>
      </>

      <button className="btn btn--large" onClick={onLogout}>
        <p>Logout</p>
      </button>
    </div>
  )
}

export default Dashboard

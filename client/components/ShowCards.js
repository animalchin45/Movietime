import React from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { reel } from "../img/index"
import {
  showDetails,
  tvRatings,
  getPosters,
  detailsReset,
} from "../features/show/detailsSlice"
import { resetSearchDisplay } from "../features/show/searchDisplaySlice"
import Stars from "./ShowDetails/Stars"
import Watched from "../img/watched.svg"
import NotWatched from "../img/notwatched.svg"

const ShowCards = ({ results }) => {
  const { user } = useSelector((state) => state.auth)

  let { pathname } = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onClick = async (media_type, id) => {
    dispatch(detailsReset())
    dispatch(resetSearchDisplay())
    await dispatch(showDetails({ media_type, id }))

    if (media_type === "tv") {
      dispatch(tvRatings({ media_type, id }))
    }

    dispatch(getPosters({ media_type, id }))
    navigate("/details")
  }

  const renderedCards = results.map((show) => {
    let showType

    if (show.release_date) {
      showType = "movie"
    } else if (show.first_air_date) {
      showType = "tv"
    }

    return (
      <div className="card" key={show.id}>
        <button
          className="btn btn--card"
          onClick={() => onClick(showType, show.id)}
        >
          <img
            src={
              show.poster_path
                ? `https://image.tmdb.org/t/p/w154${show.poster_path}`
                : `${reel}`
            }
          />
          {user && user._id === show.userId && (
            <div className="dashboard__watched">
              {show.watched && <Watched />}
              {!show.watched && <NotWatched />}
            </div>
          )}
        </button>

        {pathname === "/dashboard" && user._id === show.userId && (
          <div>
            <Stars dashRating={show.userRating} />
          </div>
        )}

        <div>
          {show.original_title && (
            <p className="label-text">{show.original_title}</p>
          )}
          {show.release_date && (
            <p className="label-text">{show.release_date.substring(0, 4)}</p>
          )}
          {show.original_name && (
            <p className="label-text">{show.original_name}</p>
          )}
          {show.first_air_date && (
            <p className="label-text">{show.first_air_date.substring(0, 4)}</p>
          )}
        </div>
      </div>
    )
  })

  return <>{renderedCards}</>
}

export default ShowCards

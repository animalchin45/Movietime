import React from "react"
import { useSelector } from "react-redux"

const AccountStats = ({ accountFavorites, currentUser }) => {
  return (
    <section className="dashboard__welcome">
      <h4 className="u-margin-bottom">{`${currentUser.name}`}</h4>
      <p>{`${accountFavorites.length} favorites`}</p>
    </section>
  )
}

export default AccountStats

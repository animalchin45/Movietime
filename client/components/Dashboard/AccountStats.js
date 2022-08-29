import React from "react"

const AccountStats = ({ accountFavorites, currentUser, onLogout }) => {
  return (
    <section className="dashboard__welcome">
      <h4 className="u-margin-bottom">{`${currentUser.name}`}</h4>
      <p>{`${accountFavorites.length} favorites`}</p>
      <button className="btn btn--large" onClick={() => onLogout()}>
        <p>Logout</p>
      </button>
    </section>
  )
}

export default AccountStats

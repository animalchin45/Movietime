import React from 'react'

import { favoriteGenre } from './favoriteGenre'

const AccountStats = ({ accountFavorites, currentUser, onLogout }) => {
  const favGenre = favoriteGenre(accountFavorites)

  return (
    <section className='dashboard__welcome'>
      <h4 className='u-margin-bottom'>{`${currentUser.name}`}</h4>
      {accountFavorites.length > 0 && (
        <p className='u-margin-bottom-medium'>{`${accountFavorites.length} favorites`}</p>
      )}
      {accountFavorites.length > 0 && (
        <p className='u-margin-bottom-medium'>Favorite genre: {favGenre}</p>
      )}
      <button className='btn btn--large' onClick={() => onLogout()}>
        <p>Logout</p>
      </button>
    </section>
  )
}

export default AccountStats

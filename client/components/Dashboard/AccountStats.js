import React from 'react'

const AccountStats = ({ favorites, user }) => {
  return (
    <section className='dashboard__welcome'>
        <h4 className='u-margin-bottom'>{`${user.name}`}</h4>
        <p>{`${favorites.length} favorites`}</p>
    </section>
  )
}

export default AccountStats
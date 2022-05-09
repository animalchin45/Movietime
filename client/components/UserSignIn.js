import React from 'react'

import { user } from '../img/index'

const UserSignIn = () => {
    return (
        <div className='user-sign-in'>
            <button className='btn--small'>
                <img src={user} />
            </button>
        </div>
    )
}

export default UserSignIn
import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import StarLeft from '../../img/starLeft.svg'
import StarRight from '../../img/starRight.svg'

const Stars = ({ favId, onUpdateTitle, dashRating }) => {
    const { details } = useSelector((state) => state.details)
    const { user } = useSelector((state) => state.auth)
    let { pathname } = useLocation()

    const [starType, setStarType] = useState('stars')
    const [starPieceType, setStarPieceType] = useState('stars__piece')

    const [score, setScore] = useState(0)

    // Determine Source of Rating
    useEffect(() => {
        if (favId && (favId.userRating > 0)) {
            // set stars if on details page and show is in user's favorites
            setScore(favId.userRating)
        } else if (dashRating) {
            // dashboard rating not interactive
            setStarType('stars--static')
            setScore(dashRating)
        } else if (!user || (pathname === '/dashboard')) {
            // no user makes stars non interactive
            setStarType('stars--static')
            setScore(Math.round(details.vote_average))
        } else {
            // Show average score
            setScore(Math.round(details.vote_average))
        }
    })

    // Determine Size of Stars
    useEffect(() => {
        if (pathname === '/dashboard') {
            setStarPieceType('stars__piece--dashboard')
        }
    })

    const on = {
        fill: 'rgba(233, 216, 166, 1)'
    }

    const off = {
        fill: 'rgba(233, 216, 166, 0)'
    }

    return (
        <div className={starType}>
            <StarLeft 
                className={starPieceType} 
                style={score >= 1 ? on : off}
                onClick={favId ? () => onUpdateTitle(favId._id, 1) : undefined}
            />
            <StarRight 
                className={starPieceType} 
                style={score >= 2 ? on : off}
                onClick={favId ? () => onUpdateTitle(favId._id, 2) : undefined}
            />
        
            <StarLeft 
                className={starPieceType} 
                style={score >= 3 ? on : off}
                onClick={favId ? () => onUpdateTitle(favId._id, 3) : undefined}
            />
            <StarRight 
                className={starPieceType} 
                style={score >= 4 ? on : off}
                onClick={favId ? () => onUpdateTitle(favId._id, 4) : undefined}
            />
        
            <StarLeft 
                className={starPieceType} 
                style={score >= 5 ? on : off}
                onClick={favId ? () => onUpdateTitle(favId._id, 5) : undefined}
            />
            <StarRight 
                className={starPieceType} 
                style={score >= 6 ? on : off}
                onClick={favId ? () => onUpdateTitle(favId._id, 6) : undefined}
            />
        
            <StarLeft 
                className={starPieceType} 
                style={score >= 7 ? on : off}
                onClick={favId ? () => onUpdateTitle(favId._id, 7) : undefined}
            />
            <StarRight
                className={starPieceType} 
                style={score >= 8 ? on : off}
                onClick={favId ? () => onUpdateTitle(favId._id, 8) : undefined}
            />
        
            <StarLeft 
                className={starPieceType} 
                style={score >= 9 ? on : off}
                onClick={favId ? () => onUpdateTitle(favId._id, 9) : undefined}
            />
            <StarRight 
                className={starPieceType} 
                style={score >= 10 ? on : off}
                onClick={favId ? () => onUpdateTitle(favId._id, 10) : undefined}
            />

            {/* Only show type of score on when not on dashboard */}
            {(pathname != '/dashboard') &&
                <div>
                    {(!user || (!favId || (favId.userRating == 0))) && <p><i>Average Score</i></p>}
                    {(favId && ((favId.userRating > 0) && user)) && <p><i>{user.userName}'s Score</i></p>}
                </div>
            }

            {/* Inform user that show needs to be a favorite to rate */}
            {((pathname != '/dashboard') && user && !favId ) &&
                <div className='u-margin-left'>
                    
                </div>
            }
            
            
        </div>
    )
}

export default Stars
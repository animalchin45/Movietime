import React from 'react'
import { useSelector } from 'react-redux'

import StarLeft from '../../img/starLeft.svg'
import StarRight from '../../img/starRight.svg'

const Stars = ({ favId, onUpdateTitle }) => {
    const { details } = useSelector((state) => state.details)
    const { user } = useSelector((state) => state.auth)

    const rating = () => {
        if (favId && (favId.userRating > 0)) {
            return favId.userRating
        } else {
            return Math.round(details.vote_average)
        }
    }


    const on = {
        fill: 'rgba(233, 216, 166, 1)'
    }

    const off = {
        fill: 'rgba(233, 216, 166, 0)'
    }

    return (
        <div className='stars'>
            <StarLeft 
                className="stars__piece" 
                style={rating() >= 1 ? on : off}
                onClick={favId ? () => onUpdateTitle(favId._id, 1) : undefined}
            />
            <StarRight 
                className="stars__piece" 
                style={rating() >= 2 ? on : off}
                onClick={favId ? () => onUpdateTitle(favId._id, 2) : undefined}
            />
        
            <StarLeft 
                className="stars__piece" 
                style={rating() >= 3 ? on : off}
                onClick={favId ? () => onUpdateTitle(favId._id, 3) : undefined}
            />
            <StarRight 
                className="stars__piece" 
                style={rating() >= 4 ? on : off}
                onClick={favId ? () => onUpdateTitle(favId._id, 4) : undefined}
            />
        
            <StarLeft 
                className="stars__piece" 
                style={rating() >= 5 ? on : off}
                onClick={favId ? () => onUpdateTitle(favId._id, 5) : undefined}
            />
            <StarRight 
                className="stars__piece" 
                style={rating() >= 6 ? on : off}
                onClick={favId ? () => onUpdateTitle(favId._id, 6) : undefined}
            />
        
            <StarLeft 
                className="stars__piece" 
                style={rating() >= 7 ? on : off}
                onClick={favId ? () => onUpdateTitle(favId._id, 7) : undefined}
            />
            <StarRight
                className="stars__piece" 
                style={rating() >= 8 ? on : off}
                onClick={favId ? () => onUpdateTitle(favId._id, 8) : undefined}
            />
        
            <StarLeft 
                className="stars__piece" 
                style={rating() >= 9 ? on : off}
                onClick={favId ? () => onUpdateTitle(favId._id, 9) : undefined}
            />
            <StarRight 
                className="stars__piece" 
                style={rating() >= 10 ? on : off}
                onClick={favId ? () => onUpdateTitle(favId._id, 10) : undefined}
            />

            {(!user || (!favId || (favId.userRating == 0))) && <p><i>Average Score</i></p>}
            {(favId && ((favId.userRating > 0) && user)) && <p><i>{user.userName}'s Score</i></p>}

        </div>
    )
}

export default Stars
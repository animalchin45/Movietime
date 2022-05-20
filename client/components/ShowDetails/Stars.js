import React from 'react'
import { useSelector } from 'react-redux'

import StarLeft from '../../img/starLeft.svg'
import StarRight from '../../img/starRight.svg'

const Stars = () => {
    const { details } = useSelector((state) => state.details)

    let rating = Math.round(details.vote_average)

    const on = {
        fill: 'rgba(233, 216, 166, 1)'
    }

    const off = {
        fill: 'rgba(233, 216, 166, 0)'
    }

    // const handleChange = (value) => {
    //     setRating(value)
    // }

    return (
        <div className='stars'>
            <StarLeft 
                value="1" 
                className="stars__piece" 
                style={rating >= 1 ? on : off}
            />
            <StarRight 
                value="2" 
                className="stars__piece" 
                style={rating >= 2 ? on : off}
            />
        
            <StarLeft 
                value="3" 
                className="stars__piece" 
                style={rating >= 3 ? on : off}
            />
            <StarRight 
                value="4" 
                className="stars__piece" 
                style={rating >= 4 ? on : off}
            />
        
            <StarLeft 
                value="5" 
                className="stars__piece" 
                style={rating >= 5 ? on : off}
            />
            <StarRight 
                value="6" 
                className="stars__piece" 
                style={rating >= 6 ? on : off}
            />
        
            <StarLeft 
                value="7" 
                className="stars__piece" 
                style={rating >= 7 ? on : off}
            />
            <StarRight 
                value="8" 
                className="stars__piece" 
                style={rating >= 8 ? on : off}
            />
        
            <StarLeft 
                value="9" 
                className="stars__piece" 
                style={rating >= 9 ? on : off}
            />
            <StarRight 
                value="10" 
                className="stars__piece" 
                style={rating >= 10 ? on : off}
            />
            

        </div>
    )
}

export default Stars
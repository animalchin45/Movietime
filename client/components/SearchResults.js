import React from "react"
import { useSelector } from 'react-redux'

import ShowCards from "./ShowCards"
import Loader from "./Loader"

const SearchResults = () => {
    const { searchResults, isLoading } = useSelector((state) => state.search)
    const { searchDisplay } = useSelector((state) => state.display)

    // console.log(searchResults)

    if (isLoading) {
        return (
            <div className="layout__main search-results">
                <div className="show-grid">
                    <Loader />
                </div>
            </div> 
        )
    }

    return (
        <div className="layout__main search-results">
            {(searchResults.length > 0) && 
                <>
                    <div className='search-results--title'>
                        {searchDisplay && <h3>Results for {searchDisplay}</h3>}
                    </div>
                    <div className="show-grid show-grid--search-results">
                        <ShowCards results={searchResults} />
                    </div>
                </>
            }
            {(searchResults.length == 0) && 
                <>
                    <div className='search-results--title'>
                        {searchDisplay && <h3>Results for {searchDisplay}</h3>}
                    </div>
                    <div className="show-grid show-grid--search-results">
                        <p>No results! Please try something else.</p>
                    </div>
                </>
            }
        </div>
        
    )
}

export default SearchResults
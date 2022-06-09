import React from 'react'

import Hero from './Hero'
import TrendingShows from './TrendingShows'

const Home = () => {

    return (
        <div className='layout__main home'>
            <Hero /> 
            <div className='content-title'>
                <h3>What's Popular</h3>
            </div>
            <div className='home__trending'>
                <div className='show-grid'>
                    <TrendingShows />                
                </div>
            </div>
        </div>
    )
}


export default Home
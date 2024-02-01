import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Loader from './Loader';

const Hero = () => {
  const { trendingResults, isLoading } = useSelector((state) => state.show);
  const [background, setBackGround] = useState('');

  useEffect(() => {
    const pick = Math.round(Math.random() * (trendingResults.length - 0));

    setBackGround(
      trendingResults.length > 0
        ? trendingResults[pick].backdrop_path
        : 'Coming Soon...'
    );
  }, [trendingResults]);

  return (
    <div
      className='hero'
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${background})`,
      }}
    >
      <h1 className='hero__logo'>MOVIETIME</h1>
      <h2 className='hero__text'>
        Millions of movies and tv shows ready to be discovered
      </h2>
      {isLoading && <Loader />}
      <div className='hero__overlay' />
    </div>
  );
};

export default Hero;

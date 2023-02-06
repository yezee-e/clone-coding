import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Banner from '../components/Banner';
import MovieSlide from '../components/MovieSlide';
import { movieAction } from '../redux/actions/movieAction';
import ClipLoader from 'react-spinners/ClipLoader';

function Home() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { popularMovies, topRatedMovies, upcomingMovies } = useSelector(
    (state) => state.movie
  );

  useEffect(() => {
    dispatch(movieAction.getMovies());
  }, []);

  //로딩이 true면 Loading스피너를 보여주고
  //로딩이 false면 데이터를 보여준다
  if (loading) {
    return (
      <ClipLoader
        color='#ffff'
        loading={loading}
        size={150}
        aria-label='Loading Spinner'
        data-testid='loader'
      />
    );
  }

  return (
    <div className='home'>
      {popularMovies.results && <Banner movie={popularMovies.results[0]} />}

      <h1>Popular Movie</h1>
      <MovieSlide movies={popularMovies} />
      <h1>Top rated Movie</h1>
      <MovieSlide movies={topRatedMovies} />
      <h1>Upcoming Movie</h1>
      <MovieSlide movies={upcomingMovies} />
    </div>
  );
}

export default Home;

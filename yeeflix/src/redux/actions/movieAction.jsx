import api from '../api';

const API_KEY = process.env.REACT_APP_API_KEY;

function getMovies() {
  return async (dispatch) => {
    try {
      dispatch({ type: 'GET_MOVIES_REQUEST' });
      const popularMovieApi = api.get(
        `/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
      );
      const topRatedApi = api.get(
        `/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
      );
      const upComingApi = api.get(
        `/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
      );

      let [popularMovie, topRatedMovie, upComingMovie] = await Promise.all([
        popularMovieApi,
        topRatedApi,
        upComingApi,
      ]);
      dispatch({
        type: 'GET_MOVIES_SUCCESS',
        payload: {
          popularMovie: popularMovie.data,
          topRatedMovie: topRatedMovie.data,
          upComingMovie: upComingMovie.data,
        },
      });
    } catch (error) {}
  };
}

export const movieAction = {
  getMovies,
};

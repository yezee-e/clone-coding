let initialState = {
  popularMovies: {},
  topRatedMovies: {},
  upcomingMovies: {},
  loading: true,
};

function movieReducer(state = initialState, action) {
  let { type, payload } = action;
  switch (type) {
    case 'GET_MOVIES_SUCCESS':
      return {
        ...state,
        popularMovies: payload.popularMovie,
        topRatedMovies: payload.topRatedMovie,
        upcomingMovies: payload.upcomingMovie,
      };
    default:
      return { ...state };
  }
}

export default movieReducer;

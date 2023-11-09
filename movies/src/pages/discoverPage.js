import React from "react";
import { getMovies } from "../api/tmdb-api-upcoming";
import PageTemplate from '../components/templateMovieListPage'
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToMustWatchIcon from "../components/cardIcons/addToMustWatch";

const DiscoverPage = (props) => {

  // caching was added previously - foresaw the future here!
  const {  data, error, isLoading, isError }  = useQuery('discover', getMovies)

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const movies = data.results;

  // Redundant, but necessary to avoid app crashing.
  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))

  return (
    <PageTemplate
      title='Discover Upcoming Movies'
      movies={movies}
      action={(movie) => {
        return <AddToMustWatchIcon color="primary" movie={movie} />
      }}
    />
  );
};
export default DiscoverPage;
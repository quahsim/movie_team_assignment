// searchMovies.js

const searchMovies = async (url, options, searchTerm, renderMovies) => {
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      const filteredMovies = data.results.filter(movie => movie.title.toLowerCase().includes(searchTerm.toLowerCase()));
      renderMovies(filteredMovies);
    } catch (error) {
      console.error('Error searching movies:', error);
    }
  };
  
  export default searchMovies;
  
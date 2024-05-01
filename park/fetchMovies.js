// fetchMovies.js

const fetchMovies = async (url, options) => {
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error fetching movies:', error);
      return [];
    }
  };
  
  export default fetchMovies;
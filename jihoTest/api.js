// api.js

export const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNjEwZDY1MTg3MGQwNTIxYWQ5ZGNiZTExYjU3NzU3MiIsInN1YiI6IjY2MjljYjliNDNjZDU0MDEyMTg0NDkyOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ktYaXCNxyt3gBJOwc-VM1xHMJmE760miOgotjGWRju0'
  }
};

export async function fetchTopRatedMovies() {
  try {
    const response = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching top rated movies:', error);
    return [];
  }
}

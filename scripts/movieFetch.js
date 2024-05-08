// TMDB API키
export const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNjEwZDY1MTg3MGQwNTIxYWQ5ZGNiZTExYjU3NzU3MiIsInN1YiI6IjY2MjljYjliNDNjZDU0MDEyMTg0NDkyOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ktYaXCNxyt3gBJOwc-VM1xHMJmE760miOgotjGWRju0'
    }
};

//TMDB API에서 제일 인기있는 영화들을 fetch
async function fetchTopRatedMovies(page) {
    const url = `${baseUrl}${page}`;
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching top rated movies:', error);
        throw error;
    }
}
//모든 페이지를 불러옴
export async function fetchAllTopRatedMovies() {
    let allMovies = [];
    for (let i = 1; i <= totalPages; i++) {
        const movies = await fetchTopRatedMovies(i);
        allMovies = allMovies.concat(movies);
    }
    localStorage.setItem('cache_movies', JSON.stringify(allMovies));
    return allMovies;
}
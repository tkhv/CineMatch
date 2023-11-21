export type Movie = {
  movie_id: number;
  title: string;
  genre: string;
  posterURL: string;
  overview: string;
};

export type MovieList = Movie[];

export async function getPopularMovies(fetchPage: number): Promise<MovieList> {
  const url =
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=" +
    fetchPage;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.REACT_APP_TMDB_API_TOKEN || "NOT_SET",
    },
  };

  const response = await fetch(url, options);
  const data = await response.json();
  let movies: MovieList = [];
  for (let i = 0; i < data.results.length; i++) {
    movies.push({
      movie_id: data.results[i].id,
      title: data.results[i].title,
      genre: data.results[i].genre_ids[0],
      posterURL:
        "https://image.tmdb.org/t/p/original" + data.results[i].poster_path,
      overview: data.results[i].overview,
    });
  }
  return movies;
}

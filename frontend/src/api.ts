export type Movie = {
  movie_id: number;
  title: string;
  genre: string;
  posterURL: string;
  overview: string;
};

export type MovieList = Movie[];

function fmtResults(data: any): MovieList {
  console.log("MADE CALL"); // To tell if we make too many calls.
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
  return fmtResults(await response.json());
}

export async function getRecs(
  fetchPage: number,
  sort_by: "popularity.desc" | "vote_count.desc",
  genres: number[]
): Promise<MovieList> {
  let genreString = "";
  for (let i = 0; i < genres.length; i++) {
    genreString += genres[i] + "%7C";
  }
  genreString = genreString.substring(0, genreString.length - 3);

  const url =
    "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=" +
    fetchPage +
    "&sort_by=" +
    sort_by +
    "&vote_count.gte=1000&with_genres=" +
    genreString;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.REACT_APP_TMDB_API_TOKEN || "NOT_SET",
    },
  };

  const response = await fetch(url, options);
  return fmtResults(await response.json());
}

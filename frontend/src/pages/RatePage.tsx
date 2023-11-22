import { useEffect, useState } from "react";
import { getPopularMovies, MovieList } from "../api";
import MovieCard from "./components/MovieCard";

import { Container, Typography } from "@mui/material";

export default function RatePage() {
  const [data, setData] = useState<MovieList | null>(null);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [fetchPage, setFetchPage] = useState(1);

  useEffect(() => {
    const getData = async () => {
      if (
        currentMovieIndex === 0 ||
        (data && currentMovieIndex >= data.length)
      ) {
        setData(await getPopularMovies(fetchPage));
        setFetchPage((prevPage) => prevPage + 1);
      }
      if (data && currentMovieIndex >= data.length) {
        setCurrentMovieIndex(0);
      }
    };
    getData();
  }, [currentMovieIndex]);

  const incMovieIndex = () => {
    setCurrentMovieIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <div
      style={{
        backgroundColor: "black",
        height: "100%",
        alignItems: "center",
        paddingBottom: "5%",
      }}
    >
      <Container
        disableGutters
        maxWidth="sm"
        component="main"
        sx={{ pt: 8, pb: 6 }}
      >
        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          component="p"
        >
          Rate movies to get recommendations
        </Typography>
      </Container>
      <Container maxWidth="md" component="main">
        {data && currentMovieIndex < data.length && (
          <MovieCard
            movie={data[currentMovieIndex]}
            incMovieIndex={incMovieIndex}
          />
        )}
      </Container>
    </div>
  );
}

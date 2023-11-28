import { useContext } from "react";
import { UserContext } from "../UserContext";
import { useEffect, useState } from "react";
import { fetchTopGenres, getRecs, MovieList } from "../api";
import MovieCard from "./components/MovieCard";

import { Container, Typography } from "@mui/material";

export default function RandomPage() {
  const { username }: any = useContext(UserContext);
  const [data, setData] = useState<MovieList | null>(null);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [fetchPage, setFetchPage] = useState(1);
  const [topGenres, setTopGenres] = useState<number[]>([12, 13, 14]);

  useEffect(() => {
    const fetchRecs = async () => {
      const genres = await fetchTopGenres(username);
      setTopGenres(genres);
    };
    fetchRecs();
    const getData = async () => {
      if (
        currentMovieIndex === 0 ||
        (data && currentMovieIndex >= data.length)
      ) {
        setData(await getRecs(fetchPage, "popularity.desc", topGenres));
        setFetchPage((prevPage) => prevPage + 1);
      }
      if (data && currentMovieIndex >= data.length) {
        setCurrentMovieIndex(0);
      }
      // randomize the order of the movies
      if (data) {
        setData((prevData) => {
          if (!prevData) return prevData;
          const newData = [...prevData];
          for (let i = newData.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newData[i], newData[j]] = [newData[j], newData[i]];
          }
          return newData;
        });
      }
    };
    getData();
  }, [currentMovieIndex, topGenres]);

  useEffect(() => {}, [username]);

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
          Here is your random movie!
        </Typography>
      </Container>
      <Container maxWidth="md" component="main">
        {data && currentMovieIndex < data.length && (
          <MovieCard
            movie={data[currentMovieIndex]}
            incMovieIndex={incMovieIndex}
            display={true}
          />
        )}
      </Container>
    </div>
  );
}

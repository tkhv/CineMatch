import { useContext } from "react";
import { UserContext } from "../UserContext";
import { useEffect, useState } from "react";

import { getRecs, Movie } from "../api";
import MovieCard from "./components/MovieCard";

import {
  Box,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  Pagination,
  Stack,
  Switch,
  Typography,
} from "@mui/material";

export default function BrowsePage(): JSX.Element {
  const { username }: any = useContext(UserContext);
  const [recs, setRecs] = useState<Movie[]>([]);
  const [sort, setSort] = useState<"popularity.desc" | "vote_count.desc">(
    "vote_count.desc"
  );

  const [page, setPage] = useState(1);
  const pageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSort(event.target.checked ? "popularity.desc" : "vote_count.desc");
    console.log(recs);
  };

  useEffect(() => {
    const fetchRecs = async () => {
      try {
        const res = await fetch(
          "https://cinematch-7e963.ue.r.appspot.com/topUserGenre",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: username,
            }),
          }
        );
        let status: any = await res.text();
        if (status !== "No favorite genre") {
          console.log("FAV: " + status);
        } else {
          status = "[12, 13, 14]"; // default genres
        }
        console.log("MAKING CALL WITH: " + status);
        const data = await getRecs(page, sort, status); // NOTE: here we are making the API call to TMDB.
        setRecs(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRecs();
  }, [sort, page, username]);

  return (
    <div
      style={{
        backgroundColor: "black",
        height: "100%",
        alignItems: "center",
        color: "white",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Your Recommendations
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <FormControl>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography>Votes</Typography>
                  <FormControlLabel
                    value="top"
                    control={<Switch color="default" onChange={handleChange} />}
                    label="Sort By"
                    labelPlacement="top"
                  />
                  <Typography>Popularity</Typography>
                </Stack>
              </FormControl>
            </Stack>
          </Container>
        </Box>
        <Grid container style={{ paddingTop: "2%", marginLeft: "-6%" }}>
          {recs.map((movie) => (
            <Grid item key={movie.movie_id} xs={12} sm={6} md={4}>
              <MovieCard
                movie={movie}
                incMovieIndex={() => {}}
                display={true}
              />
            </Grid>
          ))}
        </Grid>
      </div>
      <Stack spacing={2} style={{ paddingTop: "2%", paddingBottom: "2%" }}>
        <Pagination count={10} page={page} onChange={pageChange} />
      </Stack>
    </div>
  );
}

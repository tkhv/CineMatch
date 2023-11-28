import { useContext } from "react";
import { UserContext } from "../UserContext";
import { TextField, Button } from "@mui/material";
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

export default function PartyPage() {
  const { username }: any = useContext(UserContext);
  const [usernameToAdd, setUsernameToAdd] = useState("");
  console.log(username);
  const [recs, setRecs] = useState<Movie[]>([]); // initialize recs.
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
          "https://cinematch-7e963.ue.r.appspot.com/topGroupGenre",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              groupname: username,
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

  const addUser = async (usernameToAdd: string) => {
    console.log("Hit Add user");
    try {
      const res = await fetch(
        "https://cinematch-7e963.ue.r.appspot.com/addUserToGroup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: usernameToAdd,
            groupname: username,
          }),
        }
      );
      let status = await res.text();
      if (status === "group or user dont exist") {
        console.log("group or user dont exist, failed");
      } else {
        console.log("user added to group");
        console.log(status);
        setUsernameToAdd("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // NOTE: this return is what is displayed in the Party Page; the functions defined above are merely support.
  // NOTE: in the code below, we use FormControlLabel for the votes Button 'Switch'; by default, the button is placed horizontally, but to place it on the top we use 'labelPlacement="top"'.
  // NOTE: using the custom implementation <MovieCard/> (defined in components/MovieCard.tsx).
  // NOTE: the code below uses CSS for defining sx prop (bgcolor, pt, pb, etc.).
  // NOTE: <></> denotes HTML so <Container></Container> is the HTML container tag.
  return (
    <div
      style={{
        backgroundColor: "maroon",
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
        <Box>
          <Container>
            <Stack
              sx={{
                pt: 1.25,
                pb: 1.25,
                minWidth: Infinity,
              }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <TextField
                id="outlined-basic"
                fullWidth
                label="add group members to your party"
                variant="outlined"
                value={usernameToAdd}
                onChange={(e) => setUsernameToAdd(e.target.value)}
              />

              <Button
                sx={{
                  fontSize: 24,
                  bgcolor: "white",
                }}
                variant="contained"
                onClick={() => addUser(usernameToAdd)}
              >
                ➕
              </Button>
            </Stack>
          </Container>
        </Box>
        <Box
          sx={{
            bgcolor: "brown",
            pt: 8,
            pb: 6,
          }}
        >
          <Container>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Group Recommendations 🍿
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
                display={false}
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

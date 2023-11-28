import { useContext } from "react";
import { UserContext } from "../../UserContext";
import { Movie } from "../../api";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Tooltip,
} from "@mui/material";

import { ThumbUp, ThumbDown, VisibilityOff } from "@mui/icons-material";

type MovieCardProps = {
  movie: Movie | null;
  incMovieIndex: () => void;
  display: boolean;
};

export default function MovieCard(props: MovieCardProps) {
  const { username }: any = useContext(UserContext);
  console.log(username);
  const title = props.movie?.title;
  const overview = props.movie?.overview;
  const posterURL = props.movie?.posterURL;

  const handleLike = async () => {
    console.log("Hit like");
    try {
      const res = await fetch(
        "https://cinematch-7e963.ue.r.appspot.com/addMovieToUser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            movie: props?.movie?.genre,
          }),
        }
      );
      let status = await res.text();
    } catch (err) {
      console.log(err);
    }
    nextMovie();
  };

  const nextMovie = () => {
    console.log("Next movie");
    props.incMovieIndex();
  };

  return (
    <Card
      sx={{
        width: "30vw",
        paddingBottom: "2%",
        marginBottom: "5%",
        marginLeft: "23%",
      }}
    >
      <CardHeader
        title={title}
        subheader={overview}
        titleTypographyProps={{ align: "center", variant: "h3" }}
        subheaderTypographyProps={{
          align: "center",
          fontSize: "0.9rem",
        }}
        sx={{
          height: "200px", // Set a fixed height
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[200]
              : theme.palette.grey[700],
        }}
      />
      <CardContent sx={{ alignSelf: "center" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img
            src={posterURL}
            style={{ height: "40vh", width: "auto" }}
            alt="Movie poster"
          />
        </div>
      </CardContent>
      {props.display ? (
        <CardActions>
          <Tooltip title="Dislike">
            <Button
              fullWidth
              variant={"contained"}
              sx={{ color: "red" }}
              onClick={nextMovie}
            >
              <ThumbDown />
            </Button>
          </Tooltip>
          <Tooltip title="Unwatched">
            <Button fullWidth variant={"contained"} onClick={nextMovie}>
              <VisibilityOff />
            </Button>
          </Tooltip>
          <Tooltip title="Like">
            <Button
              fullWidth
              variant={"contained"}
              sx={{ color: "green" }}
              onClick={handleLike}
            >
              <ThumbUp />
            </Button>
          </Tooltip>
        </CardActions>
      ) : (
        <></>
      )}
    </Card>
  );
}

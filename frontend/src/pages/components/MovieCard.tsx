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
};

export default function MovieCard(props: MovieCardProps) {
  const title = props.movie?.title;
  const overview = props.movie?.overview;
  const posterURL = props.movie?.posterURL;

  const handleLike = () => {
    console.log("Liked");
    // Add movie to watched hashmap
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
    </Card>
  );
}

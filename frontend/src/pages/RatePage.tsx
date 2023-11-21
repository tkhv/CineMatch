import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Tooltip,
  Typography,
} from "@mui/material";

import { ThumbUp, ThumbDown, VisibilityOff } from "@mui/icons-material";

import Navbar from "./components/Navbar";

export default function RatePage() {
  return (
    <div
      style={{
        backgroundColor: "black",
        height: "100vh",
        alignItems: "center",
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
        <Card
          sx={{
            width: "30vw",
            // height: "50vh",
            paddingBottom: "2%",
            marginLeft: "23%",
          }}
        >
          <CardHeader
            title="TITLE HERE"
            subheader="genre here"
            titleTypographyProps={{ align: "center", variant: "h3" }}
            subheaderTypographyProps={{
              align: "center",
            }}
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[200]
                  : theme.palette.grey[700],
            }}
          />
          <CardContent sx={{ alignSelf: "center" }}>
            Movie poster here
          </CardContent>
          <CardActions>
            <Tooltip title="Dislike">
              <Button fullWidth variant={"contained"} sx={{ color: "red" }}>
                <ThumbDown />
              </Button>
            </Tooltip>
            <Tooltip title="Unwatched">
              <Button fullWidth variant={"contained"}>
                <VisibilityOff />
              </Button>
            </Tooltip>
            <Tooltip title="Like">
              <Button fullWidth variant={"contained"} sx={{ color: "green" }}>
                <ThumbUp />
              </Button>
            </Tooltip>
          </CardActions>
        </Card>
      </Container>
    </div>
  );
}

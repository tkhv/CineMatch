import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";

import { ThumbUp, ThumbDown, VisibilityOff } from "@mui/icons-material";

const tiers = [
  {
    title: "Free",
    price: "0",
    description: [
      "10 users included",
      "2 GB of storage",
      "Help center access",
      "Email support",
    ],
    buttonText: "Sign up for free",
    buttonVariant: "outlined",
  },
  {
    title: "Pro",
    subheader: "Most popular",
    price: "15",
    description: [
      "20 users included",
      "10 GB of storage",
      "Help center access",
      "Priority email support",
    ],
    buttonText: "Get started",
    buttonVariant: "contained",
  },
  {
    title: "Enterprise",
    price: "30",
    description: [
      "50 users included",
      "30 GB of storage",
      "Help center access",
      "Phone & email support",
    ],
    buttonText: "Contact us",
    buttonVariant: "outlined",
  },
];
const footers = [
  {
    title: "Company",
    description: ["Team", "History", "Contact us", "Locations"],
  },
  {
    title: "Features",
    description: [
      "Cool stuff",
      "Random feature",
      "Team feature",
      "Developer stuff",
      "Another one",
    ],
  },
  {
    title: "Resources",
    description: [
      "Resource",
      "Resource name",
      "Another resource",
      "Final resource",
    ],
  },
  {
    title: "Legal",
    description: ["Privacy policy", "Terms of use"],
  },
];

export default function RatePage() {
  return (
    <div
      style={{
        backgroundColor: "black",
        height: "100vh",
        alignItems: "center",
      }}
    >
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            CineMatch
          </Typography>
          <nav>
            <Link
              variant="button"
              color="text.primary"
              href="/rate"
              sx={{ my: 1, mx: 1.5 }}
            >
              Rate
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="#"
              sx={{ my: 1, mx: 1.5 }}
            >
              Browse
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="#"
              sx={{ my: 1, mx: 1.5 }}
            >
              Party
            </Link>
          </nav>
          <Button href="/" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
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

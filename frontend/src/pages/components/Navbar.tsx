import { useLocation } from "react-router-dom";

import { AppBar, Toolbar, Typography, Link, Button } from "@mui/material";

export default function Navbar() {
  const location = useLocation();
  return (
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
            href="/browse"
            sx={{ my: 1, mx: 1.5 }}
          >
            Browse
          </Link>
          <Link
            variant="button"
            color="text.primary"
            href="/party"
            sx={{ my: 1, mx: 1.5 }}
          >
            Party
          </Link>
        </nav>
        {location.pathname !== "/" && (
          <Button href="/" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

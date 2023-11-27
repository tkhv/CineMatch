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
    const [recs, setRecs] = useState<Movie[]>([]); // initialize recs.
    const [sort, setSort] = useState<"popularity.desc" | "vote_count.desc">("vote_count.desc");

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
            const data = await getRecs(page, sort, [12, 13, 14]); // NOTE: here we are making the API call to TMDB.
            setRecs(data);
            console.log(data);
        }
        fetchRecs();
    }, [sort, page]);

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
                                label="Add Group Members to Your Party"
                                variant="outlined"
                            />

                            <Button
                                sx={{
                                    fontSize: 24,
                                    bgcolor: "white"
                                }}
                                variant="contained"
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
                                    <FormControlLabel value="top" control={<Switch color="default" onChange={handleChange} />} label="Sort By" labelPlacement="top" />
                                    <Typography>Popularity</Typography>
                                </Stack>
                            </FormControl>
                        </Stack>
                    </Container>
                </Box>
                <Grid container style={{ paddingTop: "2%", marginLeft: "-6%" }}>
                    {recs.map((movie) => (
                        <Grid item key={movie.movie_id} xs={12} sm={6} md={4}>
                            <MovieCard movie={movie} incMovieIndex={() => {}} display={false} />
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

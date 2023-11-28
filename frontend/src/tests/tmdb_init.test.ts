import {describe, expect, test} from '@jest/globals';
import { render, waitFor, screen } from "@testing-library/react";

// NOTE: to run tests we execute the command in the CLI: "npm run test".

test("TMDB Connection Initialization", () => {
    // TODO: test our connection to the TMDB API... an easy test... just check that no errors once app is booted and we are getting movie recommendations.
    // NOTE: the expect() in JEST testing acts sort of AssertEqual in JUNIT testing...
    const url = "https://api.themoviedb.org/3/movie/top_rated";
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: process.env.REACT_APP_TMDB_API_TOKEN || "NOT_SET",
        },
    };

    const response = fetch(url, options);
    response
        .then((resp) => expect(resp.status).toBe(200));
})

import {describe, expect, test} from '@jest/globals';
import { render, waitFor, screen } from "@testing-library/react";

// NOTE: to run tests we execute the command in the CLI: "npm run test".

test("TMDB Connection Initialization", async () => {
    // NOTE: the expect() in JEST testing acts sort of AssertEqual in JUNIT testing...
    const url = "https://api.themoviedb.org/3/movie/top_rated";
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: process.env.REACT_APP_TMDB_API_TOKEN || "NOT_SET",
        },
    };

    const response = await fetch(url, options);
    expect(response.status).toBe(200);
    // const response = fetch(url, options);
    // response
    //     .then((resp) => expect(resp.status).toBe(200))
    //     .catch((err) => expect(err.status).toBe(200))
})

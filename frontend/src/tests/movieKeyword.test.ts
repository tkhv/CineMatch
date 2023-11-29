import {describe, expect, test} from '@jest/globals';
import { render, waitFor, screen } from "@testing-library/react";

// NOTE: to run tests we execute the command in the CLI: "npm run test".

test("TMDB Connection Initialization", () => {
    // NOTE: the expect() in JEST testing acts sort of AssertEqual in JUNIT testing...
    const url = "https://api.themoviedb.org/3/movie/155/keywords";
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: process.env.REACT_APP_TMDB_API_TOKEN || "NOT_SET",
        },
    };

    const targetResult = [
        {
          "id": 9537,
          "name": "joker"
        },
        {
          "id": 4426,
          "name": "sadism"
        },
        {
          "id": 4630,
          "name": "chaos"
        },
        {
          "id": 1308,
          "name": "secret identity"
        },
        {
          "id": 853,
          "name": "crime fighter"
        },
        {
          "id": 9715,
          "name": "superhero"
        },
        {
          "id": 2095,
          "name": "anti hero"
        },
        {
          "id": 3151,
          "name": "scarecrow"
        },
        {
          "id": 9717,
          "name": "based on comic"
        },
        {
          "id": 7002,
          "name": "vigilante"
        },
        {
          "id": 10291,
          "name": "organized crime"
        },
        {
          "id": 10044,
          "name": "tragic hero"
        },
        {
          "id": 14625,
          "name": "anti villain"
        },
        {
          "id": 18023,
          "name": "criminal mastermind"
        },
        {
          "id": 33518,
          "name": "district attorney"
        },
        {
          "id": 33637,
          "name": "super power"
        },
        {
          "id": 163074,
          "name": "super villain"
        },
        {
          "id": 207268,
          "name": "neo-noir"
        }
    ]
    
    let resJSON;
    const response = fetch(url, options);
    response
        .then((resp) => resp.json())
        .then((data) => {
            resJSON = data.keywords;
            expect(resJSON).toBe(targetResult);
        })

})
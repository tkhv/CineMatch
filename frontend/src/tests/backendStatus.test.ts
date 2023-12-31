import {describe, expect, test} from '@jest/globals';
import { render, waitFor, screen } from "@testing-library/react";

// NOTE: to run tests we execute the command in the CLI: "npm run test".

test("TMDB Connection Initialization", () => {
    // NOTE: the expect() in JEST testing acts sort of AssertEqual in JUNIT testing...
    const url = "https://cinematch-7e963.ue.r.appspot.com/";
    const response = fetch(url);
    response
        .then((resp) => expect(resp.status).toBe(200));
})

import {describe, expect, test} from '@jest/globals';
import { render, waitFor, screen } from "@testing-library/react";

// NOTE: to run tests we execute the command in the CLI: "npm run test".

const randInt = Math.floor(Math.random() * 1000);
const usernameTarget = "User" + randInt;
const passwordTarget = "Pass" + randInt;
const emailTarget = "email" + randInt + "@gmail.com";

test("Signup Test", async () => {
    // TODO: test the signup functionality... basically sign up any new user... (use some randomizer to generate a new user and password combo and make sure it works).
    // NOTE: the expect() in JEST testing acts sort of AssertEqual in JUNIT testing...

    const url1 = "https://cinematch-7e963.ue.r.appspot.com/signup";
    const options1 = {
        method: "POST",
        body: JSON.stringify({
            username: usernameTarget,
            password: passwordTarget,
            email: emailTarget
        })
    };

    // const response1 = await fetch(url1, options1);
    // expect(response1.status).toBe(201);

    const response1 = fetch(url1, options1);
    response1
        .then((resp) => {
            console.log(resp.status);
            expect(resp.status).toBeNull()
        });
})

test("Login Test", async () => {
    const url2 = "https://cinematch-7e963.ue.r.appspot.com/login";
    const options2 = {
        method: "POST",
        body: JSON.stringify({
            username: usernameTarget,
            password: passwordTarget
        })
    };

    // const response2 = await fetch(url2, options2);
    // expect(response2.status).toBe(200);

    const response2 = fetch(url2, options2);
    response2
        .then((resp) => {
            console.log(resp.status);
            expect(resp.status).toBe(200)
        });
})

test("Delete Test", async () => {
    const url3 = "https://cinematch-7e963.ue.r.appspot.com/deleteUser";
    const options3 = {
        method: "DELETE",
        body: JSON.stringify({
            username: usernameTarget
        })
    };

    // const response3 = await fetch(url3, options3);
    // expect(response3.status).toBe(200);

    const response3 = fetch(url3, options3);
    response3
        .then((resp) => {
            console.log(resp.status);
            expect(resp.status).toBe(200)
        });
})

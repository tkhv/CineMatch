# Getting Started with CineMatch

GT CS3300 Project 2, Group 5

## Installation _(Frontend)_

This project uses Node Package Manager

First, get a (free) TMDB `API Read Access Token` from [here](https://www.themoviedb.org/settings/api).
    note: may have to create an account with TMDB
Then, add it to your `frontend` `.env`:

```
REACT_APP_TMDB_API_TOKEN="bearer {YOUR_API_READ_ACCESS_TOKEN}"
```

From `frontend`, install and run the development server:

```bash
npm install
npm start
```

The page opens on [http://localhost:3000](http://localhost:3000).

Please consult [HowToGenerateTMDBToken.md](HowToGenerateTMDBToken.md) for more information on generating the `API Read Access Token` (step-by-step instructions with pictures).

Please note that it is a TMDB API convention to add the string "bearer" prior to the `API Read Access Token` when constructing the `REACT_APP_TMDB_API_TOKEN` inside `.env`.  

## Installation _(Backend)_
The `backend` endpoints can be accessed through the `backend` readme file. However to start the program in your machine you can follow the steps:

First you will need to make a GCP project and initilize a firebase database. Then go to [here](https://console.firebase.google.com/project/_/settings/serviceaccounts/adminsdk?_gl=1*1tclzc4*_ga*MTIzOTI1NjQyMy4xNzAwNjk2NjQ4*_ga_CW55HF8NVT*MTcwMTIyMjk2MS40LjEuMTcwMTIyNDYyMi41OC4wLjA.) to get a json key file. Add a `credentials` file under your backend and add the key into it. Then in your `index.js` add the file path to `serviceAccount`.

Then in the database make two collections one called users and the other called groups. The user has a password, username and email and the group has a groupname. Then run the server using Node Package Manager:

```bash
npm install
npm start
```
If errors occured during run, the `package` files has the depndencies of the program make sure they align with the versions used by your machine. If there's still an issue then download a package file by running `npm init` then `npm install firebase-admin --save` and follow the step in [here](https://firebase.google.com/docs/admin/setup#node.js)
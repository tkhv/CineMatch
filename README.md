# Getting Started with CineMatch

GT CS3300 Project 2, Group 5

## Installation _(Frontend)_

First, get a (free) TMDB `API Read Access Token` from [here](https://www.themoviedb.org/settings/api). 
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
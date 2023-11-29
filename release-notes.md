# Release Notes

This document contains release notes for version 1.0.0 of CineMatch. It is the version being
submitted for the project.

## Software Features

This release of CineMatch is complete with the following features:

- API deployed on GCP at https://cinematch-7e963.ue.r.appspot.com/
- Frontend deployed via Github Pages at https://tkhv.github.io/ (also using Vercel).
- Signup/Login system with users stored in GCP FireBase.
- Dropdown for configuring transportation method
- Interactive movie like/dislike cards.
- Group functionality.
- Movie recommendations based on preferences and past history.
- Randomized movie recommendation to help you get started watching.
- Party tab (for group movie recommendations).

## Bug Fixes

There aren't bug fixes from prior major versions since this is the first. That said, these are major
bug fixes that were fixed during development:

- Added CORS support to allow API calls from frontend.
- Added dropdown transport support.
- Fix path in FBInitialize to ensure proper deployment of FireBase DB.
- Fix various errors that would occur due to incorrectly calling the TMDB API.
- Fixed sign up / login view switching taking a long time.

## Known Bugs and Defects

At this point, the following bugs are present:

- Did not use BCrypt for password protection
- Proper status codes are not returned in all error cases
- User checking is only based on name and not also email
- Cover image not loading.

## Help

Please see the README and/or install and setup guides for help with building, running, and troubleshooting
CineMatch.
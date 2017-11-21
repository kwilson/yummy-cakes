# yummy-cakes
Coding test app to display the contents of the given API.

## Running
I originally had some issues with the API so had started building out a mock version of it using Restify and running both sites using Docker. Rather than delete that, I thought it worth leaving both in in case anyone wanted a look.

There's still an open issue with the API that I logged within the repo on GitHub.

I've commented out the API launcher from the Docker compose file.

### Using Docker
`npm start` from the project root will mount the web app within a Docker container and launch at http://localhost:3000.

### Using Yarn
- `cd web`  
- `yarn install`  
- `yarn start`

This will launch the app using Webpack's dev server again on http://localhost:3000.

### Running Tests
- `cd web`  
- `yarn install`  
- `yarn test` or `yarn test --coverage`

## Overview
I've created this as a React/Redux app using [Redux-Api](https://github.com/lexich/redux-api) to handle the wrapping of the API calls.

The client code is Typescript 2.6.

## Future Enhancements
I was planning on creating a component for the 'Yum Factor' selector when POSTing a new Cake but ran out of time so that's just a numeric input field for now.

# Basic Auth Example (No Expiration / Refresh Token)

## Improvements

- Use express built-in error handling instead of try/catch blocks on every route
- Custom error messages / structure / status
- JWT Expiration
- Provide refresh token if the user is in the same session
- Stronger input validation
- Better Model validation (email / password)

## Startup Instructions

- Clone repository
- run `yarn install`
- Create a `.env` file following the `.env-sample`
- to start w/ nodemon run `yarn dev`
- to start normally run `yarn start`

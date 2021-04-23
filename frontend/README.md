# Todo Svelte Web App

## Project structure

 ```
 📂
 ├── rollup.config.js    Used by Svelte to build the app bundle
 ├── public/             Svelte public files
 └── src/
     ├── components/     Svelte UI components
     ├── api.js          Module used to access api and manage authentication
     ├── main.js         App entry point
     └── App.svelte      Root component
 ```

## Enviroment variables

 **API_URL** : api url (eg. `http://www.api.com/v1:3000`)
 **LOCALTUNNEL_WORKAROUND** : adds a custom header to api requests to bypass localtunnel's reminder page

## Scripts

 ### `npm run build`

 Builds the app bundle

 ### `npm run dev`

 Builds and serves the app on port 5000 in development

 ### `npm start`

 Serves the app and exposes it to the network on port 5000

## Caveats

 Because the code is run on the client browser, *env variables cannot be changed on the run*.\
 As a workaround, the Dockerfile will build the app declaring env variables as build ARGs.

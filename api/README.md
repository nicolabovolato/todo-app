# Todo Fastify Api

## Project structure

 ```
 📂
 └── src/
     ├── decorators/     Fastify decorators used as dependency injection objects
     ├── routes/         Contains the api routes and the logic for each route
     ├── validators/     Contains the routes' request and response validators
     └── index.js        Api entry point
 ```

## Enviroment variables

 **DB_HOST** : database host       (eg. `localhost`)
 **DB_PORT** : database port       (eg. `5432`)
 **DB_USER** : database user       (eg. `postgres`)
 **DB_PASS** : database password   (eg. `postgres`)
 **DB_NAME** : database name       (eg. `todos`)

 **JWT_SECRET** : jwt token secret (eg. `secret`)

## Scripts

 ### `npm run dev`

 Serves the api on port 3000 using nodemon

 ### `npm start`

 Serves the api on port 3000

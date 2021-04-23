# Docker compose

 To expose the app on the internet [localtunnel](https://localtunnel.me) has been used.
 A python script is used to automates the subdomain generation and builds the frontend accordingly.

## Enviroment variables

 **DB_USER** : database user         (eg. `postgres`)\
 **DB_PASS** : database password     (eg. `postgres`)\
 **DB_NAME** : database name         (eg. `todos`)

 **JWT_SECRET** : jwt token secret   (eg. `secret`)

 **API_SUBDOMAIN** : subdomain used by localtunnel, will be set by the python script
 **USE_LOCALTUNNEL** : used by the script to add a custom header on the frontend for api requests

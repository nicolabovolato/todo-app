FROM node:14-alpine
WORKDIR /usr/app

COPY package.json .
COPY package-lock.json .
RUN npm ci

COPY . .

# svelte cannot read enviroment variables, this is a workaround
ARG API_URL
RUN echo API_URL=$API_URL > .env
RUN npm run build

EXPOSE 5000
CMD npm start

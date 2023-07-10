#Stage 1: Build react app
FROM node:16-alpine as build

WORKDIR /app

#Copy package.json 
COPY package*.json ./


# Disable SSL certificate verification for npm
RUN npm config set strict-ssl false
RUN npm install

#Copy app source code
COPY . .

RUN chown -R 3000:3000 "/app"
RUN npm cache clean --force

#Build the react app
RUN npm run build

#Stage 2: Serve the built react app
FROM node:16-alpine

WORKDIR /app

#Copy the built app from previous stage
COPY --from=build /app/build ./build 
COPY server.js ./

#Install dependencies of server.js
RUN npm install express
CMD ["node", "server.js"]

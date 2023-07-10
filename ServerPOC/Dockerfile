# Stage 1: Build React app
FROM node:14 as build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy app source code
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve the built React app
FROM node:14-alpine

WORKDIR /app

# Copy the built app from the previous stage
COPY --from=build /app/build ./build
COPY server.js ./

# Install production dependencies (only required if your server.js file depends on additional modules)
# RUN npm ci --production

# Set the CMD to start the server
CMD ["node", "server.js"]

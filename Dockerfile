# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=20.19.2
FROM node:${NODE_VERSION}-slim as base

LABEL fly_launch_runtime="NodeJS"

# NodeJS app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV=production

# Throw-away build stage to reduce size of final image
FROM base as build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install -y python-is-python3 pkg-config build-essential 

# Install frontend dependencies first
COPY --link package.json package-lock.json ./
COPY --link server/package.json ./server/
RUN npm ci --include=dev

# Install server dependencies
RUN cd server && npm install --production

# Copy application code
COPY --link . .

# Set the API URL for production build
# ENV VITE_API_BASE_URL=https://pdw.fly.dev

# Build application
RUN npm run build 

# Remove development dependencies
RUN npm prune --production

# Final stage for app image
FROM base

# Copy built application
COPY --from=build /app /app

# Start the server by default, this can be overwritten at runtime
CMD [ "npm", "run", "start" ]

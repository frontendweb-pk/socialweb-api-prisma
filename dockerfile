# Use an official Node.js runtime as a parent image
FROM node:19-bullseye  AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Install pnpm globally
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if exists) to install deps
COPY package*.json ./


# Install app dependencies with pnpm
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Expose the port the app will run on
EXPOSE 3000

CMD ["pnpm","start"]

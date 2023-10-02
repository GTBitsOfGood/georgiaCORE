# Use an official Node runtime as the parent image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and yarn.lock files to the container
COPY package.json yarn.lock ./

# Install application dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application to the container (not necessary for dev, but a good practice)
COPY . .

# The command to run the application in development mode
CMD ["yarn", "dev"]

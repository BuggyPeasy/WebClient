# Use an official Node.js runtime as the base image
FROM node:latest

# Set the working directory in the container
WORKDIR /client

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the contents of the /dist/ directory into the container
COPY dist/ ./dist/

# Expose the port your application will run on (must match the -p flag in your npm script)
EXPOSE 8080

# Define the command to start your application (npm start)
CMD ["npm", "start"]

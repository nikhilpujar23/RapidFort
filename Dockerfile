# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Copy the uploads folder to the container
COPY uploads/ ./uploads/

# Expose the port that the app will run on
EXPOSE 3000

# Command to run your application
CMD [ "node", "server.js" ]

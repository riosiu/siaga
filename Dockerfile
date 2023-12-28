# Use Node.js 18 as the base image
FROM node:18


#Add NPM
RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y nodejs \
    npm

# Set the working directory in the container
WORKDIR /var/www

# Copy package.json and package-lock.json to the working directory
Copy . .
COPY package.json ./

# Install dependencies
RUN npm install
RUN npm install express
RUN npm install --save-dev nodemon 
RUN npm install @prisma/client

# Expose the port your app will run on
EXPOSE 3000

# Command to run your application
ENV HOST=0.0.0.0
CMD ["npm", "run", "npm-prod", "--host", "0.0.0.0", "--port", "3000"]

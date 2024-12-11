# Use Node.js image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy only package.json and package-lock.json first to leverage Docker caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the React development server port
EXPOSE 3000

# Start the development server
CMD ["npm", "start"]
# Use Node.js image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy only package.json and package-lock.json first to leverage Docker caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the React development server port
EXPOSE 3000

# Default command for development
CMD ["npm", "start"]

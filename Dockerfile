# Stage 1: Build the Angular application
FROM node:18.20.2 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code to the working directory
COPY . .

# Build the Angular application
RUN npm run build --prod

# Stage 2: Serve the application with Nginx
FROM nginx:1.21.1-alpine

# Copy the build output to Nginx's html directory
COPY --from=build /app/dist/pipe-it-in-frontend/browser /usr/share/nginx/html

# Copy a custom Nginx configuration file (optional)
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

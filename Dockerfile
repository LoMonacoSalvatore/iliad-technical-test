# Step 1: Use a Bun base image
FROM oven/bun:1.1.13 as builder
WORKDIR /app

# Copy dependencies and install
COPY package.json bun.lock ./
RUN bun install

# Copy the rest of the app
COPY . .

# Build the app
RUN bun run build

# Step 2: Serve the static files with Nginx
FROM nginx:alpine

# Copy your built app into Nginx public directory
COPY dist /usr/share/nginx/html


EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
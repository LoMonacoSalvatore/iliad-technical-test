# Step 1: Use a Bun base image
FROM oven/bun:1.1.13-alpine AS builder
WORKDIR /app

# Copy dependencies and install
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

# Copy the rest of the app
COPY . .

# Build the app
RUN bun run build && ls -la /dist

# Step 2: Serve the static files with Nginx
FROM nginx:alpine

# Copy your built app into Nginx public directory
COPY --from=builder /dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
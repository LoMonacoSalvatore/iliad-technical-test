# Step 1: Use a Bun base image
FROM node:20 AS builder
WORKDIR /app

# Copy dependencies and install
COPY package.json bun.lock ./

RUN rm -rf node_modules package-lock.json

RUN npm install --frozen-lockfile

# Copy the rest of the app
COPY . .

ENV TAILWIND_DISABLE_OXIDE=1

# Build the app
RUN npm run build

# Step 2: Serve the static files with Nginx
FROM nginx:alpine

# Copy your built app into Nginx public directory
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
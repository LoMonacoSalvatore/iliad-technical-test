# Install dependencies and build the app locally
build:
	bun install
	bun run build

# Build and run the container using Docker Compose
docker:
	docker-compose up --build

# Stop and remove containers
clean:
	docker-compose down

# Build only the Docker image
docker-build:
	docker-compose build

# Run only (no rebuild)
run:
	docker-compose up

# Remove containers, images, and volumes (careful!)
nuke:
	docker system prune -af --volumes
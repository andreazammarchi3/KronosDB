# Build the Docker images
build:
    docker-compose build

# Start the Docker containers
up:
    docker-compose up -d

# Stop the Docker containers
down:
    docker-compose down

# Remove the Docker containers and images
clean:
    docker-compose down --rmi all

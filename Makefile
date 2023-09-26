# Define variables
REPO_URL = https://github.com/andreazammarchi3/KronosDB
TARGET_DIR = $(HOME)/Desktop/KronosDB

.PHONY: all clone build up

all: clone build up

clone:
    # Check if the target directory already exists
    if [ -d "$(TARGET_DIR)" ]; then \
        # If it does, change to the directory and pull any changes from origin
        cd "$(TARGET_DIR)" && git pull origin main; \
    else \
        # If it doesn't, clone the repository to the target directory
        git clone "$(REPO_URL)" "$(TARGET_DIR)"; \
    fi

build:
    # Change to the cloned directory
    cd "$(TARGET_DIR)"
    # Build the Docker containers
    docker-compose build

up:
    # Start the Docker containers in detached mode
    docker-compose up -d

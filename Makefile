clone:
	git -C ~/Desktop/KronosDB pull || git clone https://github.com/andreazammarchi3/KronosDB.git ~/Desktop/KronosDB

build:
	cd ~/Desktop/KronosDB && docker-compose build

up:
	cd ~/Desktop/KronosDB && docker-compose up -d

down:
	cd ~/Desktop/KronosDB && docker-compose down --rmi all

all: down clone build up

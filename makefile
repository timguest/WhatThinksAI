run:
	docker-compose up
run-detached:
	docker-compose up -d	
build:
	docker-compose build
prune:
	docker system prune -a -f
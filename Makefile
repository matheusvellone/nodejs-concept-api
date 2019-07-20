.PHONY: down clean dev logs

# Development
dev: setupdb-dev api-dev

logs:
	@docker-compose logs -f api

api-dev:
	@docker-compose up --build -d api

setupdb-dev: database-dev migrate-dev seed-dev

database-dev:
	@docker-compose up -d postgres
	@sleep 3

migrate-dev:
	@docker-compose run --rm api npm run migrate

seed-dev:
	@docker-compose run --rm api npm run seed

psql:
	@docker-compose exec postgres psql user=postgres

# Cleanup
down:
	@docker-compose down

clean:
	@docker-compose down -v --rmi local --remove-orphans

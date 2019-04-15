export PGPASSWORD ?= $(DB_PASSWORD)

export DB_ENTRY ?= psql -h $(DB_HOST) -U $(DB_USER)

create-db:
	$(DB_ENTRY) ${DEFAULT_DB} -tc "SELECT 1 from pg_database where datname = '${DB_NAME}'" | grep -q 1 || $(DB_ENTRY) ${DEFAULT_DB} -c 'CREATE DATABASE "${DB_NAME}"';

run-migrations:
	npx sequelize-cli db:migrate

dev_server: create-db run-migrations
	npm start

dev_worker:
	npm run start:worker

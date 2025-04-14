bucket_name ?= backups-siqtraq
cloud_sql_name ?= enine-pg13
database_name ?= evonoveit
current_date = $(shell date +"%Y%m%d")
filename = export-$(current_date)-$(database_name)
filename_compressed = $(filename).gz
bucket_uri ?= gs://$(bucket_name)/evonove.it/$(filename_compressed)
services_file = docker-services.yml

.PHONY: export-sql import-production-db start-services stop-services drop-services
# This needs to be secondary so we don't export the db if we already have it
.SECONDARY: $(filename_compressed)

$(filename_compressed):
	gcloud sql export sql $(cloud_sql_name) $(bucket_uri) --database=$(database_name)
	gsutil cp $(bucket_uri) .

export-sql: $(filename_compressed)

$(filename): $(filename_compressed)
	gunzip $(filename_compressed)

import-production-db: $(filename)
	docker compose -f $(services_file) down -v
	docker compose -f $(services_file) up -d
	until pg_isready -h localhost -U devel; \
		do \
		>&2 echo "Waiting for database to be ready..."; \
		sleep 3; \
	done
	psql -U devel -h localhost -p 5432 -d evonoveit < $(filename)

start-services:
	docker compose -f $(services_file) up -d

stop-services:
	docker compose -f $(services_file) stop

drop-services:
	docker compose -f $(services_file) down

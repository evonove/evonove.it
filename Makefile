bucket_name ?= backups-siqtraq
cloud_sql_name ?= enine-pg17
database_name ?= evonoveit
current_date = $(shell date +"%Y%m%d")
filename = export-$(current_date)-$(database_name)
filename_compressed = $(filename).gz
bucket_uri ?= gs://$(bucket_name)/evonove.it/$(filename_compressed)
services_file = docker-services.yml


now_time := $(shell date -d "tomorrow" '+%Y-%m-%d-%H:%M:%S')
json_report = --format json --output /evonove/trivy-results/trivy-$(now_time).json
html_report = --format template --template "@/evonove/trivy-template/html.tpl" --output /evonove/trivy-results/trivy-$(now_time).html


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

trivy:
	mkdir -p ./trivy-results
	@echo "Select output format:"; \
	echo "1) JSON"; \
	echo "2) HTML"; \
	read -p "Enter choice [1-2]: " choice; \
	case $$choice in \
			1) format_flag="$(json_report)";; \
			2) format_flag="$(html_report)";; \
			*) echo "Invalid choice"; exit 1;; \
		esac; \
	docker run --rm -v $$(pwd):/evonove aquasec/trivy fs \
	--severity HIGH,CRITICAL \
	--dependency-tree \
    --scanners vuln,misconfig,secret /evonove \
    --skip-dirs /evonove/.tox,/evonove/.venv --ignore-unfixed \
    $$format_flag

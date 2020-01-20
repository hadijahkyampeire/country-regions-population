docker-compose up -d --build

# Lint
docker-compose exec population_server black --exclude=migrations .
docker-compose exec population_server /bin/sh -c "isort ./*/*.py"

# Check for linting errors
docker-compose exec population_server black --exclude=migrations --check .
docker-compose exec population_server flake8 .
docker-compose exec population_server /bin/sh -c "isort ./*/*.py --check-only"

# run python tests with coverage
docker-compose exec population_server python manage.py test-cov
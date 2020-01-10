#!/bin/sh
​
echo "Waiting for postgres..."
​# nc- netcat command in bash
# z- zero so -z means its not zero
while ! nc -z population-db 5432; do
    sleep 0.1
done
​
echo "PostgreSQL started"
​
python manage.py run -h 0.0.0.0
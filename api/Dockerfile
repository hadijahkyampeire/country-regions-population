FROM python:3.7.4-alpine

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install dependencies
RUN apk update && \
    apk add --virtual build-deps gcc python3-dev musl-dev && \
    apk add postgresql-dev && \
    apk add netcat-openbsd

#set working dir
RUN mkdir -p /usr/src/api
WORKDIR /usr/src/api

#add and install requirements
RUN pip install pipenv
COPY ./Pipfile /usr/src/api
RUN pipenv lock --requirements > requirements.txt
RUN pip install -r requirements.txt

# add entrypoint.sh
COPY ./entrypoint.sh /usr/src/api/entrypoint.sh
RUN chmod +x /usr/src/api/entrypoint.sh

COPY . /usr/src/api

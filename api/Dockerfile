FROM python:3.7.4-alpine

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install dependencies
RUN apk update && \
    apk add --virtual build-deps gcc python3-dev musl-dev && \
    apk add postgresql-dev bind-tools && \
    apk add netcat-openbsd

#set working dir
RUN mkdir -p /usr/src/api
WORKDIR /usr/src/api

#add and install requirements
RUN pip install --upgrade pip
RUN pip install pipenv pipenv_to_requirements
COPY ./Pipfile* /usr/src/api/
RUN pipenv run pipenv_to_requirements -f
RUN pip install -r requirements.txt
RUN pip install -r requirements-dev.txt

# add entrypoint.sh
COPY ./entrypoint.sh /usr/src/api/entrypoint.sh
RUN chmod +x /usr/src/api/entrypoint.sh

COPY . /usr/src/api

# base image
FROM node:12.2.0-alpine

# set working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /usr/src/app/package.json
COPY yarn.lock /usr/src/app/yarn.lock
RUN yarn install --silent
RUN yarn add react-scripts -g --silent

# copy the client directory into the container
COPY . /usr/src/app

# start app
CMD ["yarn", "start"]

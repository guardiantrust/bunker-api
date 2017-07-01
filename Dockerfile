FROM node:boron 

RUN mkdir -p /usr/src/bunker-api
WORKDIR /usr/src/bunker-api

COPY package.json /usr/src/bunker-api
RUN npm install

COPY . /usr/src/bunker-api
EXPOSE 9001
CMD  ["npm, "start"]
FROM ubuntu
MAINTAINER Aaron Peterson <aaron@kronosautomation.com>


RUN apt-get update
RUN apt-get -y install python-software-properties git build-essential
RUN apt-get update
RUN apt-get -y install nodejs

ADD package.json ../package.json
RUN cd /tmp && npm install
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/


WORKDIR /src/bunker-api/web
ADD . /src/bunker-api/web

RUN npm install

# application port
EXPOSE 5000
 #Directory of app

CMD [ "npm" , "index.js" ]



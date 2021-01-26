FROM node:9.11

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN npm install -g npm@6.14.9
COPY package.json /usr/src/app/
COPY package-lock.json /usr/src/app/
RUN npm ci
COPY . /usr/src/app

EXPOSE 8080

CMD [ "npm", "start" ]
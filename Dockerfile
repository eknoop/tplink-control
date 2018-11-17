FROM node:11

WORKDIR /app
COPY package.json /app
RUN npm config set unsafe-perm true && npm install
COPY . /app
EXPOSE 6668

CMD [ "npm", "start" ]

FROM node:carbon

# Create app directory
WORKDIR /api

# Install app dependencies
COPY ./rest-api/package.json ./rest-api/package-lock.json ./
RUN npm install

COPY ./rest-api/ .

CMD npm start
FROM node:carbon 

# Create app directory
WORKDIR /web

# Install app dependencies
COPY ./web/package.json ./web/yarn.lock ./
RUN yarn install

COPY ./web/ .

CMD yarn start
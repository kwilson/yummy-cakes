FROM node:carbon 

# Set webpack dev server to use polling
ENV CHOKIDAR_USEPOLLING true

# Create app directory
WORKDIR /web

# Install app dependencies
COPY ./web/package.json ./web/yarn.lock ./
RUN yarn install

COPY ./web/ .

CMD yarn start
FROM node:10-alpine
# setup git + ssh
RUN apk add --no-cache git openssh-client

# configure build-args to use them as env variables + set default values (to build wo args)
ARG PORT=8080

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# At this point we just have the package.json files
RUN npm install

# Bundle app source
COPY . .

# Set up env variables
ENV PORT=${PORT}

ENV NODE_ENV=production

# Build
RUN npm run build

EXPOSE ${PORT}

CMD npm run start

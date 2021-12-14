FROM node:12-alpine

# update packages
RUN apk update

# create root application folder
WORKDIR /ba-db

# copy configs to /ba-db folder
COPY package*.json ./
COPY tsconfig.json ./
COPY babel.config.js ./

# copy source code to /ba-db/src folder
COPY src ./src

# check files list
RUN ls -a


RUN npm install
RUN npm run build

EXPOSE 8899

CMD ["npm", "start"]

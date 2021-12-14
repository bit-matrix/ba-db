## build

docker build -t ba-db .

## run

docker run -d -p 8899:8899 ba-db

## image list

docker image ls

# Remove all images at once

docker rmi $(docker images -q)

### Container

## list active images

docker ps

## Stop all running containers

docker stop $(docker ps -a -q)

## Delete all stopped containers:

docker rm $(docker ps -a -q)

### bitmatrix-aggregate-db

DATA_DIR=/tmp/db node dist/app.js

## License

MIT
**Free Software, Hell Yeah!**

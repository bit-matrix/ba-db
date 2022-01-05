cd /root/github/bit-matrix/ba-db
git pull
docker build -t ba-db .
docker run -d -p 8899:8899 -v DataVolume1:/datavolume1 ba-db

## List db files

ls /var/lib/docker/volumes/DataVolume1/

## build

docker build -t ba-db .

## run

docker run -d -p 8899:8899 -v DataVolume1:/datavolume1 ba-db

## run interactive

docker run -it -p 8899:8899 -v DataVolume1:/datavolume1 ba-db

## run interactive, remove when stop

docker run -it --rm -p 8899:8899 -v DataVolume1:/datavolume1 ba-db

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

DATA_DIR=/ba-db/data-dir/ node dist/app.js

## License

MIT
**Free Software, Hell Yeah!**

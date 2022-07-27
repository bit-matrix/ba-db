# Install

mkdir /root/github/bit-matrix/new-pool
cd /root/github/bit-matrix/new-pool
git clone https://github.com/bit-matrix/ba-db.git
cd ba-db
git branch --set-upstream-to=origin
git pull

mkdir /var/lib/docker/volumes/DataVolume1/\_data/new-pool

# Update

cd /root/github/bit-matrix/new-pool/ba-db
git pull
docker build -t ba-db-new-pool .
docker run -d -p 4499:4499 -v DataVolume1:/datavolume1 ba-db-new-pool

## List db files

ls /var/lib/docker/volumes/DataVolume1/\_data/new-pool

## build

docker build -t ba-db .

## run

docker run -d -p 4499:4499 -v DataVolume1:/datavolume1 ba-db-new-pool

## run interactive

docker run -it -p 4499:4499 -v DataVolume1:/datavolume1 ba-db-new-pool

## run interactive, remove when stop

docker run -it --rm -p 4499:4499 -v DataVolume1:/datavolume1 ba-db-new-pool

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

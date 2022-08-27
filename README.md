# Install

mkdir /root/github/bit-matrix
cd /root/github/bit-matrix
git clone https://github.com/bit-matrix/ba-db.git
cd ba-db
git branch --set-upstream-to=origin
git pull

mkdir /var/lib/docker/volumes/DataVolumeMultiV2/\_data

# Update

cd /root/github/bit-matrix/ba-db
git pull
docker build -t ba-db-v2 .
docker run -d -p 4450:4450 -v DataVolumeMultiV2:/datavolumemultiv2 ba-db-v2

## List db files

ls /var/lib/docker/volumes/DataVolumeMultiV2/\_data

## build

docker build -t ba-db-v2 .

## run

docker run -d -p 4450:4450 -v DataVolumeMultiV2:/datavolumemultiv2 ba-db-v2

## run interactive

docker run -it -p 4450:4450 -v DataVolumeMultiV2:/datavolumemultiv2 ba-db-v2

## run interactive, remove when stop

docker run -it --rm -p 4450:4450 -v DataVolumeMultiV2:/datavolumemultiv2 ba-db-v2

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

# Install

create an .env file

docker build -t ba-db --build-arg DB_INTERNAL_DATA_DIR=data_dir .
docker run -d -p 8001:4499 --env-file ./.env ba-db

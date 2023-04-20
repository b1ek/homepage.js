#!/bin/bash

if [ ! -f .env ]; then
    echo "No .env; Please create .env and try again"
    exit
fi

. '.env'

cp docker-compose.prod docker-compose.yml
cp Dockerfile.prod Dockerfile

docker-compose build
if [ $? != 0 ]; then
    echo "Error while building; check logs" >&2
    exit -1
fi

echo -e "\033[1;32mProduction environment set up successfully\033[0m"
echo -e "Start it up with \033[1;32mdocker-compose up -d\033[0m!\n"
#!/bin/bash

cp docker-compose.prod docker-compose.yml
cp Dockerfile.prod Dockerfile

docker-compose build

echo -e "\033[1;32mProduction environment set up successfully\033[0m"
echo -e "Start it up with \033[1;32mdocker-compose up -d\033[0m!\n"
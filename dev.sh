#!/bin/bash

cp docker-compose.dev docker-compose.yml
cp Dockerfile.dev Dockerfile

docker-compose build

echo -e "\033[1;32mDevelopment environment set up successfully\033[0m"
echo -e "Start it up with \033[1;32mdocker-compose up -d\033[0m!\n"
#!/bin/sh

rm -rf dist/*
yarn run build $*

for f in ../../public/static/dist/*; do
    if [ "$f" != ".gitignore" ]
    then
        rm -rf "$f"
    fi
done
cp -r dist ../../public/static
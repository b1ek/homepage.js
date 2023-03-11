#!/bin/sh

rm -rf dist/*
yarn run build

rm -rf ../../public/static/dist
mv dist ../../public/static
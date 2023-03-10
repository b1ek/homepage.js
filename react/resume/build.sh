#!/bin/sh

rm -rf dist/*
yarn run build

mv dist ../../public/static
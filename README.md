# homepage.js
This is a rewrite of my current website to Express.JS.  
[Git repo](https://git.blek.codes/blek/homepage.js) | [Website](https://blek.codes)

# Warning: This branch is __experimental__
### This branch is untested and unstable, and probably won't work in production.
### Please don't use it for other purposes that development.
# Running an instance

First, [generate the app key](#generate-the-key).

### Debug
```bash
cp .env.example .env
APP_DEBUG=true sudo ./install
docker-compose up -d
```

### Production
Note: production instance is not production-ready yet, as it is still in development mode.

```bash
cp .env.example .env
echo "APP_DEBUG=false" >> .env # Or edit the file yourself
sudo ./install
docker-compose up -d
```

Also dont forget to build the [resume app](#build-the-resume)

## Build the resume
cd to `react/resume` and run `build.sh`.  
If you are running in debug mode, run `yarn/npm start`

## Generate the key
Cd to root of project and run `scripts/generate_key.py`
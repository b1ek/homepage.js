# homepage.js
This is a rewrite of my current website to Express.JS.  
[Git repo](https://git.blek.codes/blek/homepage.js) | [Website](https://blek.codes)

# Running an instance

First, [generate the app key](#generate-the-key).

### Debug
```bash
cp .env.example .env
APP_DEBUG=true sudo ./install
docker-compose up -d
```

### Production
```bash
cp .env.example .env
echo "APP_DEBUG=false" >> .env # Or edit the file yourself
sudo ./install
docker-compose up -d
```

Also dont forget to build the [resume app](#build-the-resume)

## Build the resume
cd to `react/resume` and run `build.sh`.  
If you are running in debug mode, run `yarn/npm start`.

**Note**: Generally, the app will build the resume by itself, although there is some exceptions.

## Generate the key
Cd to root of project and run `scripts/generate_key.py`
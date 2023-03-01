# homepage.js
This is a rewrite of my current website to Express.JS.  
[Git repo](https://git.blek.codes/blek/homepage.js) | [Demo](https://new.blek.codes) (may or may not work)

# Running an instance

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
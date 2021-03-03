# Pangaea take home


### Getting Started

#### Step 1: clone the repository

```bash
git clone git@github.com:brainiactech/Pangea-api.git Pangea-api
cd Pangea-api
```

#### Step 2: install General NPM packages

```bash
npm i
```

#### Step 3: install NPM packages on each microservice

1. cd into /Pangea-api/publisher and run npm install
2. cd into /Pangea-api/subscribers and run npm install


#### Step 4: define the database connection

Define Database for each service
  1. cd into /Pangea-api/publisher/config and set the db field accordingly


#### Step 5: start the server

This will start both service at the same time, ensure you run this on the /Pangea-api path and not inside the microservices path

```bash
npm start
```

#### Step 6: Additional Info

1. Publisher service currently runs on port 8000 - http://localhost:8000/publish, http://localhost:8000/subscribe
2. Subscribers service currently runs on port 9000 - http://localhost:9000/test1
3. Express gateway is used to bootstrap the service

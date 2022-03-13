# MUTIPLAY DRAW GAME 

## Introduction 

A multiplayer game where you can enter rooms and try to draw for other players to guess.

## How to run the api 

There are two ways to run the api, the first is using npm and the second is using docker. Before running the api, make sure you create an **.env** and **docker.env** file using the **example.env** file as a base.

### npm
```
cd api
npm install
npm run start
```

### docker
```
cd docker
docker-composer up
```

You can also run unit and integration tests in the api using
```
npm run test
```

## How to run the front end
You can run the frontend using npm or docker. The front will be visible in the port 3000.

### npm
```
cd api
npm install
npm run start
```

### docker
```
cd docker
docker-composer up
```

## Technologies used

### Api

- Node js
- Express js
- Typescript
- Redis
- Mongo
- Docker
- Jest

### Web

- React js
- Scss
- Typescript
- Docker

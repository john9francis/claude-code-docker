# Claude code container

To run:
```sh
docker build -t cc .
# Macos
docker run -v $(pwd)/app:/home/app --rm -it cc
# Windows
docker run -v ${PWD}/app:/home/app --rm -it cc
```

To persist claude data:
```sh
docker run -v ${PWD}/app:/home/app -v ${PWD}/.claude:/root/.claude/ --rm -it cc
```
Note that all this does is persist session ids and things, but you still have to login every time

To include api key:
```sh
docker run -v ${PWD}/app:/home/app --env-file .env --rm -it cc
```

## Todo
- [ ] How to pick up where you left off if you close the container
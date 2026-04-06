# Claude code container

To run:
```sh
docker build -t cc .
# Macos
docker run -v $(pwd)/app:/home/app --rm -it cc
# Windows
docker run -v ${PWD}/app:/home/app --rm -it cc
```

## Todo
- [ ] How to pick up where you left off if you close the container
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


# Local LLM with docker model runner
Goal: Docker compose app that starts claude code and a local ai model using docker model runner


# Prep work:
Pull the gpt-oss model and increase context size to 32k
```sh
docker model pull gpt-oss
docker model package --from ai/gpt-oss --context-size 32000 gpt-oss:32k
```

Specify environment variable (in dockerfile)
```
ANTHROPIC_BASE_URL=http://localhost:12434
```

Run claude specifying this model
```
claude --model gpt-oss:32k
```


# Running
Run claude code:
```sh
docker run -v $(pwd)/app:/home/app --rm -it cc
```

Start docker model runner
```sh
docker model run gpt-oss:32k
```

# Extra
Check what models are currently running
```sh
docker model ps
```
Note: docker models stop automatically if not in use.

Remove a model to save storage
```sh
docker model rm <model-name>
```

Enable tcp access with docker desktop (OPTIONAL)
```sh
docker desktop enable model-runner --tcp
```
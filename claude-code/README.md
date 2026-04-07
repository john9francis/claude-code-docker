# Claude code container

**To run (first time):**
Build the container from the dockerfile and run it
```sh
docker build -t cc .
# Macos
docker run -v $(pwd)/app:/home/app --rm -it cc
# Windows
docker run -v ${PWD}/app:/home/app --rm -it cc
```

**To persist claude data:**
```sh
docker run -v $(pwd)/app:/home/app -v $(pwd)/.claude:/root/.claude/ --rm -it cc
```
Note that all this does is persist session ids and things, but you still have to login every time

**To include api key:**
Create a .env file with ANTHROPIC_API_KEY=xxxxx
```sh
docker run -v $(pwd)/app:/home/app --env-file .env --rm -it cc
```

**Full run command including persisting data and .env file**
```sh
docker run -v $(pwd)/app:/home/app -v $(pwd)/.claude:/root/.claude/ --env-file .env --rm -it cc
```


# Local LLM with docker model runner
Goal: Docker compose app that starts claude code and a local ai model using docker model runner


## Prep work:
Enable tcp access with docker desktop so claude code can interact with it
```sh
docker desktop enable model-runner --tcp
```

Pull the gpt-oss model and increase context size to 32k
```sh
docker model pull gpt-oss
docker model package --from ai/gpt-oss --context-size 32000 gpt-oss:32k
```

## Notes
We need to specify this environment variable in our dockerfile so claude code knows where to find our LLM. Docker model runner (assuming tcp is enabled) runs at port 12434
```
ENV ANTHROPIC_BASE_URL=http://host.docker.internal:12434
```

This is how we run claude specifying the specific model we want. This is also specified in the dockerfile as the `ENTRYPOINT`. If we want a different entrypoint we simply use the `--entrypoint` command in the docker run command. 
```sh
claude --model gpt-oss:32k
```


## Running
Run claude code:
```sh
docker run -v $(pwd)/app:/home/app --rm -it cc
```


## Extra
**Chat with our gpt as just a chatbot**
```sh
docker model run gpt-oss:32k
```

**Check what models are currently running**
```sh
docker model ps
```
Note: docker models stop automatically after 5min if not in use.

**Remove a model to save storage**
```sh
docker model rm <model-name>
```

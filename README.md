# Claude code

## Philosophy
- Claude code is cool but you would never want to run it locally
- You don't want to give it access to your local filesystem, better to containerize with docker
- Docker model runner also allows you to specify your own ai model to claude code... not anthropic's
- Reasons for not wanting to use anthropics ai
  1. They can steal your data
  2. Your job may not allow you to send code to anthropic
  3. It costs money


## Ways of running:
1. Docker container running claude code with anthropic tokens
2. Docker model runner running local model, claude code in separate container
3. (Max security) docker sandboxes (experimental) running claude code, docker model running locally
4. Another sandbox method: deno sandbox or firecracker


# Useful websites
- [Docker sandboxes (experimental)](https://docs.docker.com/ai/sandboxes/)
- [Claude code - gpt-oss - docker model runner](https://www.docker.com/blog/run-claude-code-locally-docker-model-runner/)
- [Claude console for buying tokens](https://platform.claude.com/dashboard)

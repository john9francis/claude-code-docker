FROM debian:stable-slim

WORKDIR /opt/claude-code/

RUN apt update && apt install -y curl

RUN curl -fsSL https://claude.ai/install.sh | bash

ENV PATH="/root/.local/bin:$PATH"
ENV ANTHROPIC_BASE_URL=http://host.docker.internal:12434

WORKDIR /home/app

ENTRYPOINT [ "claude", "--model", "gpt-oss:32k" ]
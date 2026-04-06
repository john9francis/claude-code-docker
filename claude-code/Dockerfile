FROM debian:stable-slim

WORKDIR /opt/claude-code/

RUN apt update && apt install -y curl

RUN curl -fsSL https://claude.ai/install.sh | bash

ENV PATH="/root/.local/bin:$PATH"

WORKDIR /home/app

ENTRYPOINT [ "claude" ]
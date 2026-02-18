#!/bin/sh

if [ "$EUID" -ne 0 ]; then
  echo "Error: This script requires root privileges. Please run with sudo." >&2
  exit
fi

PROJECT_DIR="$( dirname "$( cd "$( dirname "$0" )" && pwd )" )"
echo $PROJECT_DIR

docker rm rat_wahl
docker build -t rat_wahl -f ${PROJECT_DIR}/container-image/Dockerfile .
docker run --name rat_wahl --init rat_wahl
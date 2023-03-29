#!/usr/bin/env bash

function install(){
  git clone https://github.com/move-language/move.git
  cd move
  docker build -t move/cli -f docker/move-cli/Dockerfile .
}

function move(){
  docker run -u `id -u`:`id -g` --rm -it -v $PWD:/project move/cli $@
}

$@

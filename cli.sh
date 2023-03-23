#!/usr/bin/env bash

function install(){
  git clone https://github.com/move-language/move.git
  cd move
  docker build -t move/cli -f docker/move-cli/Dockerfile .
  docker run -v `pwd`:/project move/cli build
}

$@

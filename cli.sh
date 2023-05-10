#!/usr/bin/env bash

function install(){
  git clone https://github.com/move-language/move.git
  cd move
  docker build -t move/cli -f docker/move-cli/Dockerfile .
}

function move(){
  docker run -u `id -u`:`id -g` --rm -it -v $PWD:/project move/cli $@
}

function sui(){
  sui client publish --gas-budget 100000000
  sui client switch --address "$ALICE"
sui client call \
  --function create_sword \
  --module simple_warrior \
  --package "$PACKAGE" \
  --args 100 \
  --gas-budget 10000000
# place the created sword's address in $SWORD

sui client switch --address "$BOB"
sui client call \
  --function create_shield \
  --module simple_warrior \
  --package "$PACKAGE" \
  --args 100 \
  --gas-budget 10000000
# same for the shield, in $SHIELD

sui client switch --address "$ALICE"
sui client call \
  --function create \
  --module escrow \
  --package "$PACKAGE" \
  --args "$BOB" "$THIRDPARTY" "$SWORD" "$SHIELD" \
  --type-args "$PACKAGE::simple_warrior::Sword" "$PACKAGE::simple_warrior::Shield" \
  --gas-budget 10000000
# let the escrow object above be exported as `SWORD_ESCROW`

sui client switch --address "$BOB"
sui client call \
  --function create \
  --module escrow \
  --package "$PACKAGE" \
  --args "$ALICE" "$THIRDPARTY" "$SHIELD" "$SWORD" \
  --type-args "$PACKAGE::simple_warrior::Shield" "$PACKAGE::simple_warrior::Sword" \
  --gas-budget 10000000
# let the escrow object above be exported as `SHIELD_ESCROW`

sui client switch --address "$THIRDPARTY"
sui client call --package $PACKAGE --module escrow --function swap --args $SWORD_ESCROW $SHIELD_ESCROW --gas-budget 10000000 --type-args "$PACKAGE::simple_warrior::Sword" "$PACKAGE::simple_warrior::Shield"
}

$@

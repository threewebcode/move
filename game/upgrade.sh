#!/usr/bin/env bash

sui client help
sui keytool help 
sui keytool import "path dawn point mass hollow surge identify pet velvet hover bar" ed25519
sui client switch --address 0xdcc2680302021a55088de7e310c045457ee08016d68557639c18a27dd766d8a1

sui client publish --gas-budget 300000000

# upgrade capability: 0x98501bb4a562ad61ee1e7a439d04ad7c2339cd711a9d8fcc6b81576419d8da4d
# package id: 0x6a90f376d0c7d6d1cc95d8463d6c6eba26e7f9b98c4ebd6feb55bb1157675e47
# address: 0xdcc2680302021a55088de7e310c045457ee08016d68557639c18a27dd766d8a1

sui client upgrade --upgrade-capability 0x98501bb4a562ad61ee1e7a439d04ad7c2339cd711a9d8fcc6b81576419d8da4d --gas-budget 300000000

# package id: 0xbbfea7d0889c68407fe5cd52a218dba6ee87eb5126b66854d61d9d02714a8e97
# upgrade capability: 0x98501bb4a562ad61ee1e7a439d04ad7c2339cd711a9d8fcc6b81576419d8da4d

# package id: 0xbf4b7b91733dc0a036653fc8ab8827846342c78ca54b446893fc8c015fd1ba84
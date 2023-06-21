#!/bin/bash

csv_file="winner.csv"
recipients=()
amounts=()
while read line; do
  IFS=',' read -ra fields <<< "$line"
  recipients+=("${fields[0]}")
  amounts+=(${fields[1]})
done < "$csv_file"
recipients_para=$(printf "%s " "${recipients[@]}")
account_para=$(printf "%d " "${amounts[@]}")
sui client pay-sui --input-coins "0x1fd49faed488d030dcea1463aee14c819fd0bb5c5e44d563ea33c7405fae4e24" --recipients ${recipients_para} --amounts ${account_para} --gas-budget 1000000000

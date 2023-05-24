#!/bin/bash

csv_file="winner.csv"
recipients=()
amounts=()
while read line; do
  IFS=',' read -ra fields <<< "$line"
  recipients+=("${fields[0]}")
  amounts+=(${fields[1]})
done < "$csv_file"
recipients_string=$(printf "\"%s\"", "${recipients[@]}")
amounts_string=$(printf "%d", "${amounts[@]}")
recipients_para="'["$recipients_string"]'"
account_para="'["$amounts_string"]'"
echo sui client pay_sui --input_coins '["coid_id"]' --recipients ${recipients_para} --amounts ${account_para} --gas-budget 1000000000

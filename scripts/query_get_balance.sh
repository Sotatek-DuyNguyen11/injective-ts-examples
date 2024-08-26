#!/bin/bash

NODE="https://testnet.sentry.tm.injective.network:443"
ACCOUNT="inj1zjw8wassl49rgltf4ythpdqqdn46dt3y4c060t" # inj1qwqal6egl9r45nn0433z6xsaz60d5m5v6tjhug
CONTRACT="peggy0x87ab3b4c8661e07d6372361211b96ed4dc36b1b5" # peggy0x87ab3b4c8661e07d6372361211b96ed4dc36b1b5

GET_BALANCE="{\"balance\": {\"address\": \"$ACCOUNT\"}}"
RES=$(injectived q bank balance "$ACCOUNT" "$CONTRACT" --node "$NODE" --output json)

echo $RES
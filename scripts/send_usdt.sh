#!/bin/bash

NODE="https://testnet.sentry.tm.injective.network:443"
CHAINID="injective-888"
SLEEP_TIME="5s"
CONTRACT="$1" # inj1hajw3kjyrn2xr42eu7t7ywtydlm0p6nma4m6qh
ACCOUNT="$2" # inj1ecmnm5vj0j2rkwkf4v4p9ay3etlg82x3dwuzsq
AMOUNT="$3" # 2000000

TRANSFER="{\"deposit\": {\"amount\": \"$AMOUNT\"}}"

RES=$(injectived tx wasm execute "$CONTRACT" "$TRANSFER" --from "$ACCOUNT" --amount "${AMOUNT}peggy0x87aB3B4C8661e07D6372361211B96ed4Dc36B1B5" --chain-id "$CHAINID" --node "$NODE" --gas auto --gas-adjustment 1.2 --fees 300000000000000inj -y --output json)
echo $RES
if [ "$(echo $RES | jq -r .raw_log)" != "[]" ]; then
	# exit
	echo "ERROR = $(echo $RES | jq .raw_log)"
	exit 1
else
	echo "$ACCOUNT DEPOSIT SUCCESSFULLY"
fi

TXHASH=$(echo $RES | jq -r .txhash)
echo "TX_HASH = $TXHASH"

# sleep for chain to update
sleep "$SLEEP_TIME"

RAW_LOG=$(injectived query tx "$TXHASH" --chain-id "$CHAINID" --node "$NODE" --output json | jq -r .raw_log)

echo "RAW_LOG = $RAW_LOG"
#!/bin/bash

NODE="https://testnet.sentry.tm.injective.network:443"
CONTRACT="$1" # inj16ckgjaln883kpwkm0ddgqtdhg8u0ycpl2gucl3
ACCOUNT="$2" # inj1ecmnm5vj0j2rkwkf4v4p9ay3etlg82x3dwuzsq

GET_BALANCE_OF="{\"current_staked_balance\": {\"address\": \"$ACCOUNT\"}}"
RES=$(injectived query wasm contract-state smart "$CONTRACT" "$GET_BALANCE_OF" --node "$NODE" --output json)

echo $RES
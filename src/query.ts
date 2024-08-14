import { config } from "dotenv";
import {
  ChainGrpcBankApi,
  IndexerGrpcAccountPortfolioApi,
} from "@injectivelabs/sdk-ts";
import { getNetworkEndpoints, Network } from "@injectivelabs/networks";

config();

/** Querying Example */
(async () => {
  const endpoints = getNetworkEndpoints(Network.Testnet);
  const chainGrpcBankApi = new ChainGrpcBankApi(endpoints.grpc);
  const indexerGrpcAccountPortfolioApi = new IndexerGrpcAccountPortfolioApi(
    endpoints.indexer
  );

  const injectiveAddress = "inj1z6sccypszye9qke2w35m3ptmj7c4tjr2amedyf";
  const bankBalances = await chainGrpcBankApi.fetchBalances(injectiveAddress);

  console.log(bankBalances);

  const portfolio =
    await indexerGrpcAccountPortfolioApi.fetchAccountPortfolioBalances(
      injectiveAddress
    );

  console.log(portfolio);
})();

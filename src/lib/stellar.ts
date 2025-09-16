import { Server, Networks, TransactionBuilder, Operation, Asset } from 'stellar-sdk';

const HORIZON = 'https://horizon-testnet.stellar.org';
const NETWORK = Networks.TESTNET;
export const server = new Server(HORIZON);

export async function getBalances(publicKey: string) {
  const account = await server.loadAccount(publicKey);
  return account.balances.map(b => ({
    asset: b.asset_type === 'native' ? 'XLM' : `${b.asset_code}:${b.asset_issuer}`,
    balance: b.balance,
  }));
}



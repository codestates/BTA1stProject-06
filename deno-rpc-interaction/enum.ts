export const enum RPC_ENDPOINT {
  ROCOCO = "wss://rococo-contracts-rpc.polkadot.io:443",
  SHIBUYA = "wss://shibuya-rpc.dwellir.com:443",
  ASTAR = "wss://astar-rpc.dwellir.com:443",
}

export const enum SS58_FORMAT {
  POLKADOT = 0,
  KUSAMA = 2,
  ASTAR = 5,
  DEFAULT = 42,
}

export const enum DECIMAL_PLACE_FROM_PLANCK {
  POLKADOT = 10,
  ROCOCO = 12,
  SHIBUYA = 18,
}

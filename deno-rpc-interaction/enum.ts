export const enum RPC_ENDPOINT {
  POLKADOT = "wss://rpc.polkadot.io:443",
  KUSAMA = "wss://kusama-rpc.polkadot.io:443",
  ASTAR = "wss://astar-rpc.dwellir.com:443",
  SHIDEN = "wss://shiden-rpc.dwellir.com:443",
  ACALA = "wss://acala-rpc.dwellir.com",
  PARALLEL = "wss://parallel.api.onfinality.io/public-ws:443",
  INTERLAY = "wss://interlay.api.onfinality.io/public-ws:443",
  ROCOCO = "wss://rococo-rpc.polkadot.io:443",
  SHIBUYA = "wss://shibuya-rpc.dwellir.com:443",
}

export const enum SS58_FORMAT {
  POLKADOT = 0,
  KUSAMA = 2,
  ASTAR_FAMILY = 5,
  DEFAULT = 42,
}

export const enum DECIMAL_PLACE_FROM_PLANCK {
  POLKADOT = 10,
  ROCOCO = 12,
  SHIBUYA = 18,
}

export const enum EXPLORER_LINK {
  POLKADOT = "https://polkadot.subscan.io/extrinsic/",
  KUSAMA = "https://kusama.subscan.io/extrinsic/",
  ASTAR = "https://astar.subscan.io/extrinsic/",
  SHIDEN = "https://shiden.subscan.io/extrinsic/",
  PARALLEL = "https://parallel.subscan.io/extrinsic/",
  INTERLAY = "https://interlay.subscan.io/extrinsic/",
  ROCOCO = "https://rococo.subscan.io/extrinsic/",
  SHIBUYA = "https://shibuya.subscan.io/extrinsic/",
}

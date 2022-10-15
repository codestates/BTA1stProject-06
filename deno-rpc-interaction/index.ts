import { Keyring } from "https://deno.land/x/polkadot@0.0.9/keyring/mod.ts";
import {
  ApiPromise,
  WsProvider,
} from "https://deno.land/x/polkadot@0.0.9/api/mod.ts";
import { KeyringPair } from "https://deno.land/x/polkadot@0.0.9/keyring/types.ts";
import { RPC_ENDPOINT, SS58_FORMAT } from "./enum.ts";
import { SubmittableExtrinsic } from "https://deno.land/x/polkadot@0.0.9/api/submittable/types.ts";
import { CodeSubmittableResult } from "https://deno.land/x/polkadot@0.0.9/api-contract/base/Code.ts";
import { BlueprintSubmittableResult } from "https://deno.land/x/polkadot@0.0.9/api-contract/base/Blueprint.ts";
import { ApiTypes } from "https://deno.land/x/polkadot@0.0.9/api-base/types/index.ts";
import type { } from "https://deno.land/x/polkadot@0.0.9/api-augment/mod.ts";
import type { AnyJson } from "https://deno.land/x/polkadot@0.0.9/types-codec/types/index.ts";
import { mnemonicGenerate } from "https://deno.land/x/polkadot@0.2.10/util-crypto/mod.ts";
import { cryptoWaitReady } from "https://deno.land/x/polkadot@0.0.9/util-crypto/crypto.ts";

export const createPairFromSeed = (mnemonic: string): KeyringPair => {
  const seed: string = mnemonic;
  const keyring: Keyring = new Keyring({ type: "sr25519" });
  const pair: KeyringPair = keyring.createFromUri(seed);
  return pair;
};

export const getPairFromSeed = (mnemonic: string): KeyringPair => {
  const seed: string = mnemonic;
  const keyring: Keyring = new Keyring({ type: "sr25519" });
  const pair: KeyringPair = keyring.addFromUri(seed);
  return pair;
};

export const getPairFromSeedWithSS58 = (
  mnemonic: string,
  format: SS58_FORMAT,
): KeyringPair => {
  const seed: string = mnemonic;
  const keyring: Keyring = new Keyring({ type: "sr25519" });
  keyring.setSS58Format(format);
  const pair: KeyringPair = keyring.addFromUri(seed);
  return pair;
};

export const getFreeBalance = async (
  fullNodeUri: string,
  address: string,
): Promise<bigint> => {
  const provider: WsProvider = new WsProvider(fullNodeUri);
  const api: ApiPromise = await ApiPromise.create({ provider });
  const { data: balance } = await api.query.system.account(address);
  const freeBalance = BigInt(balance?.free.toHuman().replace(/\,/g, ""));
  // 1 ROC = 1,000,000,000,000,000, 1 ASTR = 1,000,000,000,000,000,000
  return freeBalance;
};

export const transferNativeToken = async (
  fullNodeUri: string,
  mnemonic: string,
  to: string,
  amountInUnits: bigint,
): Promise<string> => {
  const provider = new WsProvider(fullNodeUri);
  const api: ApiPromise = await ApiPromise.create({ provider });
  const pair: KeyringPair = getPairFromSeed(mnemonic);
  const transfer = api.tx.balances.transfer(to, amountInUnits);
  const hash = await transfer.signAndSend(pair);
  return hash.toHex();
};

const toAccountId32 = (addressRaw: Uint8Array): string => {
  return '0x' + [...addressRaw].map(x => x.toString(16).padStart(2, '0')).join('');
}

//ROCOCO_CONTRACTS -> ROCOCO
export const teleportAssetsFromContractsToROC = async (
  fullNodeUri: string,
  mnemonic: string,
  to: string,
  amountInUnits: bigint,
): Promise<string> => {
  const provider = new WsProvider(fullNodeUri);
  const api: ApiPromise = await ApiPromise.create({ provider });
  const pair: KeyringPair = getPairFromSeed(mnemonic);
  const dest = api.createType('XcmVersionedMultiLocation', {
      V1: {
          parents: 1,
          interior: "Here"
      }
  });
  const beneficiary = api.createType('XcmVersionedMultiLocation', {
      V1: {
          parents: 0,
          interior: {
              X1: {
                  AccountId32: {
                      network: "Any",
                      id: toAccountId32(decodeAddress(to)) // "0x8a47e485e1a76a680537c2c871ff6e5775b5ed80d4bf26b46f6a5196e71de87a"// to (hex)
                  }
              }
          }
      }
  });
  const assets = api.createType('XcmVersionedMultiAssets', {
      V1: [
          {
              id: {
                  Concrete: {
                      parents: 1,
                      interior: "Here"
                  }
              },
              fun: {
                  Fungible: amountInUnits
              }
          }
      ]
  });
  const feeAssetItem = 0;
  const weightLimit = api.createType('XcmV2WeightLimit', "Unlimited");
  const xcm = api.tx.polkadotXcm.limitedTeleportAssets(
      dest, beneficiary, assets, feeAssetItem, weightLimit
  );
  const txHash = await xcm.signAndSend(pair);
  return txHash.toHex();
};


//ROCOCO -> ROCOCO_CONTRACTS
export const teleportAssetsFromROCToContracts = async (
  fullNodeUri: string,
  mnemonic: string,
  to: string,
  amountInUnits: bigint,
): Promise<string> => {
  const provider = new WsProvider(fullNodeUri);
  const api: ApiPromise = await ApiPromise.create({ provider });
  const pair: KeyringPair = getPairFromSeed(mnemonic);
  const dest = api.createType('XcmVersionedMultiLocation', {
      V1: {
        parents: 0,
        interior: {
          X1: {
            Parachain: 1002
          }
        }
      }
    });
  const beneficiary = api.createType('XcmVersionedMultiLocation', {
      V1: {
        parents: 0,
        interior: {
          X1: {
            AccountId32: {
              network: "Any",
              id: toAccountId32(decodeAddress(to))
            }
          }
        }
      }
    });
  const assets = api.createType('XcmVersionedMultiAssets', {
      V1: [
        {
          id: {
            Concrete: {
              parents: 0,
              interior: "Here"
            }
          },
          fun: {
            Fungible: amountInUnits
          }
        }
      ]
    });
  const feeAssetItem = 0;
  const weightLimit = api.createType('XcmV2WeightLimit', "Unlimited");
  const xcm = api.tx.xcmPallet.limitedTeleportAssets(
      dest, beneficiary, assets, feeAssetItem, weightLimit
  );
  const txHash = await xcm.signAndSend(pair);
  return txHash.toHex();
}


const xcmTest = async() => {
  await cryptoWaitReady();
  const mnemonic = "cross gasp merry crush unhappy odor tape orbit coin raven bitter old";
  // console.log(txHash);
  const pair = getPairFromSeed(mnemonic);
  console.log(encodeAddress(decodeAddress(pair.address)));
  // console.log(pair.address);
  const txHashToROC = await teleportAssetsFromContractsToROC(RPC_ENDPOINT.ROCOCO_CONTRACTS, "ice twist upper property roast flavor step plate cycle flower object sausage", pair.address, 10000000000n);
  console.log(txHashToROC);
  const txHashToContracts = await teleportAssetsFromROCToContracts(RPC_ENDPOINT.ROCOCO, "ice twist upper property roast flavor step plate cycle flower object sausage", pair.address, 10000000000n);
  console.log(txHashToContracts);
}

xcmTest();

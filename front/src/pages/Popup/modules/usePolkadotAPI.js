import { ApiPromise, WsProvider } from '@polkadot/api';
import { Keyring } from '@polkadot/keyring';
import { mnemonicGenerate, cryptoWaitReady, decodeAddress } from '@polkadot/util-crypto';

export const RpcEndpoint = Object.freeze({
    POLKADOT: "wss://rpc.polkadot.io:443",
    KUSAMA: "wss://kusama-rpc.polkadot.io:443",
    ASTAR: "wss://astar-rpc.dwellir.com:443",
    ACALA: "wss://acala-rpc.dwellir.com",
    ROCOCO: "wss://rococo-rpc.polkadot.io:443",
    ROCOCO_CONTRACTS: "wss://rococo-contracts-rpc.polkadot.io:443",
})

export const SS58Format = Object.freeze({
    POLKADOT: 0,
    KUSAMA: 2,
    ASTAR: 5,
    ACALA: 10,
    ROCOCO: 42,
    ROCOCO_CONTRACTS: 42,
    DEFAULT: 42, //ROCOCO, ROCOCO_CONTRACTS
})

export const DecimalPaceFromPlanck = Object.freeze({
    POLKADOT: 10,
    KUSAMA: 12,
    ASTAR: 18,
    ACALA: 12,
    ROCOCO: 12,
    ROCOCO_CONTRACTS: 12,
})

export const ExplorerLink = Object.freeze({
    POLKADOT: "https://polkadot.subscan.io/extrinsic/",
    KUSAMA: "https://kusama.subscan.io/extrinsic/",
    ASTAR: "https://astar.subscan.io/extrinsic/",
    ACALA: "https://acala.subscan.io/extrinsic/",
    ROCOCO: "https://rococo.subscan.io/extrinsic/",
    ROCOCO_CONTRACTS: "https://rococo-contracts.subscan.io/extrinsic/",
})

export const createMnemonic = () => {
    return mnemonicGenerate();
}

export const createPairFromSeed = (mnemonic) => {
    const seed = mnemonic;
    const keyring = new Keyring({ type: "sr25519", ss58Format: SS58Format.DEFAULT });
    const pair = keyring.createFromUri(seed);
    return pair;
};

export const getPairFromSeed = (mnemonic) => {
    const seed = mnemonic;
    const keyring = new Keyring({ type: "sr25519", ss58Format: SS58Format.DEFAULT });
    const pair = keyring.addFromUri(seed);
    return pair;
};

export const getPairFromSeedWithSS58 = (
    mnemonic,
    ss58Format,
) => {
    const seed = mnemonic;
    const keyring = new Keyring({ type: "sr25519", ss58Format });
    const pair = keyring.addFromUri(seed);
    return pair;
};

export const getFreeBalance = async (
    fullNodeUri,
    address,
) => {
    const provider = new WsProvider(fullNodeUri);
    const api = await ApiPromise.create({ provider });
    const { data: balance } = await api.query.system.account(address);
    const freeBalance = BigInt(balance?.free.toHuman().replace(/\,/g, ""));
    return freeBalance;
};

export const transferNativeToken = async (
    fullNodeUri,
    pair,
    to,
    amountInUnits,//bigint
) => {
    const provider = new WsProvider(fullNodeUri);
    const api = await ApiPromise.create({ provider });
    const transfer = api.tx.balances.transfer(to, amountInUnits);
    const hash = await transfer.signAndSend(pair);
    return hash.toHex();
};

const toAccountId32 = (addressRaw) => {
    // Uint8Array to hexadecimal 32bytes account id
    return '0x' + [...addressRaw].map(x => x.toString(16).padStart(2, '0')).join('');
}

/// ROCOCO-Contracts to ROCOCO
export const teleportAssetsFromContractsToROC = async (
    fullNodeUri,
    pair, // pair (from)
    to, //pair.address (to)
    amountInUnits, //bigint
) => {
    const provider = new WsProvider(fullNodeUri);
    const api = await ApiPromise.create({ provider });
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

/// ROCOCO to ROCOCO_CONTRACTS
export const teleportAssetsFromROCToContracts = async (
    fullNodeUri,
    pair, // pair(from)
    to, // pair.address(to)
    amountInUnits, // bigint
) => {
    const provider = new WsProvider(fullNodeUri);
    const api = await ApiPromise.create({ provider });
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

/// tests
const keyPairTest = async () => {
    console.log('keypair test start');
    const mnemonic = mnemonicGenerate();
    console.log("mnemonic: ", mnemonic);
    const pair = createPairFromSeed(mnemonic);
    const pair2 = getPairFromSeed(mnemonic);
    console.log(pair.address);
    console.log(pair2.address);
    console.log('keypair test finished');
};

const balanceTest = async () => {
    console.log('balance test start');
    const uri = mnemonicGenerate();
    const uri2 = mnemonicGenerate();
    const pair = getPairFromSeedWithSS58(uri, SS58Format.ASTAR);
    const pair2 = getPairFromSeedWithSS58(uri2, SS58Format.ASTAR);
    console.log("address: ", pair.address);
    console.log("address2: ", pair2.address);
    const balance = await getFreeBalance(RpcEndpoint.ASTAR, pair.address);
    const balance2 = await getFreeBalance(RpcEndpoint.ASTAR, pair2.address);
    console.log("balance :", balance);
    console.log("balance2 :", balance2);
    console.log('balance test finished');
}

const sendTxTest = async () => {
    console.log('sendTx test start');
    const amount = 1000000000000n; // 1 DOT
    const toAddress = "받는 주소";
    const pair = getPairFromSeedWithSS58("니모닉", SS58Format.KUSAMA);
    const txHash = await transferNativeToken(RpcEndpoint.KUSAMA, pair, toAddress, amount);
    console.log(txHash);
    console.log('sendTx test finished');
}

const xcmTest = async () => {
    const pair = getPairFromSeedWithSS58("니모닉", SS58Format.ROCOCO_CONTRACTS);
    const toAddress = "5FC1pcu7fb7Rezb9z2REuhgLnXDp8gN4m7AstWAvfqzXvv9M";
    const amount = 10000000000n;
    const txHashToROC = await teleportAssetsFromContractsToROC(RpcEndpoint.ROCOCO_CONTRACTS, pair, toAddress, amount);
    console.log(txHashToROC);
    const txHashToContracts = await teleportAssetsFromROCToContracts(RpcEndpoint.ROCOCO, pair, toAddress, amount);
    console.log(txHashToContracts);
}

const initTest = async () => {
    await cryptoWaitReady();
    // await sendTxTest();
    // await xcmTest();
    // await keyPairTest();
    // await balanceTest();
};

// initTest();

import { ApiPromise, WsProvider } from '@polkadot/api';
import { Keyring } from '@polkadot/keyring';
import { cryptoWaitReady, mnemonicGenerate } from '@polkadot/util-crypto';
// import { RpcEndpoint } from '../constants';

const RpcEndpoint = Object.freeze({
    POLKADOT: "wss://rpc.polkadot.io:443",
    KUSAMA: "wss://kusama-rpc.polkadot.io:443",
    ROCOCO: "wss://rococo-rpc.polkadot.io:443",
    ASTAR: "wss://astar-rpc.dwellir.com:443",
    ACALA: "wss://acala-rpc.dwellir.com",
    SHIDEN: "wss://shiden-rpc.dwellir.com:443",
});

export const SS58Format = Object.freeze({
    POLKADOT: 0,
    KUSAMA: 2,
    ASTAR_FAMILY: 5,
    DEFAULT: 42,
})

export const DecimalPaceFromPlanck = Object.freeze({
    POLKADOT: 10,
    ROCOCO: 12,
    ASTAR: 18,
    SHIDEN: 18,
})

export const ExplorerLink = Object.freeze({
    POLKADOT: "https://polkadot.subscan.io/extrinsic/",
    KUSAMA: "https://kusama.subscan.io/extrinsic/",
    ROCOCO: "https://rococo.subscan.io/extrinsic/",
    ASTAR: "https://astar.subscan.io/extrinsic/",
    ACALA: "https://acala.subscan.io/extrinsic/",
    SHIDEN: "https://shiden.subscan.io/extrinsic/",
})

export const createMnemonic = () => {
    return mnemonicGenerate();
}

export const createPairFromSeed = (mnemonic) => {
    const seed = mnemonic;
    const keyring = new Keyring({ type: "sr25519" });
    const pair = keyring.createFromUri(seed);
    return pair;
};

export const getPairFromSeed = (mnemonic) => {
    const seed = mnemonic;
    const keyring = new Keyring({ type: "sr25519" });
    const pair = keyring.addFromUri(seed);
    return pair;
};


export const getPairFromSeedWithSS58 = (
    mnemonic,
    format,
) => {
    const seed = mnemonic;
    const keyring = new Keyring({ type: "sr25519" });
    keyring.setSS58Format(format);
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
    // 1 ROC = 1,000,000,000,000,000, 1 ASTR = 1,000,000,000,000,000,000
    return freeBalance;
};

export const transferNativeToken = async (
    fullNodeUri,
    mnemonic,
    to,
    amountInUnits,//bigint
) => {
    const provider = new WsProvider(fullNodeUri);
    const api = await ApiPromise.create({ provider });
    const pair = getPairFromSeed(mnemonic);
    const transfer = api.tx.balances.transfer(to, amountInUnits);
    const hash = await transfer.signAndSend(pair);
    return hash.toHex();
};


//test
const keyPairTest = async () => {
    console.log('keypair test start');
    await cryptoWaitReady();
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
    await cryptoWaitReady();
    const uri = mnemonicGenerate();
    const uri2 = mnemonicGenerate();
    const pair = getPairFromSeed(uri);
    const pair2 = getPairFromSeed(uri2);
    const balance = await getFreeBalance(RpcEndpoint.ASTAR, pair.address);
    const balance2 = await getFreeBalance(RpcEndpoint.ASTAR, pair2.address);
    console.log("balance :", balance);
    console.log("balance2 :", balance2);
    console.log('balance test finished');
}

const initTest = async () => {
    // await keyPairTest();
    await balanceTest();
};

initTest();

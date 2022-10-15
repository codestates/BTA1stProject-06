import { ApiPromise, WsProvider } from '@polkadot/api';
import { Keyring } from '@polkadot/keyring';
import { cryptoWaitReady, mnemonicGenerate } from '@polkadot/util-crypto';

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

export const keyPairTest = async () => {
    console.log('keypair test start');
    await cryptoWaitReady();
    const mnemonic = mnemonicGenerate();
    console.log("mnemonic: ", mnemonic);
    const pair = createPairFromSeed(mnemonic);
    const pair2 = getPairFromSeed(mnemonic);
    console.log(pair.address);
    console.log(pair2.address);
    assert(pair.address === pair2.address, "the pairs is not the same");
    console.log('keypair test start');
};

const initTest = async () => {
    await keyPairTest();
};

export const test = () => {
    alert('hi');
}

// initTest();

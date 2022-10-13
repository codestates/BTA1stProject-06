import { Keyring } from "https://deno.land/x/polkadot@0.0.9/keyring/mod.ts";
import {
    ApiPromise,
    WsProvider,
} from "https://deno.land/x/polkadot@0.0.9/api/mod.ts";
import { KeyringPair } from "https://deno.land/x/polkadot@0.0.9/keyring/types.ts";
import { RPC_ENDPOINT, SS58_FORMAT } from "./BTA1stProject-06/enum.ts";
import { SubmittableExtrinsic } from "https://deno.land/x/polkadot@0.0.9/api/submittable/types.ts";
import { CodeSubmittableResult } from "https://deno.land/x/polkadot@0.0.9/api-contract/base/Code.ts";
import { BlueprintSubmittableResult } from "https://deno.land/x/polkadot@0.0.9/api-contract/base/Blueprint.ts";
import { ApiTypes } from "https://deno.land/x/polkadot@0.0.9/api-base/types/index.ts";
import type { } from "https://deno.land/x/polkadot@0.0.9/api-augment/mod.ts";
import type { AnyJson } from "https://deno.land/x/polkadot@0.0.9/types-codec/types/index.ts";

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
    // 1 ROC = 1,000,000,000,000,000, 1 SBY = 1,000,000,000,000,000,000
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

const test = () => {
    console.log('init');
}

test();
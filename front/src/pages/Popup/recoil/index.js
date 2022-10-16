import { atom } from 'recoil';

export const pageState = atom({
    key: 'page',
    default: 'Start'
})

export const loadingState = atom({
    key: 'loading',
    default: false
})

export const encryptMnemonicState = atom({
    key: 'encrypt-mnemonic',
    default: ''
})

export const selectedPairState = atom({
    key: 'selected-pair',
    default: {}
})

export const selectedNickNameState = atom({
    key: 'selected-nickname',
    default: ''
})

export const mnemonicState = atom({
    key: 'mnemonic',
    default: ''
})

export const chainState = atom({
    key: 'chain',
    default: 'POLKADOT'
})
import { atom } from 'recoil';

export const pageState = atom({
    key: 'page',
    default: 'Start'
})

export const loadingState = atom({
    key: 'loading',
    default: false
})

export const selectedPairState = atom({
    key: 'selected-pair',
    default: {}
})

export const encryptPairState = atom({
    key: 'encrypt-pair',
    default: ''
})

export const pairsState = atom({
    key: 'pairs',
    default: []
})

export const chainState = atom({
    key: 'chain',
    default: 'POLKADOT'
})

export const mnState = atom({
    key: 'mn',
    default: ''
})
import {atom} from 'recoil';

export const pageState = atom({
    key: 'page',
    default: 'Start'
})

export const loadingState = atom({
    key: 'loading',
    default: false
})

export const encryptPairState = atom({
    key: 'encrypt-pair',
    default: ''
})

export const pairState = atom({
    key: 'pair',
    default: {}
})

export const mnState = atom({
    key: 'mn',
    default: ''
})
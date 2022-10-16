import { atom } from 'recoil';

export const pageState = atom({
    key: 'page',
    default: 'Start'
})

export const loadingState = atom({
    key: 'loading',
    default: false
})
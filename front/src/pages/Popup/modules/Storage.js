import CryptoJS from "crypto-js";

export default class Storage {
    static keyPair = 'KEYPAIR';

    static async set(key, value){
        if(typeof key !== "string" || typeof value !== "string"){
            throw 'key와 value는 문자열입니다';
        }

        let obj = {}

        obj[key] = value;
        return new Promise((resolve, reject) => {
            chrome.storage.local.set(obj, () => {
                resolve();
            })
        })
    }

    static async get(key){
        return new Promise((resolve, reject) => {
            chrome.storage.local.get((data) => {
                if(data[key] === undefined){
                    reject('없는 키값 입니다');
                    return;
                }

                resolve(data[key]);
            })
        })
    }

    static async clear(){
        await chrome.storage.local.clear();
    }

    static async setKeyPair(pair, password) {
        return await this.set(this.keyPair, CryptoJS.AES.encrypt(JSON.stringify(pair), password).toString());
    }

    static async getKeyPair(password){
        const keyPair = await this.get(this.keyPair);
        return JSON.parse(CryptoJS.AES.decrypt(keyPair, password).toString(CryptoJS.enc.Utf8));
    }
}
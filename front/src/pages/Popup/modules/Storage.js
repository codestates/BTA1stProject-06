import CryptoJS from "crypto-js";

export default class Storage {
    static encryptMnemonic = 'ENCRYPT_MNEMONIC';
    static pairList = 'PAIRLIST';

    static async set(key, value) {
        if (typeof key !== "string") {
            throw 'key는 문자열입니다';
        }

        let obj = {}

        obj[key] = value;
        return new Promise((resolve, reject) => {
            chrome.storage.local.set(obj, () => {
                resolve();
            })
        })
    }

    static async get(key, defaultValue = '') {
        return new Promise((resolve, reject) => {
            chrome.storage.local.get((data) => {
                if (data[key] === undefined) {
                    resolve(defaultValue);
                    return;
                }

                resolve(data[key]);
            })
        })
    }

    static async clear(){
        await chrome.storage.local.clear();
    }

    static async setDefaultEncryptMnemonic(encryptMnemonic) {
        await this.set(this.encryptMnemonic, encryptMnemonic);
    }
    
    static async getDefaultMnemonic(password){
        const encryptMnemonic = await this.get(this.encryptMnemonic);
        const bytes = CryptoJS.AES.decrypt(encryptMnemonic, password);
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);

        return decrypted;
    }



    
    static async addPairList(pair, nickName) {
        const pairObj = await this.getPairList();

        let obj = pairObj;

        obj[nickName] = pair;
        await this.set(this.pairList, JSON.stringify(obj));
    }
    
    static async getPairList(){
        const pairList = await this.get(this.pairList, {});

        return JSON.parse(pairList);
    }


}
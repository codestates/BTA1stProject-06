import CryptoJS from "crypto-js";

export default class Storage {
    static encryptMnemonic = 'ENCRYPT_MNEMONIC';
    static mnemonicList = 'mnmonicLIST';

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



    
    static async addMnemonicList(mnemonic, nickName, isLogin = false) {

        const mnmonicObj = await this.getMnemonicList();
        const mnemonicKeys = Object.keys(mnmonicObj);

        for(let i = 0; i < mnemonicKeys.length; i++){
            if(mnemonicKeys[i] === nickName && isLogin === false){
                throw '닉네임 중복 입니다';
            }
        }

        let obj = mnmonicObj;

        obj[nickName] = mnemonic;

        await this.set(this.mnemonicList, JSON.stringify(obj));
    }
    
    static async getMnemonicList(){
        const mnemonicList = JSON.parse(await this.get(this.mnemonicList, "{}"));
        return mnemonicList;
    }


}
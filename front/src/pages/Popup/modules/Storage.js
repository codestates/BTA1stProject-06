export default class Storage {
    static keyStore = 'KEYSTORE';

    static async set(key, value) {
        if (typeof key !== "string" || typeof value !== "string") {
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

    static async get(key) {
        return new Promise((resolve, reject) => {
            chrome.storage.local.get((data) => {
                if (data[key] === undefined) {
                    reject('없는 키값 입니다');
                    return;
                }

                resolve(data[key]);
            })
        })
    }

    static async setKeyStore(value) {
        return await this.set(this.keyStore, value);
    }

    static async getKeyStore() {
        return await this.get(this.keyStore);
    }
}
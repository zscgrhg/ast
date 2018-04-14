import {AsyncStorage} from "react-native";

let StorageHandler = {

    save(id, args) {
        alert(typeof args.value)
        AsyncStorage.setItem(args.key, args.value, e => {
            if (e) {
                this.sendError(id, e)
            } else {
                console.log('saved')
                this.sendReponse(id, JSON.stringify('saved'))
            }
        });
    },
    load(id, key) {
        AsyncStorage.getItem(key, (e, v) => {
            if (e) {
                this.sendError(id, e)
            } else {
                this.sendReponse(id, v)
            }
        });
    },
    remove(id, key) {

        AsyncStorage.removeItem(key, (e) => {
            if (e) {
                this.sendError(id, e)
            } else {
                this.sendReponse(id, JSON.stringify('ok'))
            }
        });
    },
    getAllKeys(id) {
        AsyncStorage.getAllKeys((e, kSet) => {
            if (e) {
                this.sendError(id, e)
            } else {
                console.log(kSet)
                this.sendReponse(id, JSON.stringify(kSet))
            }
        })
    },
    multiGet(id, args) {
        AsyncStorage.multiGet(args, (e, ret) => {
            if (e) {
                this.sendError(id, e)
            } else {
                console.log(ret)
                this.sendReponse(id, JSON.stringify(ret.map(v=>[v[0],JSON.parse(v[1])])))
            }
        })
    }
}
export default StorageHandler
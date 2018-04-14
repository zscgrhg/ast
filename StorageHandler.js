import {AsyncStorage} from "react-native";

let StorageHandler = {
    save(id, args) {

        AsyncStorage.setItem(args.key, args.value, e => {
            if (e) {
                this.sendError(id, e)
            } else {
                console.log(this.sendReponse)
                this.sendReponse(id, 'saved')
            }
        });
    },
    load(id, args) {

        AsyncStorage.getItem(args.key, (e, v) => {
            if (e) {
                this.sendError(id, e)
            } else {
                this.sendReponse(id, v)
            }
        });
    },
    getAllKeys(id) {
        AsyncStorage.getAllKeys((e,kSet)=>{
            if(e){
                this.sendError(id, e)
            }else{
                console.log(kSet)
                this.sendReponse(id, kSet)
            }
        })
    },
    multiGet(id, args) {
        AsyncStorage.multiGet(args,(e,ret)=>{
            if(e){
                this.sendError(id, e)
            }else{
                console.log(ret)
                this.sendReponse(id, ret)
            }
        })
    }
}
export default StorageHandler
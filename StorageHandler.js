import {AsyncStorage} from "react-native";

let StorageHandler={
    save:
        function(id, args) {

            AsyncStorage.setItem(args.key, args.value, e => {
                if (e) {
                    this.sendError(id, e)
                } else {
                    console.log(this.sendReponse)
                    this.sendReponse(id, 'saved')
                }
            });
        },
    load:
       function (id, args)  {

            AsyncStorage.getItem(args.key, (e, v) => {
                if (e) {
                    this.sendError(id, e)
                } else {
                    this.sendReponse(id, v)
                }
            });
        }
}
export default StorageHandler
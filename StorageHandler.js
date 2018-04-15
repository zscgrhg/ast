import StringifyStorage from "./StringifyStorage";

function currying() {
    var args = Array.prototype.slice.call(arguments);
    var func = args.shift();
    return function () {
        var argsAppend = Array.prototype.slice.call(arguments);
        return func.apply(null, args.concat(argsAppend));
    }
}

let StorageHandler = {

    save(id, args) {
        StringifyStorage.save(args.key, args.value, currying(this.sendReponse, id), currying(this.sendError, id));
    },
    load(id, key) {
        StringifyStorage.load(key, currying(this.sendReponse, id), currying(this.sendError, id))
    },
    remove(id, key) {
        StringifyStorage.remove(key, currying(this.sendReponse, id), currying(this.sendError, id))
    },
    getAllKeys(id) {
        StringifyStorage.getAllKeys(currying(this.sendReponse, id), currying(this.sendError, id))
    },
    multiGet(id, args) {
        StringifyStorage.multiGet(args, currying(this.sendReponse, id), currying(this.sendError, id))
    }
}
export default StorageHandler
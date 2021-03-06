import {AsyncStorage} from "react-native";

function noop() {

}

function encode(obj) {
    let wapper = {
        type: 'stringify_storage',
        value: obj
    }
    return JSON.stringify(wapper)
}

function decode(str) {
    if (typeof str === 'string') {
        try {
            let parse = JSON.parse(str);
            if (parse.type === 'stringify_storage') {
                return parse.value
            }
        } catch (e) {

        }
    }
    return str
}

let StringifyStorage = {

    save(key, value, onSuccess, onError) {
        let strValue = encode(value)
        AsyncStorage.setItem(key, strValue, e => {
            if (e) {
                (onError || noop)(e)
            } else {
                (onSuccess || noop)('ok')
            }
        });
    },
    load(key, onSuccess, onError) {
        AsyncStorage.getItem(key, (e, v) => {
            if (e) {
                (onError || noop)(e)
            } else {
                if (onSuccess) {
                    onSuccess(decode(v))
                }
            }
        });
    },
    remove(key, onSuccess, onError) {

        AsyncStorage.removeItem(key, (e) => {
            if (e) {
                (onError || noop)(e)
            } else {
                (onSuccess || noop)('ok')
            }
        });
    },
    multiSet: function (keyValuePairs, onSuccess, onError) {
        AsyncStorage.multiSet(keyValuePairs, e => {
            if (e && e.length > 0) {
                (onError || noop)(e)
            } else {
                (onSuccess || noop)('ok')
            }
        })
    },
    multiGet(keys, onSuccess, onError) {
        AsyncStorage.multiGet(keys, (e, ret) => {
            if (e && e.length > 0) {
                (onError || noop)(e)
            } else {
                if (onSuccess) {
                    onSuccess(ret.map(v => [v[0], decode(v[1])]))
                }
            }
        })
    },
    multiRemove: function (keys, onSuccess, onError) {
        AsyncStorage.multiRemove(keys, e => {
            if (e && e.length > 0) {
                (onError || noop)(e)
            } else {
                (onSuccess || noop)('ok')
            }
        })
    },
    getAllKeys(onSuccess, onError) {
        AsyncStorage.getAllKeys((e, keys) => {
            if (e) {
                (onError || noop)(e)
            } else {
                (onSuccess || noop)(keys)
            }
        })
    },
    clear: function (onSuccess, onError) {
        AsyncStorage.clear(e => {
            if (e) {
                (onError || noop)(e)
            } else {
                (onSuccess || noop)('ok')
            }
        });

    }
}
export default StringifyStorage
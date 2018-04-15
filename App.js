/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    WebView,
    AsyncStorage
} from 'react-native';
import StorageHandler from './StorageHandler';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
const TYPE_REQUEST = 'command'
const TYPE_RESPONSE = 'response'





export default class App extends Component<Props> {

    exec() {
        var args = Array.prototype.slice.call(arguments);
        var handler = args.shift();
        var funcName = args.shift();
        var func=handler[funcName];
        return func.apply(handler, args);
    }

    sendError=(id, err)=> {
        let payload={
            id: id,
            type: TYPE_RESPONSE,
            error: err
        }
        this.refs.webviewRef.postMessage(JSON.stringify(payload))
    }

    sendReponse=(id, data)=> {
        let payload={
            id: id,
            type: TYPE_RESPONSE,
            data: data
        }
        this.refs.webviewRef.postMessage(JSON.stringify(payload))
    }

    commandHandler={
        ...StorageHandler,
        sendError:this.sendError,
        sendReponse:this.sendReponse,
    }

    handlerMessage=(event) =>{
        var payload = JSON.parse(event.nativeEvent.data)
        this.exec(this.commandHandler,payload.command, payload.id, payload.args)
    }


    render() {

        return (
            <WebView

                ref={'webviewRef'}
                //source={require('./pages/hello.html')}
                javaScriptEnabled={true}
                source={{uri: 'http://192.168.1.3:10080/hello.html'}}
                style={styles.webView}
                onMessage={e=>this.handlerMessage(e)}

            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    webview: {
        width: '100%',
        height: '100%',
    }
});

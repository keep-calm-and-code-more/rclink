const ws = require('websocket').w3cwebsocket;

// Private property
let websocketClientCollection = new WeakMap();

// Private methods

const getGMBase = (instance, message) => {
    let websocketClient = websocketClientCollection.get(instance);
    let sendMessage = encodeURIComponent(message);
    if(websocketClient && websocketClient.readyState === websocketClient.OPEN){
        websocketClient.send(sendMessage);
        console.log(`have sent message ${decodeURIComponent(sendMessage)} to gm websocket server`);
    }
    else{
        instance.sendMessageArray.push(sendMessage); 
        websocketReconnect(instance);
    }
}

const callbacks = {
    sm3InitCB: (instance, result) => {
        console.log("in sm3InitCB received: ", result);
        let ctx = result.substring(4);
        instance.sm3Ctx = ctx; 
        let sendMessage = `910|{"method":"sm3update","arguments":"plainsm3data=${instance.sm3PlainData}|ctx=${instance.sm3Ctx}","callback":"sm3UpdateCB"}`;
        getGMBase(instance, sendMessage);
    },
    sm3UpdateCB: (instance, result) => {
        console.log("in sm3UpdateCB received: ", result);
        let sendMessage = `910|{"method":"sm3finish","arguments":"ctx=${instance.sm3Ctx}","callback":"sm3FinishCB"}`
        getGMBase(instance, sendMessage); 
    },
    sm3FinishCB: (instance, result) => {
        console.log("in sm3FinishCB received: ", result);
        let sm3HashVal = result.substring(result.lastIndexOf("=") + 1);
        instance.getGMSm3HashValCB(sm3HashVal);
    },

    getPublicKeyCerCB: (instance, result) => {
        console.log("in getPublickKeyCerCB received: ", result);
        if(result === 'failed'){
            let sendMessage = `910|{"method":"reqCert","arguments":"ID=${instance.certUserID}","callback":"reqCertCB"}`;
            getGMBase(instance, sendMessage);
        }
        else{
            let certPrefix = "-----BEGIN CERTIFICATE-----\r\n";
            let certSuffix = "\r\n-----END CERTIFICATE-----";
            result = certPrefix + result + certSuffix;
            instance.getGMCertificateCB(result);
        }
    },
    reqCertCB: (instance, result) => {
        console.log("in reqCertCB received: ", result);
        if(result === 'failed'){
            throw new Error("reqCert failed");
        }
        let sendMessage = `910|{"method":"getPublicKeyCer","arguments":"ID=${instance.certUserID}","callback":"getPublicKeyCerCB"}`;
        getGMBase(instance, sendMessage);
    },

    signMessageCB: (instance, result) => {
        console.log("in signMessageCB received: ", result);
        instance.getGMSignatureCB(result);
    }
};

const websocketClientCallback = (instance, message) => {
    let decodedMsg = decodeURIComponent(message);
    console.log(`have received messge ${decodedMsg} from gm websocket server`);
    let objStr = decodedMsg.substring(4);
    if(objStr !== ''){
        let obj = JSON.parse(objStr);
        if(obj.errMessage !== '')
            console.log("gm websocket server return error message", obj.errMessage);
        else
            callbacks[obj.callback](instance, obj.result);
    }
};


const websocketConnect = (instance) => {
    console.log('gm websocket connecting');
    let websocketClient = new ws(instance.websocketServerAddress);
    websocketClient.onopen = () => {
        instance.timer = null;
        console.log('gm websocket connected');
        if(instance.sendMessageArray.length > 0){
            for(let i in instance.sendMessageArray){
                // 目前中宇提供的websocket服务不能间隔很短发送消息(其server端的处理是同步方式的？)，否则连接会关闭
                // ，我在这里使用等一段时间再发送下一消息的方法去避免:-(
                let m = instance.sendMessageArray[i];
                setTimeout(() => {
                    websocketClient.send(m);
                    console.log(`have sent message ${decodeURIComponent(m)} to gm websocket server`);
                }, i*50);
            }
            instance.sendMessageArray = new Array();
        }
    };
    websocketClient.onerror = (evt) => {
        instance.timer = null;
        console.log(`gm websocket error: ${evt.message}`);
        websocketReconnect(instance);
    };
    websocketClient.onclose = () => console.log('gm websocket closed');
    websocketClient.onmessage = (evt) => websocketClientCallback(instance, evt.data);

    websocketClientCollection.set(instance, websocketClient);
};

const websocketReconnect = (instance) => {
    if(!(instance.timer))
        instance.timer = setTimeout(() => websocketConnect(instance), 5000);
};

class GMCryptoUtils {
    constructor(gmWebsocketServerAddress){
        this.websocketServerAddress = gmWebsocketServerAddress;

        // save sendMessage to an array as a messages queue incase of websocket connection error
        // , to ensure send each message on exact one websocket connection 
        this.sendMessageArray = new Array();
    }

    getGMHashVal(plainData, cb){
        this.getGMSm3HashValCB = cb;
        this.sm3PlainData = plainData;
        let sendMessage = `910|{"method":"sm3init","arguments":"","callback":"sm3InitCB"}`;
        getGMBase(this, sendMessage);
    }

    getGMCertificate(userID, cb){
        this.getGMCertificateCB = cb;
        this.certUserID = userID;
        let sendMessage = `910|{"method":"getPublicKeyCer","arguments":"ID=${this.certUserID}","callback":"getPublicKeyCerCB"}`;
        getGMBase(this, sendMessage);
    }

    getGMSignature(userID, plainData, cb){
        this.getGMSignatureCB = cb;
        let sendMessage = `910|{"method":"signMessage","arguments":"ID=${userID}|Data=${plainData}","callback":"signMessageCB"}`;
        getGMBase(this, sendMessage);
    }
}

module.exports.GMCryptoUtils = GMCryptoUtils;
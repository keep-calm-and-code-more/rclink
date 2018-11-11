const {EventTube} = require('./events');
let EventTubes = new WeakMap();

class GMCryptoUtils {
    constructor(gmWebsocketServerAddress){
        const cb = (message) => {
            message = decodeURIComponent(message);
            message = message.substring(4);
            message = JSON.parse(message);
            console.log("message sent back from gmWebsocket server:\n", JSON.stringify(message));
        }
        EventTubes.set(this, new EventTube(gmWebsocketServerAddress, cb));
    }

    getGMHashVal(plainData){
        EventTubes.get(this).sendMessage(`910|{"method":"sm3init","arguments":"","callback":"sm3initcb"}`, 'gmWSServer');
    }

    getGMCertificate(userID){

    }

    getGMSignature(userID, plainData){

    }
}

module.exports.GMCryptoUtils = GMCryptoUtils;
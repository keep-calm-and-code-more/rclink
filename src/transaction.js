const protobuf = require('protobufjs')
const Long = require('long')
const Crypto = require('./crypto')

class Transaction{
    constructor(consArgsObj){
        this._txType = consArgsObj.type
        this._txChaincodeID = {path: consArgsObj.path || "path", name: consArgsObj.name}
        this._txChaincodeInput = {function: consArgsObj.function, args: consArgsObj.args}
        this._txChaincodeSpec = {chaincodeID: this._txChaincodeID, ctorMsg: this._txChaincodeInput,
            timeout: consArgsObj.timeout || 1000, secureContext: consArgsObj.secureContext || "secureContext",
            code_package: consArgsObj.codePackage || Buffer.from("string"), ctype: consArgsObj.codeType || 2}
        this._txMetaData = consArgsObj.metaData 
        this._txid = null
        this._txTimestamp = this.getTimestamp(consArgsObj.timestampMillis)
        this._txConfidentialityLevel = consArgsObj.confidentialityLevel || 1
        this._txConfidentialityProtocolVersion = consArgsObj.confidentialityProtocolVersion || "confidentialityProtocolVersion-1.0"
        this._txNonce = this.getNonce(consArgsObj.nonce)
        this._txToValidators = this.getValidators(consArgsObj.toValidators)
        this._txAccountAdr = this.getAccountAddr(consArgsObj.accountAddr)
        this._txSignature = null 
    }

    async createSignedTransaction(prvKey, alg){
        let chaincodeIDStr = "path: \"" + this._txChaincodeID.path + "\"\n" + "name: \"" + this._txChaincodeID.name + "\"\n";
        let transactionJsonObj = {
            type: this._txType,
            chaincodeID: Buffer.from(chaincodeIDStr),
            payload: this._txChaincodeSpec,
            metadata: this._txMetaData,
            txid: this._txid,
            timestamp: this._txTimestamp,
            confidentialityLevel: this._txConfidentialityLevel,
            confidentialityProtocolVersion: this._txConfidentialityProtocolVersion,
            nonce: this._txNonce,
            toValidators: this._txToValidators,
            cert: this._txAccountAdr,
            signature: this._txSignature,
        }
        let root = await protobuf.load("protos/peer.proto")
        let err = root.lookupType("rep.protos.Transaction").verify(transactionJsonObj)
        if(err)
            throw err
        let transactionMsg = root.lookupType("rep.protos.Transaction")
        let msg = transactionMsg.create(transactionJsonObj) 
        // Compute txid
        let txBuffer = transactionMsg.encode(msg).finish()
        msg.txid = Crypto.GetHashVal(txBuffer, 'hex', 'sha256') 
        txBuffer = transactionMsg.encode(msg).finish()
        let signature = Crypto.Sign(prvKey, Crypto.GetHashVal(txBuffer), alg)
        msg.signature = signature
        txBuffer = transactionMsg.encode(msg).finish()
        return txBuffer
    }

    async verifySignedTransaction(txBuffer, pubKey, alg){
        let root = await protobuf.load("protos/peer.proto")
        let transactionMsg = root.lookupType("rep.protos.Transaction")
        let msg = transactionMsg.decode(txBuffer)
        msg.metadata = null
        let signature = msg.signature
        msg.signature = null
        let msgBuffer = transactionMsg.encode(msg).finish()
        let isValid = Crypto.VerifySign(pubKey, signature, Crypto.GetHashVal(msgBuffer), alg)
        return isValid
    }

    getTimestamp(millis){
        const timestampMillis = millis || Date.now()
        const timestampJsonObj = {seconds: new Long(timestampMillis / 1000), nanos: ((timestampMillis % 1000) * 1000000)}
        return timestampJsonObj;
    }

    getNonce(nonce){
        if(nonce)
            return Buffer.from(nonce)
        return Buffer.from('nonce')
    }

    getValidators(toValidators){
        if(toValidators)
            return Buffer.from(toValidators)
        return Buffer.from("toValidators")
    }
    
    getAccountAddr(accountAddr){
        if(accountAddr)
            return Buffer.from(accountAddr)
        else
            return this.calculateAddr()
    }
    
    // Todo: calculate account address from public key
    calculateAddr(){
        return Buffer.from("")
    }
}
module.exports = Transaction
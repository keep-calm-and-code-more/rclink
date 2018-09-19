const protobuf = require('protobufjs')
const Long = require('long')
const Crypto = require('./crypto')

// Implement private properties
let txMsg = new WeakMap()
let txMsgType // static private property

class Transaction{
    /**
     * 
     * @param {*} consArgsObj 
     */
    constructor(consArgsObj){
        if(!txMsgType)// 调用构造函数之前必须先完成setTxMsgType方法
            throw new Error("Can not be called before setTxMsgType function completed")
        
        // 根据参数类型构造属性txMsg
        if(Buffer.isBuffer(consArgsObj)){ // Buffer类型的已签名交易
            try{
                let msg = txMsgType.decode(consArgsObj)
                txMsg.set(this, msg)
            }
            catch(e){
                throw e
            }
        }
        else{ // 描述交易的Json Object对象
            let txType = consArgsObj.type
            let txChaincodeID = {path: consArgsObj.path, name: consArgsObj.name}
            let txChaincodeInput = {function: consArgsObj.function, args: consArgsObj.args}
            let txChaincodeSpec = {chaincodeID: txChaincodeID, ctorMsg: txChaincodeInput,
                timeout: consArgsObj.timeout || 1000, secureContext: consArgsObj.secureContext,
                code_package: consArgsObj.codePackage, ctype: consArgsObj.codeType || 2}
            let txMetaData = consArgsObj.metaData 
            let txid = ""
            let txTimestamp = this.getTimestamp(consArgsObj.timestampMillis)
            let txConfidentialityLevel = consArgsObj.confidentialityLevel || 1
            let txConfidentialityProtocolVersion = consArgsObj.confidentialityProtocolVersion
            let txNonce = this.getNonce(consArgsObj.nonce)
            let txToValidators = this.getValidators(consArgsObj.toValidators)
            let txAccountAdr = this.getAccountAddr(consArgsObj.accountAddr)
            let txSignature = null 

            let chaincodeIDStr = "path: \"" + txChaincodeID.path + "\"\n" + "name: \"" + txChaincodeID.name + "\"\n";
            let txJsonObj = {
                type: txType,
                chaincodeID: Buffer.from(chaincodeIDStr),
                payload: txChaincodeSpec,
                metadata: txMetaData,
                txid: txid,
                timestamp: txTimestamp,
                confidentialityLevel: txConfidentialityLevel,
                confidentialityProtocolVersion: txConfidentialityProtocolVersion,
                nonce: txNonce,
                toValidators: txToValidators,
                cert: txAccountAdr,
                signature: txSignature,
            }
            
            let err = txMsgType.verify(txJsonObj)
            if(err)
                throw err
            // 计算txid
            let msg = txMsgType.create(txJsonObj)
            let txBuffer = txMsgType.encode(msg).finish()
            msg.txid = Crypto.GetHashVal(txBuffer, 'sha256').toString('hex')

            txMsg.set(this, msg) 
        }
    }
    
    // 必须先调用此异步方法，才能构造Transaction实例
    /**
     * 
     */
    static async setTxMsgType(){
        if(txMsgType)
            return 
        let root = await protobuf.load("protos/peer.proto")
        txMsgType = root.lookupType("rep.protos.Transaction")
    }

    getTxMsgType(){
        return txMsgType
    }

    getTxMsg(){
        return txMsg.get(this)
    }

    /**
     * 
     * @param {*} prvKey 
     * @param {*} alg 
     */
    createSignedTransaction(prvKey, alg){
        let msg = txMsg.get(this)
        if(msg.signature.toString() !== '')
            throw new Error("The transaction has been signed already")
        
        // 签名 
        let txBuffer = txMsgType.encode(msg).finish()
        let txBufferHash = Crypto.GetHashVal(txBuffer)
        let signature = Crypto.Sign(prvKey, txBufferHash, alg)
        msg.signature = signature
        //txMsg.set(this, msg)
        txBuffer = txMsgType.encode(msg).finish()
        return txBuffer
    }

    /**
     * 
     * @param {*} pubKey 
     * @param {*} alg 
     */
    verifySignedTransaction(pubKey, alg){
        // 深拷贝
        let msg = Object.assign({}, txMsg.get(this))
        msg.metadata = null
        let signature = msg.signature
        if(signature.toString() === '')
            throw new Error("The transaction has not been signed yet")
        msg.signature = null
        let msgBuffer = txMsgType.encode(msg).finish()
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
    /**
     * 
     */
    calculateAddr(){
        return Buffer.from("")
    }
}
module.exports = Transaction
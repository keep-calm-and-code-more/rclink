const protobuf = require("protobufjs");
const Long = require("long");
const Crypto = require("./crypto");

// Implement private properties
const txMsgCollection = new WeakMap();
let txMsgType; // static private property

const getTimestamp = (millis) => {
    const timestampMillis = millis || Date.now();
    const timestampJsonObj = {
        seconds: new Long(timestampMillis / 1000),
        nanos: ((timestampMillis % 1000) * 1000000),
    };
    return timestampJsonObj;
};

const getNonce = (nonce) => {
    if (nonce) { return Buffer.from(nonce); }
    return Buffer.from("nonce");
};
const getValidators = (toValidators) => {
    if (toValidators) { return Buffer.from(toValidators); }
    return Buffer.from("toValidators");
};

const getAccountAddr = pubKeyPEM => Crypto.CalculateAddr(pubKeyPEM);

class Transaction {
    /**
     *
     * @param {Object | Buffer} consArgs 交易对象构造参数，可为Json Object或Buffer
     * 当使用Json Object时，consArgs应具有以下属性：
     * - type, {Number}, 需与RepChain的交易类型定义一致，1表示CHAINCODE_DEPLOY，2表示CHAINCODE_INVOKE
     * - pubKeyPEM, {String} 交易发起者的PEM格式公钥信息，或符合X.509标准的pem格式证书信息
     * - name, {String}, 交易调用的合约名字即合约ID
     * - function, {String}, 交易调用的合约方法名
     * - args, {Array[String]}, 传递给交易所调用合约方法的参数
     */
    constructor(consArgs) {
        if (!txMsgType) { // 调用构造函数之前必须先完成setTxMsgType方法
            throw new Error("Can not be called before setTxMsgType function completed");
        }

        // 根据参数类型构造属性txMsg
        if (Buffer.isBuffer(consArgs)) { // 已签名的序列化交易数据
            try {
                const msg = txMsgType.decode(consArgs);
                txMsgCollection.set(this, msg);
            } catch (e) {
                throw e;
            }
        } else if (consArgs.constructor.name === "Object") { // 描述交易的Json Object对象
            const txType = consArgs.type;
            const txChaincodeID = { path: consArgs.path, name: consArgs.name };
            const txChaincodeInput = { function: consArgs.function, args: consArgs.args };
            const txChaincodeSpec = {
                chaincodeID: txChaincodeID,
                ctorMsg: txChaincodeInput,
                timeout: consArgs.timeout || 1000,
                secureContext: consArgs.secureContext,
                code_package: consArgs.codePackage,
                ctype: consArgs.codeType || 2,
            };
            const txMetaData = consArgs.metaData;
            const txid = "";
            const txTimestamp = getTimestamp(consArgs.timestampMillis);
            const txConfidentialityLevel = consArgs.confidentialityLevel || 1;
            const txConfidentialityProtocolVersion = consArgs.confidentialityProtocolVersion;
            const txNonce = getNonce(consArgs.nonce);
            const txToValidators = getValidators(consArgs.toValidators);
            const txAccountAdr = getAccountAddr(consArgs.pubKeyPEM);
            const txSignature = null;

            const chaincodeIDStr = `path: "${txChaincodeID.path}"\nname: "${txChaincodeID.name}"\n`;
            const txJsonObj = {
                type: txType,
                chaincodeID: Buffer.from(chaincodeIDStr),
                payload: txChaincodeSpec,
                metadata: txMetaData,
                txid,
                timestamp: txTimestamp,
                confidentialityLevel: txConfidentialityLevel,
                confidentialityProtocolVersion: txConfidentialityProtocolVersion,
                nonce: txNonce,
                toValidators: txToValidators,
                cert: txAccountAdr,
                signature: txSignature,
            };

            const err = txMsgType.verify(txJsonObj);
            if (err) { throw err; }

            // 计算txid
            const msg = txMsgType.create(txJsonObj);
            // 在Browser环境下protobufjs中的encode().finish()返回原始的Uint8Array，
            // 为了屏蔽其与Buffer经browserify或webpack转译后的Uint8Array的差异，这里需转为Buffer
            const txBuffer = Buffer.from(txMsgType.encode(msg).finish());
            msg.txid = Crypto.GetHashVal(txBuffer, "sha256").toString("hex");

            this.pubKeyPEM = consArgs.pubKeyPEM;

            txMsgCollection.set(this, msg);
        } else {
            throw new TypeError("Bad consArgs type to construct an instance of Transaction, need Object or Buffer");
        }
    }

    // 必须先调用此异步方法，才能构造Transaction实例
    /**
     * 复用txMsgType实例
     */
    static async setTxMsgType() {
        if (txMsgType) { return; }
        const root = await protobuf.load("protos/peer.proto");
        txMsgType = root.lookupType("rep.protos.Transaction");
    }

    static getTxMsgType() {
        return txMsgType;
    }

    getTxMsg() {
        return txMsgCollection.get(this);
    }

    /**
     * 对新创建的交易实例进行签名
     * @param {String | Object} prvKey 支持使用pem格式的私钥或jsrsasign提供的prvkeyObj对象
     * @param {String} alg 使用的签名算法名称
     * @param {String} pass 私钥解密密码，如果prvKey为已加密的pem格式私钥，则需要提供此解密密码
     * @returns {Buffer} txBuffer 已签名交易
     */
    createSignedTransaction(prvKey, alg, pass) {
        const msg = txMsgCollection.get(this);
        if (msg.signature.toString() !== "") { throw new Error("The transaction has been signed already"); }

        // 签名
        let txBuffer = Buffer.from(txMsgType.encode(msg).finish());
        const txBufferHash = Crypto.GetHashVal(txBuffer);
        let prvK = prvKey;
        if (typeof prvK === "string") {
            prvK = Crypto.ImportKey(prvK, pass);
            if (prvK.pubKeyHex === undefined) {
                // 当使用从pem格式转object格式的私钥签名时，若其pubKeyHex为undefined则需在该object中补充pubKeyHex
                prvK.pubKeyHex = Crypto.ImportKey(this.pubKeyPEM).pubKeyHex;
            }
        }
        const signature = Crypto.Sign(prvK, txBufferHash, alg);
        msg.signature = signature;
        txBuffer = Buffer.from(txMsgType.encode(msg).finish());
        return txBuffer;
    }

    /**
     * 对已签名的交易对象进行验签
     * @param {String | Object} pubKey pem格式的公钥或者jsrsasign提供的pubKeyObj对象
     * @param {String} alg 使用的签名算法
     */
    verifySignedTransaction(pubKey, alg) {
        // 深拷贝（相对于"=")
        // 实际上使用Object.assign()只能保证第一级属性的深拷贝
        // 是满足这里的需求的
        const msg = Object.assign({}, txMsgCollection.get(this));
        // 使用JSON.parse与JSON.stringify不能复制function等非object的属性
        // let msg = JSON.parse(JSON.stringify(txMsgCollection.get(this)))
        msg.metadata = null;
        const { signature } = msg;
        if (signature.toString() === "") { throw new Error("The transaction has not been signed yet"); }
        msg.signature = null;
        const msgBuffer = Buffer.from(txMsgType.encode(msg).finish());
        const isValid = Crypto.VerifySign(pubKey, signature, Crypto.GetHashVal(msgBuffer), alg);
        return isValid;
    }
}

module.exports.Transaction = Transaction;

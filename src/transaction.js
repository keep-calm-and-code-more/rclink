import Long from "long";
import _ from "lodash";
import { rep } from "../protos/peer"; // use generated static js code
import {
    GetHashVal, ImportKey, Sign, VerifySign, GetKeyPEM, 
} from "./crypto";

const txEnumTypes = ["CHAINCODE_DEPLOY", "CHAINCODE_INVOKE", "CHAINCODE_SET_STATE"];
const chaincodeLanguageEnumTypes = ["CODE_SCALA", "CODE_JAVASCRIPT"];

// Private properties
const txMsgCollection = new WeakMap();
const txMsgType = rep.protos.Transaction;
const signatureMsgType = rep.protos.Signature;
// Private methods
const getTimestamp = (millis) => {
    const timestampMillis = millis || Date.now();
    const timestampJsonObj = {
        seconds: new Long(timestampMillis / 1000),
        nanos: ((timestampMillis % 1000) * 1000000),
    };
    return timestampJsonObj;
};

class Transaction {
    /**
     * 构建RepChain交易对象
     * @param {Object} consArgs - 交易对象实例构造参数
     * @param {Buffer|Uint8Array} [consArgs.txBytes] - 二进制交易数据，当使用该参数时，将忽略其他参数
     * @param {string} consArgs.type - 交易类型，需与RepChain的交易类型定义一致，可为CHAINCODE_DEPLOY，
     * CHAINCODE_INVOKE, CHAINCODE_SET_STATE
     * @param {string} consArgs.chaincodeName - 目标合约的名称
     * @param {number} consArgs.chaincodeVersion - 目标合约的版本号
     * @param {Object} consArgs.chaincodeDeployParams - 部署合约时(即type为CHAINCODE_DEPLOY)所需参数
     * @param {number} consArgs.chaincodeDeployParams.timeout
     * @param {string} consArgs.chaincodeDeployParams.codePackage - 待部署合约的代码内容
     * @param {string} consArgs.chaincodeDeployParams.legalProse - 待部署合约的法律文本
     * @param {string} consArgs.chaincodeDeployParams.codeLanguageType - 待部署合约代码语言类型，
     * 目前只支持CODE_SCALA和CODE_JAVASCRIPT
     * @param {Object} consArgs.chaincodeInvokeParams - 调用合约时(即type为CHAINCODE_INVOKE)所需参数
     * @param {string} consArgs.chaincodeInvokeParams.chaincodeFunction - 待被调用的合约方法名
     * @param {Array.<string>} consArgs.chaincodeInvokeParams.chaincodeFunctionArgs - 给待调用的合约方法的参数
     * @param {Object} consArgs.chaincodeSetStateParams - 设置合约状态时(即type为CHAINCODE_SET_STATE)所需参数
     * @param {boolean} consArgs.chaincodeSetStateParams.state - 目标合约的新状态，当值为false时表示使该合约无效
     * @returns {Transaction} Transaction对象实例
     */
    constructor({
        txBytes, type, chaincodeName, chaincodeVersion,
        chaincodeDeployParams: { 
            timeout, codePackage, legalProse, codeLanguageType,
        } = {},
        chaincodeInvokeParams: { chaincodeFunction, chaincodeFunctionArgs } = {},
        chaincodeSetStateParams: { state } = {},
    }) {
        if (txBytes) { // 此时直接使用该参数构造交易对象
            if (Buffer.isBuffer(txBytes) || txBytes.constructor.name === "Uint8Array") {
                try {
                    const msg = txMsgType.decode(txBytes);
                    txMsgCollection.set(this, msg);
                } catch (e) {
                    throw e;
                }
            } else {
                throw new TypeError("The txBytes field should be a Buffer or Uint8array");
            } 
        } else { 
            if (_.indexOf(txEnumTypes, type) === -1) {
                throw new Error(`The type field should be one of ${txEnumTypes}`);
            }
            if (!_.isString(chaincodeName)) {
                throw new TypeError("The chaincodeID field should be a string");
            }
            if (!_.isInteger(chaincodeVersion)) {
                throw new TypeError("The chaincodeversion field should be an integer");
            }
            const txJsonObj = {
                id: "",
                cid: {
                    chaincodeName,
                    version: chaincodeVersion,
                },
            };
            switch (type) {
                case "CHAINCODE_DEPLOY": {
                    if (!_.isInteger(timeout)) {
                        throw new TypeError("The timeout field should be an integer");
                    }
                    if (!_.isString(codePackage)) {
                        throw new TypeError("The codePackage field should be a string");
                    }
                    if (!_.isString(legalProse)) {
                        throw new TypeError("The legalProse field should be a string");
                    }
                    if (_.indexOf(chaincodeLanguageEnumTypes, codeLanguageType) === -1) {
                        throw new Error(`The codeLanguageType field should be one of ${chaincodeLanguageEnumTypes}`);
                    }
                    txJsonObj.type = 1;
                    txJsonObj.spec = {
                        timeout,
                        codePackage,
                        legalProse,
                    };
                    switch (codeLanguageType) {
                        case "CODE_JAVASCRIPT":
                            txJsonObj.spec.ctype = 1;
                            break;
                        case "CODE_SCALA":
                            txJsonObj.spec.ctype = 2;
                            break;
                        default:
                            break;
                    }
                    break;
                }
                case "CHAINCODE_INVOKE": {
                    if (!_.isString(chaincodeFunction)) {
                        throw new TypeError("The chaincodeFunction field should be a string");
                    }
                    if (!_.isArray(chaincodeFunctionArgs)) {
                        throw new TypeError("The chaincodeFunctionArgs field should be an Array<string>");
                    }
                    for (let i = 0; i < chaincodeFunctionArgs.length; i++) {
                        if (!_.isString(chaincodeFunctionArgs[i])) {
                            throw new TypeError("The chaincodeFunctionArgs field should be an Array<string>");
                        }
                    }
                    txJsonObj.type = 2;
                    txJsonObj.ipt = {
                        function: chaincodeFunction,
                        args: chaincodeFunctionArgs,
                    };
                    break;
                }
                case "CHAINCODE_SET_STATE": {
                    if (!_.isBoolean(state)) {
                        throw new TypeError("The state field should be a Boolean");
                    }
                    txJsonObj.type = 3;
                    txJsonObj.state = state;
                    break;
                }
                default:
                    throw new Error("Wrong Transaction type");
            }
            
            const err = txMsgType.verify(txJsonObj);
            if (err) throw err;

            // 计算txid
            const msg = txMsgType.create(txJsonObj);
            // 在Browser环境下protobufjs中的encode().finish()返回原始的Uint8Array，
            // 为了屏蔽其与Buffer经browserify或webpack转译后的Uint8Array的差异，这里需转为Buffer
            const txBuffer = Buffer.from(txMsgType.encode(msg).finish());
            const timeStampBuffer = Buffer.from(new Date().toISOString());
            const dataBuffer = Buffer.concat([txBuffer, timeStampBuffer], 
                txBuffer.length + timeStampBuffer.length);
            msg.id = GetHashVal({ data: dataBuffer, alg: "sha256" }).toString("hex");

            txMsgCollection.set(this, msg);
        } 
    }

    getTxMsg() {
        return txMsgCollection.get(this);
    }

    /**
     * 对新创建的交易实例进行签名
     * @param {Object} signArgs - 签名所需参数
     * @param {string} signArgs.prvKey - 签名者的pem格式私钥
     * @param {string} signArgs.pubKey - 签名者的pem格式公钥
     * @param {string} signArgs.alg - 使用的签名算法名称
     * @param {string} [signArgs.pass] - 私钥解密密码，如果prvKey为已加密的pem格式私钥，则需要提供此解密密码
     * @param {string} signArgs.creditCode - 签名者的信用代码
     * @param {string} signArgs.certName - 代表签名者的证书名
     * @returns {Buffer} - 已签名交易数据
     */
    sign({
        prvKey, pubKey, alg, pass, creditCode, certName, 
    }) {
        if (!_.isString(prvKey)) throw new Error("The prvKey field should be a string");
        if (!_.isString(pubKey)) throw new Error("The pubKey field should be a string");
        if (!_.isString(alg)) throw new Error("The alg field should be a string");
        if (pass && !_.isString(pass)) throw new Error("The pass field should be a string");
        if (!_.isString(creditCode)) throw new Error("The creditCode field should be a string");
        if (!_.isString(certName)) throw new Error("The certName field should be a string");

        const msg = txMsgCollection.get(this);
        if (msg.signature && msg.signature.signature) { 
            throw new Error("The transaction has been signed already"); 
        }

        // 签名
        let txBuffer = Buffer.from(txMsgType.encode(msg).finish());
        const prvKeyObj = ImportKey(prvKey, pass); // 私钥解密
        if (prvKeyObj.pubKeyHex === undefined) {
            // 当使用ImportKey方法从pem格式转object格式时，若其pubKeyHex为undefined则需在该object中补充pubKeyHex
            // 否则签名将出错
            prvKeyObj.pubKeyHex = ImportKey(pubKey).pubKeyHex;
        }
        const prvkeyPEM = GetKeyPEM(prvKeyObj);
        const signature = Sign(prvkeyPEM, txBuffer, alg);
        const signatureJsonObj = {
            certId: {
                creditCode,
                certName,
            },
            tmLocal: getTimestamp(),
            signature,
        };
        const err = signatureMsgType.verify(signatureJsonObj);
        if (err) throw err;
        msg.signature = signatureMsgType.create(signatureJsonObj);
        txBuffer = Buffer.from(txMsgType.encode(msg).finish());
        return txBuffer;
    }

    /**
     * 对已签名的交易对象进行签名验证
     * @param {String} pubKey pem格式的公钥
     * @param {String} alg 使用的签名算法
     * @returns {boolean} 验签是否成功
     */
    verifySignature(pubKey, alg) {
        const msg = _.cloneDeep(txMsgCollection.get(this));
        const signature = _.cloneDeep(msg.signature);
        if (!signature || !signature.signature) {
            throw new Error("The transaction has not been signed yet");
        }
        msg.signature = null;
        const msgBuffer = Buffer.from(txMsgType.encode(msg).finish());
        const valid = VerifySign(pubKey, signature.signature, msgBuffer, alg);
        return valid;
    }
}

export default Transaction;

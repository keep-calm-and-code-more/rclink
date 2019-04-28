import crypto from "crypto";
import { KEYUTIL, KJUR, X509 } from "jsrsasign";
import moment from "moment";
import CoinString from "coinstring";
import _ from "lodash";
import GMCryptoUtils from "./gmCryptoUtils";

const gmCUs = new GMCryptoUtils("wss://localhost:9003");

/**
 * @callback gmGetHashCallback 
 * @param {string} sm3HashVal hex格式的国密算法哈希值
 */
/**
 * 根据指定的密码学哈希算法为给定数据计算哈希值
 * 
 * @param {!Object} getHashParams 计算哈希值所需参数
 * @param {Buffer | string} getHashParams.data 待对其计算哈希值的原数据
 * @param {string} [getHashParams.alg] 待使用的密码学哈希算法，默认为sha256
 * @param {string} [getHashParams.provider] 密码学哈希算法的提供者，支持nodecrypto、jsrsasign以及gm
 * <li>nodecrypto，NodeJS内建的crypto工具，默认使用该provider，支持openssl提供的hash算法，
 *   可在终端使用命令`openssl list-message-digest-algorithms`(1.0.2版)
 *   或`openssl list -digest-algorithms`(1.1.0版)查看支持的哈希算法
 * </li>
 * <li>jsrsasign，开源js加密工具(https://kjur.github.io/jsrsasign),
 *   支持的哈希算法如<a href=https://kjur.github.io/jsrsasign/api/symbols/KJUR.crypto.MessageDigest.html>
 * https://kjur.github.io/jsrsasign/api/symbols/KJUR.crypto.MessageDigest.html<a/>所示
 * </li>
 * <li>gm，国密算法加密工具，支持sm3哈希算法
 * </li>
 * @param {gmGetHashCallback} [getHashParams.cb] sm3计算服务为异步实现，当使用sm3时需提供回调方法
 * @returns {Buffer} digest 结果哈希值，若使用sm3将返回undefined
 */
const GetHashVal = ({ 
    data, alg = "sha256", provider = "nodecrypto", cb, 
}) => {
    if (!_.isBuffer(data) && !_.isString(data)) {
        throw new TypeError("The data field should be a Buffer or string");
    }
    if (!_.isString(alg)) throw new TypeError("The alg field should be a string");
    const providerEnumVals = ["nodecrypto", "jsrsasign", "gm"];
    if (_.indexOf(providerEnumVals, provider) === -1) {
        throw new RangeError(`The provider field should be one of ${providerEnumVals}`);
    }

    let hash;
    let digest;
    if (alg === "sm3" && provider !== "gm") throw new Error("当使用sm3时，必须指定provider为gm");
    if (alg !== "sm3" && provider === "gm") throw new Error("gm provider只支持sm3算法");

    switch (provider) {
        case "nodecrypto":
            // 使用NodeJS自带crypto工具计算哈希值
            // 支持的哈希算法更多
            hash = crypto.createHash(alg);
            hash.update(data);
            digest = hash.digest();
            break;
        case "jsrsasign":
            hash = new KJUR.crypto.MessageDigest({ alg, prov: "cryptojs" });
            // data = Buffer.isBuffer(data) ? data.toString() : data;
            // 兼容经browserify或webpack处理后，Buffer在Browser (Uint8Array)端的相关操作
            // data = data.constructor.name !== 'String' ? Buffer.from(data).toString() : data;
            hash.updateString(Buffer.from(data).toString());
            digest = Buffer.from(hash.digest(), "hex");
            break;
        case "gm":
            // data = Buffer.isBuffer(data) ? data.toString('hex') :
            //     Buffer.from(data).toString('hex');
            gmCUs.getGMHashVal(Buffer.from(data).toString("hex"), cb);
            break;
        default:
            throw new Error("Not supported hash algorithm provider");
    }
    return digest;
};

/**
 * 创建非对称密钥对，支持RSA与EC密钥对生成
 * 
 * @param {string} [alg] 密钥对生成算法，RSA或EC，默认使用EC
 * @param {string | number} [keyLenOrCurve] 指定密钥长度（针对RSA）或曲线名（针对EC），
 * 默认使用EC secp256k1曲线
 * @returns {Object} keypair 含有jsrsasign提供的prvKeyObj与pubKeyObj对象
 */
const CreateKeypair = (alg = "EC", keyLenOrCurve = "secp256k1") => {
    const algEnumTypes = ["EC", "RSA"];
    if (_.indexOf(algEnumTypes, alg) === -1) {
        throw new RangeError(`The alg param should be one of ${algEnumTypes}`);
    }
    if (alg === "EC" && !_.isString(keyLenOrCurve)) {
        throw new TypeError("The keyLenOrCurve param should be a string when use EC alg");
    }
    if (alg === "RSA" && !_.isInteger(keyLenOrCurve)) {
        throw new TypeError("The keyLenOrCurve param should be an integer when use RSA alg");
    }

    const keypair = KEYUTIL.generateKeypair(alg, keyLenOrCurve);
    return keypair;
};

/**
 * 导入已有非对称密钥
 * 
 * @param {string} keyPEM 使用符合PKCS#8标准的pem格式私钥信息获取私钥对象，支持导入使用PBKDF2_HmacSHA1_3DES加密的pem格式私钥信息
 * 使用符合PKCS#8标准的pem格式公钥信息或符合X.509标准的pem格式证书信息获取公钥对象
 * @param {string} [passWord] 私钥保护密码, 当导入已加密私钥时，需要提供该参数
 * @returns {Object} keyObj密钥对象，prvkeyObj或pubKeyObj
 */
const ImportKey = (keyPEM, passWord) => {
    if (!_.isString(keyPEM)) throw new TypeError("The keyPEM param should be a string");
    if (passWord && !_.isString(keyPEM)) throw new TypeError("The passWord param should be a string");

    let keyObj;
    try {
        keyObj = KEYUTIL.getKey(keyPEM, passWord);
    } catch (e) {
        if (e === "malformed plain PKCS8 private key(code:001)"
            || e.message === "Cannot read property 'sigBytes' of undefined"
            || e.message === "Cannot read property 'sigBytes' of null") {
            throw new Error("提供的私钥信息无效或解密密码无效");
        } else throw e;
    }
    return keyObj;
};

/**
 * 获得PEM格式的私钥或公钥信息
 * 
 * @param {Object} keyObj prvKeyObj或pubKeyObj
 * @param {string} [passWord] 私钥保护密码，当需要生成加密私钥信息时需提供该参数, 
 * 目前是由jsrsasign使用PBKDF2_HmacSHA1_3DES算法对私钥进行加密
 * @returns {string} keyPEM 符合PKCS#8标准的密钥信息
 */
const GetKeyPEM = (keyObj, passWord) => {
    if (passWord && !_.isString(passWord)) throw new TypeError("The passWord param should be a string");

    let keyPEM;
    const key = keyObj;
    if (key.isPrivate) {
        keyPEM = KEYUTIL.getPEM(keyObj, "PKCS8PRV", passWord);
    } else { 
        keyPEM = KEYUTIL.getPEM(keyObj); 
    }
    return keyPEM;
};

/**
 * 
 * @callback gmSignCallback
 * @param {string} signature hex格式签名信息
 */
/**
 * 根据指定私钥和签名算法，对给定数据进行签名
 * 
 * @param {Object} signParams 签名所需参数
 * @param {Object | string} signParams.prvKey 私钥信息，支持使用jsrsasign提供的私钥对象，
 * 或直接使用符合PKCS#5的未加密pem格式DSA/RSA私钥，符合PKCS#8的未加密pem格式RSA/ECDSA私钥，当使用gm签名算法时该参数应为null
 * @param {string | Buffer} signParams.data 待被签名的数据
 * @param {string} [signParams.alg] 签名算法，默认使用ecdsa-with-SHA1，国密签名算法为sm2-with-SM3
 * @param {string} [signParams.provider] 签名算法的提供者，支持使用jsrsasign或node内建的crypto(默认使用)，以及gm国密签名算法工具
 * @param {string} [signParams.gmUserID] 国密签名算法需要的用户标识，该标识是到gm websocket server查找到其对应国密私钥的唯一标识
 * @param {gmSignCallback} [signParams.cb] 国密签名算法支持为异步实现，当使用国密签名算法时，需要使用该回调方法
 * @returns {Buffer} signature 签名结果值，当使用非国密签名时，会返回该结果
 */
const Sign = ({ 
    prvKey, data, alg = "ecdsa-with-SHA1", provider = "nodecrypto", gmUserID, cb, 
}) => {
    if (!_.isBuffer(data) && !_.isString(data)) {
        throw new TypeError("The data field should be a Buffer or string");
    }
    if (!_.isString(alg)) throw new TypeError("The alg field should be a string");
    const providerEnumVals = ["nodecrypto", "jsrsasign", "gm"];
    if (_.indexOf(providerEnumVals, provider) === -1) {
        throw new RangeError(`The provider field should be one of ${providerEnumVals}`);
    }
    if (gmUserID && !_.isString(gmUserID)) throw new TypeError("The gmUserID should be a string");


    let sig;
    let signature;
    switch (provider) {
        case "nodecrypto":
            // 使用Node自带的crypto包进行签名
            // ps: 发现jsrsasign提供的签名工具包有bug:
            // 对普通数据签名时，在本地和RepChain端验签都ok,
            // 但是，当对一个哈希值进行签名时，在本地验签成功，但在RepChain端验签失败
            sig = crypto.createSign(alg);
            sig.update(data);
            signature = sig.sign((typeof prvKey === "object" ? GetKeyPEM(prvKey) : prvKey));
            break;
        case "jsrsasign":
            sig = new KJUR.crypto.Signature({ alg }); // alg = <hash>wth<crypto> like: SHA1withECDSA
            sig.init(prvKey);
            // let dataTBS = Buffer.isBuffer(data) ? data.toString() : data;
            // 兼容经browserify或webpack处理后，Buffer在Browser (Uint8Array)端的相关操作
            sig.updateString(Buffer.from(data).toString());
            signature = Buffer.from(sig.sign(), "hex");
            break;
        case "gm":
            // data = Buffer.isBuffer(data) ? data.toString('base64') :
            //     Buffer.from(data).toString('base64');
            // 兼容经browserify或webpack处理后，Buffer在Browser (Uint8Array)端的相关操作
            gmCUs.getGMSignature(gmUserID, Buffer.from(data).toString("base64"), cb);
            break;
        default:
            throw new Error("Not supported sign provider");
    }
    return signature;
};

/**
 * 验证签名
 * 
 * @param {Object} verifySignatureParams 验证签名所需参数
 * @param {Object | string} verifySignatureParams.pubKey 公钥信息，支持使用jsrsasign提供的公钥对象，
 * 或直接使用符合PKCS#8的pem格式DSA/RSA/ECDSA公钥，符合X.509的PEM格式包含公钥信息的证书
 * @param {Buffer} verifySignatureParams.sigValue 签名结果
 * @param {string | Buffer} verifySignatureParams.data 被签名的原数据
 * @param {string} [verifySignatureParams.alg] 签名算法，默认使用ecdsa-with-SHA1
 * @param {string} [verifySignatureParams.provider] 签名算法的提供者，
 * 支持使用jsrsasign或node内建的crypto(默认使用)，待支持使用国密算法提供者
 * @returns {boolean} isValid 签名真实性鉴定结果
 */
const VerifySign = ({ 
    pubKey, sigValue, data, alg = "ecdsa-with-SHA1", provider = "nodecrypto", 
}) => {
    if (!_.isBuffer(sigValue)) {
        throw new TypeError("The sigValue field should be a Buffer");
    }
    if (!_.isBuffer(data) && !_.isString(data)) {
        throw new TypeError("The data field should be a Buffer or string");
    }
    if (!_.isString(alg)) throw new TypeError("The alg field should be a string");
    const providerEnumVals = ["nodecrypto", "jsrsasign"];
    if (_.indexOf(providerEnumVals, provider) === -1) {
        throw new RangeError(`The provider field should be one of ${providerEnumVals}`);
    }

    let isValid;
    switch (provider) {
        case "nodecrypto":
            isValid = crypto.createVerify(alg)
                .update(data)
                .verify((typeof pubKey === "object") ? GetKeyPEM(pubKey) : pubKey, sigValue);
            break;
        case "jsrsasign":
            isValid = new KJUR.crypto.Signature({ alg });
            isValid.init(pubKey);
            isValid.updateString(Buffer.from(data).toString());
            isValid = isValid.verify(sigValue.toString("hex"));
            break;
        // Todo: case '国密'
        default:
            throw new Error("Not supported sign provider");
    }
    return isValid;
};


/**
 * 根据公钥信息计算其bitcoin地址
 * 
 * @param {!string} pubKeyPEM 符合PKCS#8标准的pem格式公钥信息，或符合X.509标准的公钥证书信息，目前只支持EC-secp256k1曲线
 * @returns {Buffer} bitcoin地址的Buffer数据
 */
const CalculateAddr = (pubKeyPEM) => {
    // TODO: 支持其它非对称算法公钥的地址计算

    if (!_.isString(pubKeyPEM)) throw new TypeError("The pubKeyPEM param should be a string");

    const pubKeySha256 = GetHashVal({ data: Buffer.from(ImportKey(pubKeyPEM).pubKeyHex, "hex"), alg: "sha256" });
    const pubKeyRmd160 = GetHashVal({ data: pubKeySha256, alg: "rmd160" });
    const addr = CoinString.encode(pubKeyRmd160, 0x00);
    return Buffer.from(addr);
};

/**
 * @callback gmCertificateCallback
 * @param {string} certPEM pem格式证书
 */
/**
 * 生成符合X.509标准的证书信息
 * 
 * @param {Object} certFields 证书的具体信息，
 * @param {number} certFields.serialNumber 证书序列号
 * @param {string} certFields.sigAlg 签发证书时使用的签名算法
 * @param {string} certFields.issuerDN 符合X500标准的代表证书发行方身份标识的Distinguished Name
 * @param {string} certFields.subjectDN 符合X500标准的代表证书拥有方标识的Distinguished Name
 * @param {number} certFields.notBefore 代表证书有效性起始时间的unix时间戳（秒）
 * @param {number} certFields.notAfter 代表证书有效性终止时间的unix时间戳（秒）
 * @param {Object} certFields.subjectPubKey 证书拥有方的公钥对象，使用jsrsasign提供的pubKeyObj
 * @param {Object} certFields.issuerPrvKey 证书发行方的私钥对象，使用jsrsasign提供的prvKeyObj
 * @param {string} [certFields.gmUserID] 证书拥有者的id标识, 当creator为gm时，需要该属性，并且不需要其他属性；
 * 当creator为jsrsasign时，不需要该属性
 * @param {string} [creator] 证书生成者，支持使用jsrsasign或gm(即国密)，默认使用jsrsasign
 * @param {gmCertificateCallback} [cb] 回调函数，gm证书生成实现是异步的，所以当creator为gm时，需要提供该参数
 * @returns {string} certPEM pem格式的证书信息，当creator为jsrsasign时，将返回该信息
 */
const CreateCertificate = (certFields, creator = "jsrsasign", cb) => {
    const tbs = new KJUR.asn1.x509.TBSCertificate();
    let cert;
    switch (creator) {
        case "jsrsasign":
            tbs.setSerialNumberByParam({ int: certFields.serialNumber });
            tbs.setSignatureAlgByParam({ name: certFields.sigAlg });
            tbs.setIssuerByParam({ str: certFields.issuerDN });
            tbs.setSubjectByParam({ str: certFields.subjectDN });
            tbs.setNotBeforeByParam({ str: `${moment.unix(certFields.notBefore).utc().format("YYYYMMDDHHmmss")}Z` });
            tbs.setNotAfterByParam({ str: `${moment.unix(certFields.notAfter).utc().format("YYYYMMDDHHmmss")}Z` });
            tbs.setSubjectPublicKey(certFields.subjectPubKey);
            cert = new KJUR.asn1.x509.Certificate({
                tbscertobj: tbs,
                prvkeyobj: certFields.issuerPrvKey,
            });
            cert.sign();
            return cert.getPEMString();
        case "gm":
            gmCUs.getGMCertificate(certFields.gmUserID, cb);
            return null;
        default:
            throw new Error("Not supported certificate creator ", creator);
    }
};

/**
 * 生成符合X.509标准的自签名证书信息
 * 
 * @param {Object} certFields 证书具体信息
 * @param {number} certFields.serialNumber 证书序列号
 * @param {string} certFields.sigAlg 证书签名算法
 * @param {string} certFields.DN 符合X500标准的代表证书所有者身份标识的Distinguished Name
 * @param {number} certFields.notBefore 代表证书有效性起始时间的unix时间戳
 * @param {number} certFields.notAfter 代表证书有效性终止时间的unix时间戳
 * @param {Object} certFields.keypair 证书拥有方的密钥对，含有jsrsasign提供的prvKeyObj和pubKeyObj对象
 * @returns {string} certPEM pem格式的自签名证书信息
 */
const CreateSelfSignedCertificate = (certFields) => {
    const certFieldsCoverted = {
        serialNumber: certFields.serialNumber,
        sigAlg: certFields.sigAlg,
        subjectDN: certFields.DN,
        issuerDN: certFields.DN,
        notBefore: certFields.notBefore,
        notAfter: certFields.notAfter,
        subjectPubKey: certFields.keypair.pubKeyObj,
        issuerPrvKey: certFields.keypair.prvKeyObj,
    };
    const certPEM = CreateCertificate(certFieldsCoverted);
    return certPEM;
};

/**
 * 导入已有的公钥证书信息
 * 
 * @param {string} certPEM 符合X.509标准的公钥证书信息
 * @returns {Object} x509 jsrsasign提供的X509对象实例
 */
const ImportCertificate = (certPEM) => {
    const x509 = new X509();
    x509.readCertPEM(certPEM);

    const getUnixTimestamp = (notBeforeOrNotAfterFormatTimestampStr) => {
        const format = notBeforeOrNotAfterFormatTimestampStr.length === 15 ? "YYYYMMDDHHmmss" : "YYMMDDHHmmss";
        return moment.utc(notBeforeOrNotAfterFormatTimestampStr, format).unix();
    };

    x509.getNotBeforeUnixTimestamp = () => getUnixTimestamp(x509.getNotBefore());

    x509.getNotAfterUnixTimestamp = () => getUnixTimestamp(x509.getNotAfter());

    return x509;
};

/**
 * 验证证书签名信息
 * 
 * @param {string} certPEM 符合X509标准的公钥证书信息
 * @param {Object} pubKey 证书签发者的公钥对象
 * @returns {boolean} 证书签名验证结果
 */
const VerifyCertificateSignature = (certPEM, pubKey) => {
    const x509 = ImportCertificate(certPEM);
    return x509.verifySignature(pubKey);
};

export {
    GetHashVal,
    CreateKeypair,
    ImportKey,
    GetKeyPEM,
    Sign,
    VerifySign,
    CalculateAddr,
    CreateCertificate,
    CreateSelfSignedCertificate,
    VerifyCertificateSignature,
    ImportCertificate,
};

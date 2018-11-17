const crypto = require('crypto')
const jsrsasign = require('jsrsasign')
const KEYUTIL = jsrsasign.KEYUTIL
const KJUR = jsrsasign.KJUR
const X509 = jsrsasign.X509
const moment = require('moment')
const GmCryptoUtils = require('./gmCryptoUtils');

const { GMCryptoUtils } = require('./gmCryptoUtils');
let gmCUs = new GMCryptoUtils("wss://localhost:9003");

/**
 * 根据指定的密码学哈希算法为给定数据计算哈希值
 * @param {Buffer | String} data 待对其计算哈希值的原数据 
 * @param {String} alg 密码学哈希算法，默认使用sha256
 * @param {String} prov 密码学哈希算法的提供者provider，支持使用nodecrypto、jsrsasign以及gm
 * - nodecrypto，NodeJS内建的crypto工具，默认使用该provider，支持openssl提供的hash算法，
 *   可在终端使用命令`openssl list-message-digest-algorithms`(1.0.2版)或`openssl list -digest-algorithms`(1.1.0版)查看支持的哈希算法
 * - jsrsasign，由kjur开源的nodejs加密工具(https://kjur.github.io/jsrsasign),
 *   支持的哈希算法如https://kjur.github.io/jsrsasign/api/symbols/KJUR.crypto.MessageDigest.html 所示 
 * - gm，国密算法加密工具，支持sm3哈希算法
 * @param {Function} cb 这里使用的sm3计算服务为异步实现，当使用sm3时需提供回调方法cb，其形式为cb = (sm3HashVal) => {......}
 * @returns {Buffer} digest 结果哈希值，若使用sm3将返回undefined
 */
const GetHashVal = (data, alg = 'sha256', prov = 'nodecrypto', cb) => {
    let hash, digest;
    if(alg === 'sm3' && prov !== 'gm')
        throw new Error("必须指定provider为gm，即prov='gm'");
    if(alg !== 'sm3' && prov === 'gm')
        throw new Error("该provider只支持sm3算法");

    switch (prov) {
        case 'nodecrypto':
            // 使用NodeJS自带crypto工具计算哈希值
            // 支持的哈希算法更多
            hash = crypto.createHash(alg);
            hash.update(data);
            digest = hash.digest();
            break;
        case 'jsrsasign':
            hash = new KJUR.crypto.MessageDigest({alg: alg, prov: "cryptojs"})
            data = Buffer.isBuffer(data) ? data.toString() : data;
            hash.updateString(data)
            let digestHex = hash.digest()
            digest = Buffer.from(digestHex, 'hex')
            break;
        case 'gm':
            data = Buffer.isBuffer(data) ? data.toString('hex') : Buffer.from(data).toString('hex');
            gmCUs.getGMHashVal(data, cb);
            break;
        default:
            throw new Error("Not supported hash algorithm provider") ;
    }
    return digest;
}

/**
 * 根据指定签名算法和私钥，对给定数据进行签名
 * @param {Object | String} prvKey 私钥信息，支持使用jsrsasign提供的私钥对象，
 * 或直接使用符合PKCS#5的未加密pem格式DSA/RSA私钥，符合PKCS#8的未加密pem格式RSA/ECDSA私钥，当使用gm签名算法时该参数应为null
 * @param {String | Buffer} data 待被签名的数据
 * @param {String} alg 签名算法，默认使用ecdsa-with-SHA1，国密签名算法为sm2-with-SM3
 * @param {String} prov 签名算法的提供者，支持使用jsrsasign或node内建的crypto(默认使用)，以及gm国密签名算法工具
 * @param {String} gmUserID 国密签名算法需要的用户标识，该标识是到gm websocket server查找到其对应国密私钥的唯一标识
 * @param {Function} cb 国密签名算法支持为异步实现，当使用国密签名算法时，需要使用该回调方法，其形式为cb = (signature) => {......}
 * @returns {Buffer} signature 签名结果值，当使用非国密签名时，会返回该结果
 */
const Sign = (prvKey, data, alg = 'ecdsa-with-SHA1', prov = 'nodecrypto', gmUserID, cb) => {
    let sig, signature
    switch(prov){
        case 'nodecrypto':
            // 使用Node自带的crypto包进行签名
            // ps: 发现jsrsasign提供的签名工具包有bug:
            // 对普通数据签名时，在本地和RepChain端验签都ok,
            // 但是，当对一个哈希值进行签名时，在本地验签成功，但在RepChain端验签失败
            sig = crypto.createSign(alg)
            sig.update(data)
            let prvK = typeof prvKey === 'object' ? GetKeyPEM(prvKey) : prvKey;
            signature = sig.sign(prvK)
            break
        case 'jsrsasign':
            sig = new KJUR.crypto.Signature({ 'alg': alg}); // alg = <hash>wth<crypto> like: SHA1withECDSA
            sig.init(prvKey);
            let dataTBS = Buffer.isBuffer(data) ? data.toString() : data;
            sig.updateString(dataTBS);
            let sigHexValue = sig.sign();
            signature = Buffer.from(sigHexValue, 'hex')
            break
        case 'gm':
            data = Buffer.isBuffer(data) ? data.toString('base64') : Buffer.from(data).toString('base64'); 
            gmCUs.getGMSignature(gmUserID, data, cb);
            break;
        default:
            throw new Error("Not supported sign provider")
    }
    return signature
}

/**
 * 验证签名
 * @param {Object | String} pubKey 公钥信息，支持使用jsrsasign提供的公钥对象，
 * 或直接使用符合PKCS#8的pem格式DSA/RSA/ECDSA公钥，符合X.509的PEM格式包含公钥信息的证书
 * @param {Buffer} sigValue 签名结果
 * @param {String | Buffer} data 被签名的原数据
 * @param {String} alg 签名算法，默认使用ecdsa-with-SHA1
 * @param {String} prov 签名算法的提供者，支持使用jsrsasign或node内建的crypto(默认使用)，待支持使用国密算法提供者
 * @returns {Boolean} isValid 签名真实性鉴定结果
 */
const VerifySign = (pubKey, sigValue, data, alg = 'ecdsa-with-SHA1', prov = 'nodecrypto') => {
    let isValid
    switch(prov){
        case 'nodecrypto':
            let verify = crypto.createVerify(alg)
            verify.update(data)
            let pubK = pubKey
            if(typeof pubKey == 'object')
                pubK = GetKeyPEM(pubKey)
            isValid = verify.verify(pubK, sigValue)
            break
        case 'jsrsasign':
            let sig = new KJUR.crypto.Signature({ 'alg': alg }); // SHA1withECDSA
            sig.init(pubKey);
            let dataTVS = data;
            const bFlag = Buffer.isBuffer(data);
            if (bFlag)
                dataTVS = data.toString();
            sig.updateString(dataTVS);
            let sigValHex = sigValue.toString('hex')
            isValid = sig.verify(sigValHex);
            break
        // Todo: case '国密'
        default:
            throw new Error("Not supported sign provider")
    }
    return isValid
}

/**
 * 创建非对称密钥对，支持RSA与EC密钥对生成
 * @param {String} alg 密钥对生成算法，RSA或EC，默认使用EC
 * @param {keylenOrCurve} keylenOrCurve 指定密钥长度（针对RSA）或曲线名（针对EC），
 * 默认使用EC secp256k1曲线
 * @returns {Object} keypair 含有jsrsasign提供的prvKeyObj与pubKeyObj对象
 */
const CreateKeypair = (alg = 'EC', keylenOrCurve = 'secp256k1') => {
    const keypair = KEYUTIL.generateKeypair(alg, keylenOrCurve);
    return keypair;
}

/**
 * 导入已有非对称密钥
 * @param {String} keyPEM 使用符合PKCS#8标准的pem格式私钥信息获取私钥对象，支持导入使用PBKDF2/HmacSHA1/3DES加密的pem格式私钥信息
 * 使用符合PKCS#8标准的pem格式公钥信息或符合X.509标准的pem格式证书信息获取公钥对象
 * @param {String} passWord 私钥保护密码, 当导入已加密私钥时，需要提供该参数
 * @returns {Object} keyObj 密钥对象，prvkeyObj或pubKeyObj
 */
const ImportKey = (keyorCertPEM, passWord) => {
    const keyObj = KEYUTIL.getKey(keyorCertPEM, passWord);
    return keyObj;
}

/**
 * 获得PEM格式的私钥或公钥信息
 * @param {String} keyObj prvKeyObj或pubKeyObj
 * @param {String} passWord 私钥保护密码，当需要生成加密私钥信息时需提供该参数, 目前是由jsrsasign使用PBKDF2/HmacSHA1/3DES算法对私钥进行加密
 * @returns {String} keyPEM 符合PKCS#8标准的密钥信息
 */
const GetKeyPEM = (keyObj, passWord) => {
    let keyPEM;
    if(keyObj.isPrivate)
        keyPEM = KEYUTIL.getPEM(keyObj, "PKCS8PRV", passWord);
    else
        keyPEM = KEYUTIL.getPEM(keyObj);
    return keyPEM;
}

/**
 * 生成符合X.509标准的证书信息
 * @param {Object} certFields 证书的具体信息，
 * 当creator为jsrsasign时所需信息包括:
 * - {Number} serialNumber 证书序列号
 * - {String} sigAlg 签发证书时使用的签名算法
 * - {String} issuerDN 符合X500标准的代表证书发行方身份标识的Distinguished Name
 * - {String} subjectDN 符合X500标准的代表证书拥有方标识的Distinguished Name
 * - {Number} notBefore 代表证书有效性起始时间的unix时间戳（秒）
 * - {Number} notAfter 代表证书有效性终止时间的unix时间戳（秒）
 * - {Object} subjectPubKey 证书拥有方的公钥对象，使用jsrsasign提供的pubKeyObj
 * - {Object} issuerPrvKey 证书发行方的私钥对象，使用jsrsasign提供的prvKeyObj
 * 
 * 当creator为gm时，所需信息为:
 * - {String} gmUserID，证书拥有者的id标识
 * @param {String} creator 证书生成者，支持使用jsrsasign或gm(即国密)，默认使用jsrsasign
 * @param {Function} cb 回调函数，gm证书生成实现是异步的，所以当creator为gm时，需要提供该参数，其形式为cb = (certPEM) => {......}
 * @returns {String} certPEM pem格式的证书信息，当creator为jsrsasign时，将返回该信息
 */
const CreateCertificate = (certFields, creator = 'jsrsasign', cb) => {
    switch(creator){
        case 'jsrsasign':
            let tbs = new KJUR.asn1.x509.TBSCertificate();
            tbs.setSerialNumberByParam({ 'int': certFields.serialNumber});
            tbs.setSignatureAlgByParam({ 'name': certFields.sigAlg});
            tbs.setIssuerByParam({ 'str': certFields.issuerDN});
            tbs.setSubjectByParam({ 'str': certFields.subjectDN});
            const notBeforeFormated = moment.unix(certFields.notBefore).utc().format('YYYYMMDDHHmmss') + 'Z';
            tbs.setNotBeforeByParam({'str': notBeforeFormated });
            const notAfterFormated = moment.unix(certFields.notAfter).utc().format('YYYYMMDDHHmmss') + 'Z';
            tbs.setNotAfterByParam({'str': notAfterFormated });
            tbs.setSubjectPublicKey(certFields.subjectPubKey);
            let cert = new KJUR.asn1.x509.Certificate({ 'tbscertobj': tbs, 'prvkeyobj': certFields.issuerPrvKey});
            cert.sign();
            let cert_pem = cert.getPEMString();
            return cert_pem;
        case 'gm':
            gmCUs.getGMCertificate(certFields.gmUserID, cb);
            break;
        default:
            throw new Error("Not supported certificate creator ", creator);
    }
}

/**
 * 生成符合X.509标准的自签名证书信息
 * @param {Object} certFields 证书具体信息，包括:
 * - {Number} serialNumber 证书序列号
 * - {String} sigAlg 证书签名算法
 * - {String} DN 符合X500标准的代表证书所有者身份标识的Distinguished Name 
 * - {Number} notBefore 代表证书有效性起始时间的unix时间戳
 * - {Number} notAfter 代表证书有效性终止时间的unix时间戳
 * - {Object} keypair 证书拥有方的密钥对，含有jsrsasign提供的prvKeyObj和pubKeyObj对象
 * @returns {String} certPEM pem格式的自签名证书信息
 */
const CreateSelfSignedCertificate = (certFields) => {
    let certFieldsCoverted = {
        serialNumber: certFields.serialNumber,
        sigAlg: certFields.sigAlg,
        subjectDN: certFields.DN,
        issuerDN: certFields.DN,
        notBefore: certFields.notBefore,
        notAfter: certFields.notAfter,
        subjectPubKey: certFields.keypair.pubKeyObj,
        issuerPrvKey: certFields.keypair.prvKeyObj
    }
    let certPEM = CreateCertificate(certFieldsCoverted);
    return certPEM;
}

/**
 * 
 * @param {String} certPEM 符合X509标准的公钥证书信息
 * @param {Object} pubKey 证书签发者的公钥对象
 * @returns {isValid} 证书签名验证结果，true or false
 */
const VerifyCertificateSignature = (certPEM, pubKey) => {
    let isValid;
    let x509 = ImportCertificate(certPEM); 
    isValid = x509.verifySignature(pubKey)
    return isValid;
}

/**
 * 
 * @param {String} certPEM 符合X.509标准的公钥证书信息
 * @returns {Object} jsrsasign提供的X509对象实例
 */
const ImportCertificate = (certPEM) => {
    let x509 = new X509();
    x509.readCertPEM(certPEM);

    const getUnixTimestamp = (notBeforeOrNotAfterFormatTimestampStr) => {
        let time;
        time = moment.utc(notBeforeOrNotAfterFormatTimestampStr, 'YYYYMMDDHHmmss')
        .unix();
        return time;
    }

    x509.getNotBeforeUnixTimestamp = () => {
        return getUnixTimestamp(x509.getNotBefore());
    }

    x509.getNotAfterUnixTimestamp = () => {
        return getUnixTimestamp(x509.getNotAfter());
    }

    return x509;
}

module.exports = {
    GetHashVal: GetHashVal,
    Sign: Sign,
    VerifySign: VerifySign,
    CreateKeypair: CreateKeypair,
    ImportKey: ImportKey,
    GetKeyPEM: GetKeyPEM,
    CreateCertificate: CreateCertificate,
    CreateSelfSignedCertificate: CreateSelfSignedCertificate,
    VerifyCertificateSignature: VerifyCertificateSignature,
    ImportCertificate: ImportCertificate,
}
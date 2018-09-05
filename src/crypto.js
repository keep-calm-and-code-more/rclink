const crypto = require('crypto')
const jsrsasign = require('jsrsasign')
const KEYUTIL = jsrsasign.KEYUTIL
const KJUR = jsrsasign.KJUR
const X509 = jsrsasign.X509

/**
 * 根据指定的密码学哈希算法为给定数据计算哈希值
 * @param {Buffer | String} data 待对其计算哈希值的原数据 
 * @param {String} he 哈希值的编码格式, 默认无指定，即为null
 * @param {String} alg 密码学哈希算法，默认使用sha256
 * @returns {String | Buffer} digest 指定编码方式的哈希值信息，若无指定编码格式，则默认以字节流返回
 */
const GetHashVal = (data, he = null, alg = 'sha256') => {
    let hash = crypto.createHash(alg);
    hash.update(data);
    let digest;
    if (he)
        digest = hash.digest(he);
    else
        digest = hash.digest();
    return digest;
}

/**
 * 根据指定签名算法，使用私钥对给定数据进行签名
 * @param {Object | String} prvKey 私钥信息，支持使用jsrsasign提供的私钥对象，
 * 或直接使用符合PKCS#5的未加密pem格式DSA/RSA私钥，符合PKCS#8的未加密pem格式RSA/ECDSA私钥
 * @param {String | Buffer} data 待被签名的数据
 * @param {String} alg 签名算法，默认使用SHA1withECDSA
 * @returns {String | Buffer} signature 签名信息，若data为字符串则返回hex格式的签名信息，否则以字节流形式返回签名信息
 */
const Sign = (prvKey, data, alg = 'SHA1withECDSA') => {
    let sig = new KJUR.crypto.Signature({ 'alg': alg });
    sig.init(prvKey);
    let dataTBS = data;
    const bFlag = Buffer.isBuffer(data)
    if (bFlag)
        dataTBS = data.toString();
    sig.updateString(dataTBS);
    let sigHexValue = sig.sign();
    let signature = sigHexValue;
    if (bFlag)
        signature = Buffer.from(sigHexValue, 'hex')
    return signature;
}

/**
 * 验证签名
 * @param {Object | String} pubKey 公钥信息，支持使用jsrsasign提供的公钥对象，
 * 或直接使用符合PKCS#8的pem格式DSA/RSA/ECDSA公钥，符合X.509的PEM格式包含公钥信息的证书
 * @param {String | Buffer} sigValue 签名结果，hex格式字符串或字节流
 * @param {String | Buffer} data 被签名的原数据，签名结果的类型需与被签名数据的类型一致
 * @param {String} alg 签名算法，默认使用SHA1withECDSA
 * @returns {Boolean} isValid 签名真实性鉴定结果
 */
const VerifySign = (pubKey, sigValue, data, alg = 'SHA1withECDSA') => {
    let sig = new KJUR.crypto.Signature({ 'alg': alg });
    sig.init(pubKey);
    let dataTVS = data;
    const bFlag = Buffer.isBuffer(data);
    if (bFlag)
        dataTVS = data.toString();
    sig.updateString(dataTVS);
    let sigValueTBV = sigValue;
    if (bFlag)
        sigValueTBV = sigValue.toString('hex')
    let isValid = sig.verify(sigValueTBV);
    return isValid;
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
 * @param {String} keyPEM 使用未加密的pem格式私钥信息获取私钥对象，
 * 使用pem格式公钥信息或符合X.509的证书信息获取公钥对象
 * @returns {Object} keyObj 密钥对象，prvkeyObj或pubKeyObj
 */
const ImportKey = (keyorCertPEM) => {
    const keyObj = KEYUTIL.getKey(keyorCertPEM);
    return keyObj;
}

/**
 * 获得PEM格式的私钥或公钥信息
 * @param {String} keyObj prvKeyObj或pubKeyObj
 * @returns {String} keyPEM 符合PKCS#8标准的密钥信息
 */
const GetKeyPEM = (keyObj) => {
    let keyPEM;
    if(keyObj.isPrivate)
        keyPEM = KEYUTIL.getPEM(keyObj, "PKCS8PRV");
    else
        keyPEM = KEYUTIL.getPEM(keyObj);
    return keyPEM;
}

/**
 * 生成符合X.509标准的证书信息
 * @param {Number} serialNumber 证书序列号
 * @param {String} sigAlg 证书签发时使用的签名算法
 * @param {String} issuerDN 符合X500标准的代表证书发行方身份标识的Distinguished Name
 * @param {String} subjectDN 符合X500标准的代表证书拥有方标识的Distinguished Name
 * @param {String} notBefore 代表证书有效性起始时间的unix时间戳
 * @param {String} notAfter 代表证书有效性终止时间的unix时间戳
 * @param {Object} subjectPubKey 证书拥有方的公钥对象，使用jsrsasign提供的pubKeyObj
 * @param {Object} issuerPrvKey 证书发行方的私钥对象，使用jsrsasign提供的prvKeyObj
 * @returns {String} certPEM pem格式的已签名证书信息
 */
const CreateCertificate = (serialNumber, sigAlg, issuerDN, subjectDN, notBefore, notAfter, subjectPubKey, issuerPrvKey) => {
    let tbs = new KJUR.asn1.x509.TBSCertificate();
    tbs.setSerialNumberByParam({ 'int': serialNumber});
    tbs.setSignatureAlgByParam({ 'name': sigAlg});
    tbs.setIssuerByParam({ 'str': issuerDN});
    tbs.setSubjectByParam({ 'str': subjectDN});
    tbs.setNotBeforeByParam({'str': notBefore + 'Z' });
    tbs.setNotAfterByParam({'str': notAfter + 'Z' });
    tbs.setSubjectPublicKey(subjectPubKey);
    let cert = new KJUR.asn1.x509.Certificate({ 'tbscertobj': tbs, 'prvkeyobj': issuerPrvKey});
    cert.sign();
    let cert_pem = cert.getPEMString();
    return cert_pem;
}

/**
 * 生成符合X.509标准的自签名证书信息
 * @param {Number} serialNumber 证书序列号
 * @param {String} sigAlg 证书签名算法
 * @param {String} DN 符合X500标准的代表证书所有者身份标识的Distinguished Name 
 * @param {String} notBefore 代表证书有效性起始时间的unix时间戳
 * @param {String} notAfter 代表证书有效性终止时间的unix时间戳
 * @param {Object} keypair 证书拥有方的密钥对，含有jsrsasign提供的prvKeyObj和pubKeyObj对象
 * @returns {String} certPEM pem格式的自签名证书信息
 */
const CreateSelfSignedCertificate = (serialNumber, sigAlg, DN, notBefore, notAfter, keypair) => {
    let certPEM = CreateCertificate(serialNumber, sigAlg, DN, DN, notBefore, notAfter, keypair.pubKeyObj, keypair.prvKeyObj);
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
    let x509 = new X509();
    x509.readCertPEM(certPEM);
    isValid = x509.verifySignature(pubKey)
    return isValid;
}

module.exports = {GetHashVal, Sign, VerifySign, CreateKeypair, ImportKey, GetKeyPEM, 
    CreateCertificate, CreateSelfSignedCertificate, VerifyCertificateSignature}
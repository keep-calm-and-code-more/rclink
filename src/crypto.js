const crypto = require('crypto')
const jsrsasign = require('jsrsasign')
const KEYUTIL = jsrsasign.KEYUTIL
const KJUR = jsrsasign.KJUR
const X509 = jsrsasign.X509

/**
 * 根据指定的密码学哈希算法为给定数据计算哈希值
 * @param {Buffer | String} data 待对其计算哈希值的原数据 
 * @param {String} alg 密码学哈希算法，默认使用sha256
 * @param {String} prov 密码学哈希算法的提供者，支持使用jsrsasign或node内建的crypto(默认使用), 待支持国密算法的提供者
 * @returns {Buffer} 结果哈希值
 */
export const GetHashVal = (data, alg = 'sha256', prov = 'nodecrypto') => {
    let hash, digest
    switch (prov) {
        case 'nodecrypto':
            // 使用Node自带crypto包计算哈希值
            // 支持的哈希算法更多
            hash = crypto.createHash(alg);
            hash.update(data);
            digest = hash.digest();
            break
        case 'jsrsasign':
            hash = new KJUR.crypto.MessageDigest({alg: alg, prov: "cryptojs"})
            let dataTBH = data
            const bFlag = Buffer.isBuffer(data)
            if(bFlag)
                dataTBH = data.toString()
            hash.updateString(dataTBH)
            let digestHex = hash.digest()
            digest = Buffer.from(digestHex, 'hex')
            break
        // Todo: case '国密'
        default:
            throw new Error("Not supported hash provider") 
    }
    return digest
}

/**
 * 根据指定签名算法和私钥，对给定数据进行签名
 * @param {Object | String} prvKey 私钥信息，支持使用jsrsasign提供的私钥对象，
 * 或直接使用符合PKCS#5的未加密pem格式DSA/RSA私钥，符合PKCS#8的未加密pem格式RSA/ECDSA私钥
 * @param {String | Buffer} data 待被签名的数据
 * @param {String} alg 签名算法，默认使用ecdsa-with-SHA1
 * @param {String} prov 签名算法的提供者，支持使用jsrsasign或node内建的crypto(默认使用)，带支持使用国密算法提供者
 * @returns {Buffer} signature 签名结果值
 */
export const Sign = (prvKey, data, alg = 'ecdsa-with-SHA1', prov = 'nodecrypto') => {
    let sig, signature
    switch(prov){
        case 'nodecrypto':
            // 使用Node自带的crypto包进行签名
            // ps: 发现jsrsasign提供的签名工具包有bug:
            // 对普通数据签名时，在本地和RepChain端验签都ok,
            // 但是，当对一个哈希值进行签名时，在本地验签成功，但在RepChain端验签失败
            sig = crypto.createSign(alg)
            sig.update(data)
            let prvK = prvKey
            if(typeof prvKey == 'object')
                prvK = GetKeyPEM(prvKey)
            signature = sig.sign(prvK)
            break
        case 'jsrsasign':
            sig = new KJUR.crypto.Signature({ 'alg': alg}); // alg = <hash>wth<crypto> like: SHA1withECDSA
            sig.init(prvKey);
            let dataTBS = data;
            const bFlag = Buffer.isBuffer(data)
            if (bFlag)
                dataTBS = data.toString();
            sig.updateString(dataTBS);
            let sigHexValue = sig.sign();
            signature = Buffer.from(sigHexValue, 'hex')
            break
        // Todo: case '国密'
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
 * @param {String} prov 签名算法的提供者，支持使用jsrsasign或node内建的crypto(默认使用)，带支持使用国密算法提供者
 * @returns {Boolean} isValid 签名真实性鉴定结果
 */
export const VerifySign = (pubKey, sigValue, data, alg = 'ecdsa-with-SHA1', prov = 'nodecrypto') => {
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
export const CreateKeypair = (alg = 'EC', keylenOrCurve = 'secp256k1') => {
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
export const ImportKey = (keyorCertPEM, passWord) => {
    const keyObj = KEYUTIL.getKey(keyorCertPEM, passWord);
    return keyObj;
}

/**
 * 获得PEM格式的私钥或公钥信息
 * @param {String} keyObj prvKeyObj或pubKeyObj
 * @param {String} passWord 私钥保护密码，当需要生成加密私钥信息时需提供该参数, 目前是由jsrsasign使用PBKDF2/HmacSHA1/3DES算法对私钥进行加密
 * @returns {String} keyPEM 符合PKCS#8标准的密钥信息
 */
export const GetKeyPEM = (keyObj, passWord) => {
    let keyPEM;
    if(keyObj.isPrivate)
        keyPEM = KEYUTIL.getPEM(keyObj, "PKCS8PRV", passWord);
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
export const CreateCertificate = (serialNumber, sigAlg, issuerDN, subjectDN, notBefore, notAfter, subjectPubKey, issuerPrvKey) => {
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
export const CreateSelfSignedCertificate = (serialNumber, sigAlg, DN, notBefore, notAfter, keypair) => {
    let certPEM = CreateCertificate(serialNumber, sigAlg, DN, DN, notBefore, notAfter, keypair.pubKeyObj, keypair.prvKeyObj);
    return certPEM;
}

/**
 * 
 * @param {String} certPEM 符合X509标准的公钥证书信息
 * @param {Object} pubKey 证书签发者的公钥对象
 * @returns {isValid} 证书签名验证结果，true or false
 */
export const VerifyCertificateSignature = (certPEM, pubKey) => {
    let isValid;
    let x509 = new X509();
    x509.readCertPEM(certPEM);
    isValid = x509.verifySignature(pubKey)
    return isValid;
}

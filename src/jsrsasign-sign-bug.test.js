const crypto = require('crypto')
const jsrsasign = require('jsrsasign')
const KJUR = jsrsasign.KJUR
const getHashVal = require('./crypto').GetHashVal

const signWithJsrsasign = (prvKey, data, alg = 'SHA1withECDSA') => {
    let sig = new KJUR.crypto.Signature({ 'alg': alg}) //alg = <hash>wth<crypto> like: SHA1withECDSA
    sig.init(prvKey)
    let dataTBS = data
    const bFlag = Buffer.isBuffer(data)
    if (bFlag)
        dataTBS = data.toString()
    sig.updateString(dataTBS)
    let sigHexValue = sig.sign()
    let signature = Buffer.from(sigHexValue, 'hex')
    return signature
}

const signWithNodeCrypto = (prvKey, data, alg = "SHA1") => {
    let sig = crypto.createSign(alg) // 签名即是对原数据的哈希值加密，这里只需指定哈希算法，加密算法会从私钥中提取
    sig.update(data)
    let prvK = prvKey
    if(typeof prvKey == 'object')
        prvK = GetKeyPEM(prvKey)
    let signature = sig.sign(prvK)
    return signature
}

const verifySignWithJsrsasign = (pubKey, sigValue, data, alg = "SHA1withECDSA") => {
    let sig = new KJUR.crypto.Signature({ 'alg': alg });
    sig.init(pubKey);
    let dataTVS = data;
    const bFlag = Buffer.isBuffer(data);
    if (bFlag)
        dataTVS = data.toString();
    sig.updateString(dataTVS);
    let sigValHex = sigValue.toString('hex')
    let isValid = sig.verify(sigValHex);
    return isValid;
}

const verifySignWithNodeCrypto = (pubKey, sigValue, data, alg = "SHA1") => {
    let verify = crypto.createVerify(alg)
    verify.update(data)
    let pubK = pubKey
    if(typeof pubKey == 'object')
        pubK = GetKeyPEM(pubKey)
    let isValid = verify.verify(pubK, sigValue)
    return isValid
}

describe(`jsrsasign对哈希值签名存在bug, 
通过Node自带的Crypto包和RepChain端验签均失败，
但Node自带的Crypto包对哈希值签名后，在RepChain端验签没问题,
而且只对哈希值签名有问题，按理说哈希值也只是一堆数据，在签名时和其原数据没什么区别
`, () => {
    // 从RepChain使用的mykeystore_1.jks中导出
    const prvKeyPEM = "-----BEGIN PRIVATE KEY-----\nMIGNAgEAMBAGByqGSM49AgEGBSuBBAAKBHYwdAIBAQQgOUm2PF8apyaK1bXjKH5j\njCld/I6ExpefemRGsS0C4+WgBwYFK4EEAAqhRANCAAT6VLE/eF9+sK1ROn8n6x7h\nKsBxehW42qf1IB8quBn5OrQD3x2H4yZVDwPgcEUCjH8PcFgswdtbo8JL/7f66yEC\n-----END PRIVATE KEY-----"
    const pubKeyPEM = "-----BEGIN PUBLIC KEY-----\nMFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAE+lSxP3hffrCtUTp/J+se4SrAcXoVuNqn\n9SAfKrgZ+Tq0A98dh+MmVQ8D4HBFAox/D3BYLMHbW6PCS/+3+ushAg==\n-----END PUBLIC KEY-----"

    let msg = Buffer.from("abcde")
    let msgHashVal = getHashVal(msg, 'sha256')
    console.log("msg hex\n", msg.toString('hex'))
    console.log("msgHashVal hex\n", msgHashVal.toString('hex'))

    let sig1 = signWithJsrsasign(prvKeyPEM, msg)
    let sig2 = signWithJsrsasign(prvKeyPEM, msgHashVal) 
    console.log("signature for msg with jsrsasign\n", sig1.toString('hex'))
    console.log("signature for msgHashVal with jsrsasign\n", sig2.toString('hex'))

    let sig3 = signWithNodeCrypto(prvKeyPEM, msg)
    let sig4 = signWithNodeCrypto(prvKeyPEM, msgHashVal) 
    console.log("signature for msg with Node Crypto\n", sig3.toString('hex'))
    console.log("signature for msgHashVal with Node Crypto\n", sig4.toString('hex'))


    test('使用jsrsasign提供的验签方法，对jsrsasign和Node Crypto提供的签名方法产生的签名进行验证，应都通过', () => {
        let vr1 = verifySignWithJsrsasign(pubKeyPEM, sig1, msg)
        let vr2 = verifySignWithJsrsasign(pubKeyPEM, sig2, msgHashVal)
        let vr3 = verifySignWithJsrsasign(pubKeyPEM, sig3, msg)
        let vr4 = verifySignWithJsrsasign(pubKeyPEM, sig4, msgHashVal)
        expect(vr1).toBeTruthy()
        expect(vr2).toBeTruthy()
        expect(vr3).toBeTruthy()
        expect(vr4).toBeTruthy()
    })
    test('使用Node Crypto提供的验签方法，对jsrsasign和Node Crypto提供的签名方法产生的签名进行验证，应都通过', () => {
        let vr1 = verifySignWithNodeCrypto(pubKeyPEM, sig1, msg)
        let vr2 = verifySignWithNodeCrypto(pubKeyPEM, sig2, msgHashVal)
        let vr3 = verifySignWithNodeCrypto(pubKeyPEM, sig3, msg)
        let vr4 = verifySignWithNodeCrypto(pubKeyPEM, sig4, msgHashVal)
        expect(vr1).toBeTruthy()
        expect(vr2).toBeTruthy()
        expect(vr3).toBeTruthy()
        expect(vr4).toBeTruthy()
    })
})


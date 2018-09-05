const Crypto = require("./crypto")
const GetHashVal = Crypto.GetHashVal
const CreateKeypair = Crypto.CreateKeypair
const GetKeyPEM = Crypto.GetKeyPEM
const ImportKey = Crypto.ImportKey
import {
    Sign,VerifySign,CreateCertificate,CreateSelfSignedCertificate,
    VerifyCertificateSignature} from './crypto'

describe('密码学哈希值生成测试', () => {
    //欲计算哈希值的数据
    const str2bch1 = "to be crypto hashed"
    const bytes2bch1 = Buffer.from(str2bch1)
    const str2bch2 = "hashed crypto be to"
    const bytes2bch2 = Buffer.from(str2bch2) 

    test('对给定数据计算哈希值，指定哈希值的编码格式，获得字符串类型哈希值', () => {
        let h1 = GetHashVal(str2bch1, 'hex')
        let h2 = GetHashVal(bytes2bch2, 'base64')
        
        let r1 = /[0-9a-f]+$/.test(h1)
        let r2 = /[0-9a-zA-Z+=\/]+$/.test(h2)
        expect(r1).toBeTruthy()
        expect(r2).toBeTruthy()
    })
    test('对给定数据计算哈希值，默认获得字节流类型哈希值', () => {
        let h1 = GetHashVal(str2bch1)
        let h2 = GetHashVal(bytes2bch2)
        expect(h1).toBeInstanceOf(Buffer)
        expect(h2).toBeInstanceOf(Buffer)
    })
    test('对相同数据使用相同哈希算法进行哈希值计算，获得的结果应相同', () => {
        let h1 = GetHashVal(str2bch1, 'utf-8', 'sha1')
        let h2 = GetHashVal(str2bch1, 'utf-8', 'sha1')
        expect(h1).toBe(h2)
    })
    test('对相同数据使用不同哈希算法进行哈希值计算，获得的结果应不同', () => {
        let h1 = GetHashVal(str2bch1, 'utf-8', 'MD5')
        let h2 = GetHashVal(str2bch1, 'utf-8', 'RIPEMD160')
        expect(h1).not.toBe(h2)
    })
    test('对不同数据使用相同哈希算法进行哈希值计算，获得的结果应不同', () => {
        let h1 = GetHashVal(str2bch1, 'utf-8')
        let h2 = GetHashVal(str2bch2, 'utf-8')
        expect(h1).not.toBe(h2)
    })
    test('对不同数据使用不同哈希算法进行哈希值计算，获得的结果应不同', () => {
        let h1 = GetHashVal(str2bch1, 'utf-8', 'sha256')
        let h2 = GetHashVal(str2bch2, 'utf-8', 'MD4')
        expect(h1).not.toBe(h2)
    })
    test('对相同数据的字符串和字节流使用相同哈希算法进行哈希值计算，获得的结果应相同', () => {
        let h1 = GetHashVal(str2bch1)
        let h2 = GetHashVal(bytes2bch1)
        expect(h1).toEqual(h2)
    });
});

describe('非对称密钥对生成与导出及导入测试', () => {
    let kp1 
    let kp2 
    let kp3

    let kp1PrvKeyPEM 
    let kp1PubKeyPEM 
    let kp2PrvKeyPEM
    let kp2PubKeyPEM

    let kp1PrvKey
    let kp1PubKey
    let kp2PrvKey
    let kp2PubKey

    beforeAll(() => {
        kp1 = CreateKeypair("EC", "secp256k1") 
        kp2 = CreateKeypair("RSA", 1024)
        kp3 = CreateKeypair()
        kp1PrvKeyPEM = GetKeyPEM(kp1.prvKeyObj)
        kp1PubKeyPEM = GetKeyPEM(kp1.pubKeyObj)
        kp2PrvKeyPEM = GetKeyPEM(kp2.prvKeyObj)
        kp2PubKeyPEM = GetKeyPEM(kp2.pubKeyObj)
        kp1PrvKey = ImportKey(kp1PrvKeyPEM)
        kp1PubKey = ImportKey(kp1PubKeyPEM)
        kp2PrvKey = ImportKey(kp2PrvKeyPEM)
        kp2PubKey = ImportKey(kp2PubKeyPEM)
    })

    test('生成密钥对导出为pem格式后再导入，密钥对应相同', () => {
        expect(kp1PrvKeyPEM).toBe(GetKeyPEM(kp1PrvKey))
        expect(kp1PubKeyPEM).toBe(GetKeyPEM(kp1PubKey))
        expect(kp2PrvKeyPEM).toBe(GetKeyPEM(kp2PrvKey))
        expect(kp2PubKeyPEM).toBe(GetKeyPEM(kp2PubKey))
    })
    test('使用默认参数生成密钥对，结果应为EC(secp256k1)', () => {
        expect(kp3.prvKeyObj.type).toBe("EC")
        expect(kp3.prvKeyObj.curveName).toBe("secp256k1")
        expect(kp3.pubKeyObj.type).toBe("EC")
        expect(kp3.pubKeyObj.curveName).toBe("secp256k1")
    })
})

describe('签名及签名验证测试', () => {
    //生成密钥对
    const kp1 = CreateKeypair("EC", "secp256r1");
    const kp2 = CreateKeypair("EC", "secp256k1");
    //待签名信息
    const ct1 = 'hello repchain1'
    const ct1bytes = Buffer.from(ct1)
    const ct2 = 'hello repchain2'
    const ct2bytes = Buffer.from(ct2)
    const ct3 = "hello"
    const ct3bytes = Buffer.from(ct3)
    let alg = 'SHA1withECDSA'

    //使用PEM格式密钥信息
    const prvk3pem = "-----BEGIN PRIVATE KEY-----\nMIGNAgEAMBAGByqGSM49AgEGBSuBBAAKBHYwdAIBAQQgOUm2PF8apyaK1bXjKH5j\njCld/I6ExpefemRGsS0C4+WgBwYFK4EEAAqhRANCAAT6VLE/eF9+sK1ROn8n6x7h\nKsBxehW42qf1IB8quBn5OrQD3x2H4yZVDwPgcEUCjH8PcFgswdtbo8JL/7f66yEC\n-----END PRIVATE KEY-----"
    const pubk3pem = "-----BEGIN PUBLIC KEY-----\nMFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAE+lSxP3hffrCtUTp/J+se4SrAcXoVuNqn\n9SAfKrgZ+Tq0A98dh+MmVQ8D4HBFAox/D3BYLMHbW6PCS/+3+ushAg==\n-----END PUBLIC KEY-----"

    //Sign
    test('对字符串进行签名，获得hex格式签名结果', () => {
        let s1 = Sign(kp1.prvKeyObj, ct1, alg)
        let s2 = Sign(kp2.prvKeyObj, ct2, alg)
        let s3 = Sign(prvk3pem, ct3, alg)
        expect(typeof s1).toBe('string')
        expect(typeof s2).toBe('string')
        expect(typeof s3).toBe('string')
    });
    test('对字节流进行签名，获得字节流格式的签名结果', () => {
        let s1 = Sign(kp1.prvKeyObj, ct1bytes, alg)
        let s2 = Sign(kp2.prvKeyObj, ct2bytes, alg)
        let s3 = Sign(prvk3pem, ct3bytes, alg)
        expect(s1).toBeInstanceOf(Buffer)
        expect(s2).toBeInstanceOf(Buffer)
        expect(s3).toBeInstanceOf(Buffer)
    });
    
    //Sign and VerifySign
    test('同一对密钥对相同内容的签名验证可以通过', () => {
        let s1 = Sign(kp1.prvKeyObj, ct1)
        let r1 = VerifySign(kp1.pubKeyObj, s1, ct1)
        let s2 = Sign(kp2.prvKeyObj, ct2bytes)
        let r2 = VerifySign(kp2.pubKeyObj, s2, ct2bytes)
        expect(r1).toBeTruthy();
        expect(r2).toBeTruthy();
    });
    test('同一对密钥对不同内容的签名验证不应通过', () => {
        let s1 = Sign(kp1.prvKeyObj, ct1)
        let r1 = VerifySign(kp1.pubKeyObj, s1, ct2 )
        let s2 = Sign(kp2.prvKeyObj, ct2bytes)
        let r2 = VerifySign(kp1.pubKeyObj, s2, ct2bytes)
        expect(r1).toBeFalsy();
        expect(r2).toBeFalsy();
    });
    test('不同的密钥对相同内容的签名验证不应通过', () => {
        let s = Sign(kp1.prvKeyObj, ct1)
        let r = VerifySign(kp2.pubKeyObj, s, ct1)
        expect(r).toBeFalsy();
    });
    test('不同的密钥对不同内容的签名验证不应通过', () => {
        let s = Sign(kp1.prvKeyObj, ct1)
        let r = VerifySign(kp2.pubKeyObj, s, ct2)
        expect(r).toBeFalsy();
    });
    test('不同时刻对同一内容签名所得结果应不相同', () => {
        let r1 = Sign(kp1.prvKeyObj, ct1)
        let r2 = Sign(kp1.prvKeyObj, ct1)
        expect(r1 === r2).toBeFalsy()
    });
    test('对字符串进行签名得到的hex字符串形式签名结果,转为字节流应能被原字符串的字节流验证通过', () => {
        let sHex = Sign(prvk3pem, ct3)
        let sBytes = Buffer.from(sHex, 'hex')
        let r = VerifySign(pubk3pem, sBytes, ct3bytes)
        expect(r).toBeTruthy();
    });
    test('对字符串的字节流进行签名得到的字节流签名结果,转为hex字符串应能被原字符串验证通过', () => {
        let sBytes = Sign(prvk3pem, ct3bytes)
        let sHex = sBytes.toString('hex')
        let r = VerifySign(pubk3pem, sHex, ct3)
        expect(r).toBeTruthy();
    })
    test('使用特定哈希方法的签名算法的签名结果，不应被使用不同哈希方法的签名算法验证通过', () => {
        let s1 = Sign(prvk3pem, ct3, 'SHA256withECDSA')
        let r1_1 = VerifySign(pubk3pem, s1, ct3, 'SHA1withECDSA')
        let r1_2 = VerifySign(pubk3pem, s1, ct3, 'MD5withECDSA')
        let s2 = Sign(prvk3pem, ct3, 'RIPEMD160withECDSA')
        let r2_1 = VerifySign(pubk3pem, s2, ct3, 'SHA1withECDSA')
        let r2_2 = VerifySign(pubk3pem, s2, ct3, 'MD5withECDSA')
        expect(r1_1).toBeFalsy();
        expect(r1_2).toBeFalsy();
        expect(r2_1).toBeFalsy();
        expect(r2_2).toBeFalsy();
    })
});

describe('X509证书生成测试', () => {
    //发行者与拥有者密钥对生成
    let issuerKp 
    let subjectKp 
    //证书生成所需信息
    let serialNumber = 20180901
    let sigAlg = "SHA256withECDSA"
    let issuerDN = "/C=CN/CN=CA for RepChain Usage Test/O=ISCAS/OU=SDR/L=BeiJing"
    let subjectDN = "/C=US/CN=Dapp1 User1 Test/O=Fake Federal Reserve/OU=FFR/L=WS"
    let notBefore = "1535810998" 
    let notAfter = "1567267200" 
    
    let cert
    let certSelfSigned


    beforeAll(() => {
        issuerKp = CreateKeypair("EC", "secp256k1")
        subjectKp = CreateKeypair("EC", "secp256k1")
        cert = CreateCertificate(serialNumber, sigAlg, issuerDN, 
            subjectDN, notBefore, notAfter, subjectKp.pubKeyObj, issuerKp.prvKeyObj) 
        certSelfSigned = CreateSelfSignedCertificate(serialNumber, sigAlg, issuerDN, 
            notBefore, notAfter, subjectKp) 
    })

    test('使用签发者公钥验证生成的X509证书应能通过验证', () => {
        let isValid1 = VerifyCertificateSignature(cert, issuerKp.pubKeyObj)
        let isvalid2 = VerifyCertificateSignature(certSelfSigned, subjectKp.pubKeyObj)
        expect(isValid1).toBeTruthy()
        expect(isvalid2).toBeTruthy()
    })


})
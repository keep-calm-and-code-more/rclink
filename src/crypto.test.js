const Crypto = require("./crypto")
const GetHashVal = Crypto.GetHashVal
const CreateKeypair = Crypto.CreateKeypair
const GetKeyPEM = Crypto.GetKeyPEM
const ImportKey = Crypto.ImportKey
import {
    Sign,VerifySign,CreateCertificate,CreateSelfSignedCertificate,
    VerifyCertificateSignature,
    ImportCertificate} from './crypto'

describe('密码学哈希值生成测试', () => {
    //欲计算哈希值的数据
    const str2bch1 = "to be crypto hashed"
    const bytes2bch1 = Buffer.from(str2bch1)
    const str2bch2 = "hashed crypto be to"
    const bytes2bch2 = Buffer.from(str2bch2) 

    test('对给定数据计算哈希值，应获得字节流类型的哈希值', () => {
        let h1 = GetHashVal(str2bch1)
        let h2 = GetHashVal(bytes2bch2)
        expect(h1).toBeInstanceOf(Buffer)
        expect(h2).toBeInstanceOf(Buffer)
    })
    test('对相同数据使用相同哈希算法进行哈希值计算，获得的结果应相同', () => {
        let h1 = GetHashVal(str2bch1, 'sha1')
        let h2 = GetHashVal(str2bch1, 'sha1')
        expect(h1).toEqual(h2)
    })
    test('对相同数据使用不同哈希算法进行哈希值计算，获得的结果应不同', () => {
        let h1 = GetHashVal(str2bch1, 'MD5')
        let h2 = GetHashVal(str2bch1, 'RIPEMD160')
        expect(h1).not.toEqual(h2)
    })
    test('对不同数据使用相同哈希算法进行哈希值计算，获得的结果应不同', () => {
        let h1 = GetHashVal(str2bch1, 'sha256')
        let h2 = GetHashVal(str2bch2, 'sha256')
        expect(h1).not.toEqual(h2)
    })
    test('对不同数据使用不同哈希算法进行哈希值计算，获得的结果应不同', () => {
        let h1 = GetHashVal(str2bch1, 'sha256')
        let h2 = GetHashVal(str2bch2, 'MD4')
        expect(h1).not.toEqual(h2)
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

    let kp1EncryptedPrvKeyPEM
    let pass

    beforeAll(() => {
        kp1 = CreateKeypair("EC", "secp256r1") 
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

        pass = '1234567890'
        kp1EncryptedPrvKeyPEM = GetKeyPEM(kp1.prvKeyObj, pass)

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
    test('私钥的加密pem格式信息与未加密pem格式信息应不同', () => {
        expect(kp1EncryptedPrvKeyPEM).not.toBe(kp1PrvKeyPEM)
    })
    test('使用私钥的加密pem格式信息导入生成的私钥对象，应与原私钥对象相同', () => {
        const kp1ImportedPrvKeyObj = ImportKey(kp1EncryptedPrvKeyPEM, pass)
        expect(GetKeyPEM(kp1ImportedPrvKeyObj)).toBe(kp1PrvKeyPEM)
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
    let alg = 'SHA1'

    //使用PEM格式密钥信息
    const prvk3pem = "-----BEGIN PRIVATE KEY-----\nMIGNAgEAMBAGByqGSM49AgEGBSuBBAAKBHYwdAIBAQQgOUm2PF8apyaK1bXjKH5j\njCld/I6ExpefemRGsS0C4+WgBwYFK4EEAAqhRANCAAT6VLE/eF9+sK1ROn8n6x7h\nKsBxehW42qf1IB8quBn5OrQD3x2H4yZVDwPgcEUCjH8PcFgswdtbo8JL/7f66yEC\n-----END PRIVATE KEY-----"
    const pubk3pem = "-----BEGIN PUBLIC KEY-----\nMFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAE+lSxP3hffrCtUTp/J+se4SrAcXoVuNqn\n9SAfKrgZ+Tq0A98dh+MmVQ8D4HBFAox/D3BYLMHbW6PCS/+3+ushAg==\n-----END PUBLIC KEY-----"

    //Sign
    test('对数据进行签名，应获得字节流格式的签名结果', () => {
        let s1 = Sign(kp1.prvKeyObj, ct1, alg)
        let s2 = Sign(kp2.prvKeyObj, ct2, alg)
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
    test('对字符串进行签名得到的签名结果,应能被原字符串的字节流验证通过', () => {
        let s = Sign(prvk3pem, ct3)
        let r = VerifySign(pubk3pem, s, ct3bytes)
        expect(r).toBeTruthy();
    });
    test('对字符串的字节流进行签名得到的签名结果,应能被原字符串验证通过', () => {
        let s = Sign(prvk3pem, ct3bytes)
        let r = VerifySign(pubk3pem, s, ct3)
        expect(r).toBeTruthy();
    })
    test('使用特定哈希方法的签名算法的签名结果，不应被使用不同哈希方法的签名算法验证通过', () => {
        let s1 = Sign(prvk3pem, ct3, 'SHA256')
        let r1_1 = VerifySign(pubk3pem, s1, ct3, 'SHA1')
        let r1_2 = VerifySign(pubk3pem, s1, ct3, 'MD5')
        let s2 = Sign(prvk3pem, ct3, 'SHA1')
        let r2_1 = VerifySign(pubk3pem, s2, ct3, 'SHA256')
        let r2_2 = VerifySign(pubk3pem, s2, ct3, 'MD4')
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
    let notBefore = 1535810998
    let notAfter = 1567267200
    
    let certPEM
    let certSelfSignedPEM

    beforeAll(() => {
        issuerKp = CreateKeypair("EC", "secp256k1")
        subjectKp = CreateKeypair("EC", "secp256k1")
        certPEM = CreateCertificate(serialNumber, sigAlg, issuerDN, 
            subjectDN, notBefore, notAfter, subjectKp.pubKeyObj, issuerKp.prvKeyObj) 
        certSelfSignedPEM = CreateSelfSignedCertificate(serialNumber, sigAlg, issuerDN, 
            notBefore, notAfter, subjectKp) 
    })

    test('使用签发者公钥验证生成的X509证书，应能通过验证', () => {
        let isValid1 = VerifyCertificateSignature(certPEM, issuerKp.pubKeyObj)
        let isvalid2 = VerifyCertificateSignature(certSelfSignedPEM, subjectKp.pubKeyObj)
        expect(isValid1).toBeTruthy()
        expect(isvalid2).toBeTruthy()

    })

    test('导入PEM格式证书得到的公钥对象与导入PEM格式证书得到的X509证书对象，应能互相印证', () => {
        const pubKeyObj = ImportKey(certPEM)
        const x509 = ImportCertificate(certPEM)
        expect(GetKeyPEM(x509.getPublicKey())).toBe(GetKeyPEM(pubKeyObj))
    })

    test('导入PEM格式证书得到的X509证书对象，可以返回unix时间戳形式的证书有效期', () => {
        const x509 = ImportCertificate(certPEM);
        //expect(x509.getNotBeforeUnixTimestamp()).toBe(notBefore);
        expect(x509.getNotAfterUnixTimestamp()).toBe(notAfter);
    })
})
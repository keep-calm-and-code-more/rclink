const {Transaction} = require('../src/transaction');
const {CreateKeypair} = require('../src/crypto');
const {GetKeyPEM, ImportKey} = require('../src/crypto');

describe('测试交易生成功能', () => {
    let t
    let kp1, kp2

    beforeAll(async (done) => {
        kp1 = CreateKeypair("EC", "secp256k1") 
        kp2 = CreateKeypair("EC", "secp256k1")
        await Transaction.setTxMsgType()
        t = new Transaction({type: 2, pubKeyPEM: GetKeyPEM(kp1.pubKeyObj), name: "nnnnn", 
            function: "function", args: ["123", "456"]})
        t.createSignedTransaction(kp1.prvKeyObj, "ecdsa-with-SHA1")
        done()
    }) 

    test('使用某私钥生成的签名交易信息，使用相应的公钥验证应能通过', () => {
        let isValid = t.verifySignedTransaction(kp1.pubKeyObj, "ecdsa-with-SHA1")
        expect(isValid).toBeTruthy()
    });
    test('使用某私钥生成的签名交易信息，使用非对应公钥验证不应通过', () => {
        let isValid = t.verifySignedTransaction(kp2.pubKeyObj, "ecdsa-with-SHA1")
        expect(isValid).toBeFalsy()
    });
    test('使用某加密pem格式私钥，输入正确密码生成的签名交易信息，使用相应公钥验证应能通过', () => {
        t = new Transaction({type: 2, pubKeyPEM: GetKeyPEM(kp1.pubKeyObj), name: "xxxxx", function: "function", args:["123", "456"]});
        t.createSignedTransaction(GetKeyPEM(kp1.prvKeyObj, "123"), "ecdsa-with-SHA1", "123");
        expect(t.verifySignedTransaction(kp1.pubKeyObj, "ecdsa-with-SHA1")).toBeTruthy();
    });
    test('使用某加密pem格式私钥生成签名交易信息，输入密码错误时，应该抛出异常', () => {
        t = new Transaction({type: 2, pubKeyPEM: GetKeyPEM(kp1.pubKeyObj), name: "yyyyy", function: "function", args: ["123", "456"]});
        expect(() => {
            t.createSignedTransaction(GetKeyPEM(kp1.prvKeyObj, "123"), "ecdsa-with-SHA1", "456");
        }).toThrow('提供的私钥信息无效或解密密码无效');
        expect(() => {
            t.createSignedTransaction(GetKeyPEM(kp1.prvKeyObj, "123"), "ecdsa-with-SHA1");
        }).toThrow('提供的私钥信息无效或解密密码无效');
    });
    test('使用RepChain节点公钥生成未签名交易', () => {
        let tra = new Transaction({type: 2, pubKeyPEM: `-----BEGIN PUBLIC KEY-----
                    MFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAE+lSxP3hffrCtUTp/J+se4SrAcXoVuNqn
                    9SAfKrgZ+Tq0A98dh+MmVQ8D4HBFAox/D3BYLMHbW6PCS/+3+ushAg==
                    -----END PUBLIC KEY-----`, 
                    name: "xxxxx", function: "sd", args: ["123", "456"]});
        expect(tra.getTxMsg().cert.toString()).toBe("1Luv5vq4v1CRkTN98YMhqQV1F18nGv11gX");

    });
    test('使用pem格式密钥对生成签名交易', () => {
        const prvkpem = "-----BEGIN PRIVATE KEY-----\nMIGNAgEAMBAGByqGSM49AgEGBSuBBAAKBHYwdAIBAQQgOUm2PF8apyaK1bXjKH5j\njCld/I6ExpefemRGsS0C4+WgBwYFK4EEAAqhRANCAAT6VLE/eF9+sK1ROn8n6x7h\nKsBxehW42qf1IB8quBn5OrQD3x2H4yZVDwPgcEUCjH8PcFgswdtbo8JL/7f66yEC\n-----END PRIVATE KEY-----"
        let tra = new Transaction({type: 2, pubKeyPEM: `-----BEGIN PUBLIC KEY-----
                    MFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAE+lSxP3hffrCtUTp/J+se4SrAcXoVuNqn
                    9SAfKrgZ+Tq0A98dh+MmVQ8D4HBFAox/D3BYLMHbW6PCS/+3+ushAg==
                    -----END PUBLIC KEY-----`, 
                    name: "xxxxx", function: "sd", args: ["123", "456"]});
        tra.createSignedTransaction(prvkpem, 'ecdsa-with-SHA1');
        console.log("");
    });
})
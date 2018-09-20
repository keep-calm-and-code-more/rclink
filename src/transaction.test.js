const Transaction = require('./transaction').default
const CreateKeypair = require('./crypto').CreateKeypair
const GetHashVal = require('./crypto').GetHashVal

describe('测试交易生成功能', () => {
    let t
    let kp1, kp2

    beforeAll(async (done) => {
        kp1 = CreateKeypair("EC", "secp256k1") 
        kp2 = CreateKeypair("EC", "secp256k1")
        await Transaction.setTxMsgType()
        t = new Transaction({type: 2, name: "nnnnn", 
            function: "function", args: ["123", "456"]})
        t.createSignedTransaction(kp1.prvKeyObj, "ecdsa-with-SHA1")
        done()
    }) 

    test('使用某私钥生成的签名交易信息，使用相应的公钥验证应能通过', () => {
        let isValid = t.verifySignedTransaction(kp1.pubKeyObj, "ecdsa-with-SHA1")
        expect(isValid).toBeTruthy()
    })
    test('使用某私钥生成的签名交易信息，使用非对应公钥验证不应通过', () => {
        let isValid = t.verifySignedTransaction(kp2.pubKeyObj, "ecdsa-with-SHA1")
        expect(isValid).toBeFalsy()
    })
})
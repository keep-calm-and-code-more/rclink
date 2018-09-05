const Transaction = require('./transaction')
const CreateKeypair = require('./crypto').CreateKeypair

describe('测试交易生成功能', () => {

    let t
    let tSignedBuffer
    let kp1, kp2

    beforeAll(async () => {
        kp1 = CreateKeypair("EC", "secp256k1") 
        kp2 = CreateKeypair("EC", "secp256k1")
        t = new Transaction({type: 2, name: "nnnnn", 
            function: "function", args: ["123", "456"]})
        tSignedBuffer = await t.createSignedTransaction(kp1.prvKeyObj, "SHA1withECDSA")
    }) 

    test('使用某私钥生成的签名交易信息，使用相应的公钥验证应能通过', async () => {
        let isValid = await t.verifySignedTransaction(tSignedBuffer, kp1.pubKeyObj, "SHA1withECDSA")
        expect(isValid).toBeTruthy()
    })
    test('使用某私钥生成的签名交易信息，使用非对应公钥验证不应通过', async () => {
        let isValid = await t.verifySignedTransaction(tSignedBuffer, kp2.pubKeyObj, "SHA1withECDSA")
        expect(isValid).toBeFalsy()
    })
})
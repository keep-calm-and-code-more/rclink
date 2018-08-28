import {Sum, GetHashBytes,Sign,SignBytes,VerifySign,CreateKeyPair} from './crypto'
import {jsRsaSign, KEYUTIL} from 'jsrsasign';


describe('签名及签名验证测试', () => {
    //生成密钥对
    const kp1 = CreateKeyPair("EC", "secp256r1");
    const kp2 = CreateKeyPair("EC", "secp256r1");
    const ct1 = 'hello repchain1'
    const ct2 = 'hello repchain2'

    let alg = 'SHA1withECDSA'
    let s11 = Sign(alg, kp1.prvKeyObj, ct1);
    let s11_1 = Sign(alg, kp1.prvKeyObj, ct1);
    
    let s12 = Sign(alg, kp1.prvKeyObj, ct2);

    /*
    const kp3 = CreateKeyPair("EC", "secp256k1")
    const prvk3pem = "-----BEGIN PRIVATE KEY-----\nMIGNAgEAMBAGByqGSM49AgEGBSuBBAAKBHYwdAIBAQQgOUm2PF8apyaK1bXjKH5j\njCld/I6ExpefemRGsS0C4+WgBwYFK4EEAAqhRANCAAT6VLE/eF9+sK1ROn8n6x7h\nKsBxehW42qf1IB8quBn5OrQD3x2H4yZVDwPgcEUCjH8PcFgswdtbo8JL/7f66yEC\n-----END PRIVATE KEY-----"
    const ct3 = "hello"
    const ct3bytes = new Buffer(ct3)
    let sl3_1 = SignBytes("ecdsa-with-SHA1", prvk3pem, ct3bytes)
    let sl3_1s = sl3_1.toString()
    */

// 仅应用到当前 describe 块中的测试
    beforeEach(() => {
        
        
    });

    test('同一对密钥对相同内容的签名验证可以通过', () => {
        let r = VerifySign(alg,kp1.pubKeyObj, s11, ct1 )
        expect(r).toBeTruthy();
    });
    test('同一对密钥对不同内容的签名验证不应通过', () => {
        let r = VerifySign(alg,kp1.pubKeyObj, s11, ct2 )
        expect(r).toBeFalsy();
    });
    test('不同的密钥对相同内容的签名验证不应通过', () => {
        let r = VerifySign(alg,kp2.pubKeyObj, s11, ct1 )
        expect(r).toBeFalsy();
    });
    test('对同一内容签名所得结果应相同?', () => {
        let r1 = Sign(alg, kp1.prvKeyObj, "")
        let r2 = Sign(alg, kp1.prvKeyObj, "")
        expect(r1).toBe(r2)
    })
    test('同一对密钥对相同内容的签名验证应通过', () => {
        let r = VerifySign(alg,kp1.pubKeyObj, s11_1, ct1 )
        expect(r).toBeTruthy();
    });
  });
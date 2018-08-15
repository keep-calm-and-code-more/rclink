import {Sum,Sign,verifySign,CreateKeyPair} from './crypto'
import {jsRsaSign, KEYUTIL} from 'jsrsasign';


describe('从jks获取密钥进行签名', () => {
    const kp1 = CreateKeyPair("EC", "secp256r1");
    const kp2 = CreateKeyPair("EC", "secp256r1");
    const ct1 = 'hello repchain1'
    const ct2 = 'hello repchain2'

    let alg = 'SHA1withECDSA';
    let s11 = Sign(alg, kp1.prvKeyObj, ct1);
    let s12 = Sign(alg, kp1.prvKeyObj, ct2);
    //let s21 = Sign(alg, kp2.prvKeyObj, ct1);
    //let s22 = Sign(alg, kp2.prvKeyObj, ct2);

// 仅应用到当前 describe 块中的测试
    beforeEach(() => {
        //生成密钥对
        
    });

    test('同一对密钥对相同内容的签名验证可以通过', () => {
        let r = verifySign(alg,kp1.pubKeyObj, s11, ct1 )
        expect(r).toBeTruthy();
    });
    test('同一对密钥对不同内容的签名验证不应通过', () => {
        let r = verifySign(alg,kp1.pubKeyObj, s11, ct2 )
        expect(r).toBeFalsy();
    });
    test('不同的密钥对相同内容的签名验证不应通过', () => {
        let r = verifySign(alg,kp2.pubKeyObj, s11, ct1 )
        expect(r).toBeFalsy();
    });

  });
  

import {Sum,Sign,CreateKeyPair} from './crypto'
import {jsRsaSign, KEYUTIL} from 'jsrsasign';

test('adds 1 + 2 to equal 3', () => {
    expect(Sum(1, 2)).toBe(3);
});

describe('从jks获取密钥进行签名', () => {
    const pwd = 'pwd1234';
    const uid = '13801381234';
    const prv_key_pem_encrypted = CreateKeyPair(pwd, uid);
    let prv_key_obj = KEYUTIL.getKey(prv_key_pem_encrypted, pwd);
    let prv_key_pem = KEYUTIL.getPEM(prv_key_obj, 'PKCS8PRV');
    let buf = Buffer.from('content to be signed----');
// 仅应用到当前 describe 块中的测试
    beforeEach(() => {
        //生成密钥对
        
    });
  
    test('获取密钥对', () => {
        let signature = Sign('ecdsa-with-SHA1', prv_key_pem, buf);
    });
  });
  

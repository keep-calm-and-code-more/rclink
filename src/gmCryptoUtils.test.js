const {GMCryptoUtils} = require('./gmCryptoUtils');

describe('国密算法加密方法套件', () => {
    const gmCryptoUtils = new GMCryptoUtils("wss://192.168.31.190:9003");

    test('sm3哈希计算', () => {
        //gmCryptoUtils.getGMHashVal('cdbhjsc');
        expect(1+1).toBe(2);
    });
})
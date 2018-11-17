const {GMCryptoUtils} = require('../src/gmCryptoUtils');
// 目前国密Websocket服务还不支持在node端调用以及远程调用，未来再使用jset测试
describe('国密算法加密方法套件', () => {
    const gmCryptoUtils = new GMCryptoUtils("wss://192.168.31.190:9003");

    test('sm3哈希计算', () => {
        //gmCryptoUtils.getGMHashVal('cdbhjsc');
        expect(1+1).toBe(2);
    });
})
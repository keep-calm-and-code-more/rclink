const RestAPI = require('./rest');
const protobuf = require("protobufjs");
const Transaction = require("./transaction")
const CreateKeypair = require("./crypto").CreateKeypair

describe('Restful API验证', () => {
    var ra;
    var Message,Block;
    beforeAll(function(done) {
       ra = new RestAPI('http://localhost:8081/')            
       protobuf.load("protos/peer.proto", function(err, root) {
        if (err){
            throw err;
        }
        Message = root.lookupType("rep.protos.Event");
        Block = root.lookupType("rep.protos.Block");
        done();
    });
});

    test('GET chaininfo 区块高度和交易总数应该大于0', (done) => {
        ra.chaininfo().then(ci=>{
            expect(parseInt(ci.result.height)).toBeGreaterThan(0);
            expect(parseInt(ci.result.totalTransactions)).toBeGreaterThan(0);
            done();
        });       
    });
    test('GET block 根据区块高度可以获取区块内容', (done) => {
        ra.block(2).then(blk=>{
            expect(blk.result.transactions.length).toBeGreaterThan(0);
            done();
        });
    });
    test('json方式获得的区块内容与字节流反序列化获得区块内容一致', (done) => {
        async function awaitDemo() {
            var h;
            var blk1,blk2;
            await ra.chaininfo().then(ci=>{h = parseInt(ci.result.height)});
            await ra.block(h).then(blk=>{blk1 = blk.result});
            await ra.blockStream(h).then(res=>{
                const buf = res;
                blk2 = Block.decode(buf);
            });
            expect(blk1.previousBlockHash).toBe(blk2.previousBlockHash.toString('base64'));
            expect(blk1.transactions.length).toBe(blk2.transactions.length)
            done();
       }  
       awaitDemo();      
    });
    test('以hex格式字符串形式向RepChain节点提交交易数据，应能返回接收信息验签通过', async (done) => {
        let tx = new Transaction({
            type: 2,
            name: "hhhhhh",
            function: "ffffff",
            args: ["as", "sd"],
            accountAddr: "1MH9xedPTkWThJUgT8ZYehiGCM7bEZTVGN", 
        })
        const prvKeyPEM = "-----BEGIN PRIVATE KEY-----\nMIGNAgEAMBAGByqGSM49AgEGBSuBBAAKBHYwdAIBAQQgOUm2PF8apyaK1bXjKH5j\njCld/I6ExpefemRGsS0C4+WgBwYFK4EEAAqhRANCAAT6VLE/eF9+sK1ROn8n6x7h\nKsBxehW42qf1IB8quBn5OrQD3x2H4yZVDwPgcEUCjH8PcFgswdtbo8JL/7f66yEC\n-----END PRIVATE KEY-----"
        const pubKeyPEM = "-----BEGIN PUBLIC KEY-----\nMFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAE+lSxP3hffrCtUTp/J+se4SrAcXoVuNqn\n9SAfKrgZ+Tq0A98dh+MmVQ8D4HBFAox/D3BYLMHbW6PCS/+3+ushAg==\n-----END PUBLIC KEY-----"
        let txSignedBuffer = await tx.createSignedTransaction(prvKeyPEM, "SHA1")
        let isValid = await tx.verifySignedTransaction(txSignedBuffer, pubKeyPEM, "SHA1")
        expect(isValid).toBeTruthy()
        let result = await ra.sendTX(txSignedBuffer.toString('hex'))
        console.log(result)
        expect(result).toBeDefined()
        done()
    })
  });
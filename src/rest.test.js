const RestAPI = require('./rest').default;
const protobuf = require("protobufjs");
const Transaction = require("./transaction").default
const CreateKeypair = require("./crypto").CreateKeypair

describe('Restful API验证', () => {
    var ra;
    var Message,Block;
    let tx
    let prvKeyPEM, pubKeyPEM
    let txSignedBuffer 

    beforeAll(async (done) => {
       ra = new RestAPI('http://localhost:8081/')            
       protobuf.load("protos/peer.proto", function(err, root) {
        if (err){
            throw err;
        }
        Message = root.lookupType("rep.protos.Event");
        Block = root.lookupType("rep.protos.Block");
        done();
        });

        await Transaction.setTxMsgType()
        tx = new Transaction({
            type: 2,
            name: "0bfbe2faf858dd495e712fb0f897dd66082f06b879fa21a80fcc2acbc199b8d7",
            function: "put_proof",
            args: ["{\"testKey1\":\"testVal\"}"],
            accountAddr: "1Luv5vq4v1CRkTN98YMhqQV1F18nGv11gX", 
        })
        prvKeyPEM = "-----BEGIN PRIVATE KEY-----\nMIGNAgEAMBAGByqGSM49AgEGBSuBBAAKBHYwdAIBAQQgOUm2PF8apyaK1bXjKH5j\njCld/I6ExpefemRGsS0C4+WgBwYFK4EEAAqhRANCAAT6VLE/eF9+sK1ROn8n6x7h\nKsBxehW42qf1IB8quBn5OrQD3x2H4yZVDwPgcEUCjH8PcFgswdtbo8JL/7f66yEC\n-----END PRIVATE KEY-----"
        //pubKeyPEM = "-----BEGIN PUBLIC KEY-----\nMFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAE+lSxP3hffrCtUTp/J+se4SrAcXoVuNqn\n9SAfKrgZ+Tq0A98dh+MmVQ8D4HBFAox/D3BYLMHbW6PCS/+3+ushAg==\n-----END PUBLIC KEY-----"
        txSignedBuffer = tx.createSignedTransaction(prvKeyPEM, "ecdsa-with-SHA1")
        done()
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
    test('以hex格式字符串向RepChain节点提交交易数据，应能返回接收信息并验签通过', async () => {
        let result = await ra.sendTX(txSignedBuffer.toString('hex'))
        //console.log(result)
        expect(result.txid).toBe(tx.getTxMsg().txid)
        expect(/^验证签名出错/.test(result.err)).toBeFalsy()
    })
    test('以字节流格式向RepChain节点提交交易数据，应能返回接收信息并验证通过', async () => {
        let result = await ra.sendTX(txSignedBuffer)
        expect(result.txid).toBe(tx.getTxMsg().txid)
        expect(/^验证签名出错/.test(result.err)).toBeFalsy()
    })
  });
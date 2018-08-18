import RestAPI from './rest';
const protobuf = require("protobufjs");

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

  });
  

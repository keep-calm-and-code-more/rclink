import RestAPI from './rest';


describe('Restful API验证', () => {
    var ra;
    beforeAll(function() {
       ra = new RestAPI('http://localhost:8081/')            
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
    test('先获取区块高度,再获取区块内容的异步调度测试', (done) => {
        async function awaitDemo() {
            var h;
            var tlen;
            await ra.chaininfo().then(ci=>{h = parseInt(ci.result.height)});
            await ra.block(h).then(blk=>{tlen = blk.result.transactions.length});
            console.log('h:'+h +'  txLen:'+tlen);
            expect(tlen).toBeGreaterThan(0);
            done();
       }  
       awaitDemo();      
    });

  });
  

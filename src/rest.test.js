import RestAPI from './rest';


describe('Restful API验证', () => {
    var ra;
    beforeAll(function() {
       ra = new RestAPI('http://localhost:8081/')            
    });

    test('GET chaininfo 区块高度和交易总数应该大于0', () => {
        ra.chaininfo().then(ci=>{
            expect(parseInt(ci.result.height)).toBeGreaterThan(0);
            expect(parseInt(ci.result.totalTransactions)).toBeGreaterThan(0);
        });       
    });
    test('GET block 根据区块高度可以获取区块内容', () => {
        ra.block(2).then(blk=>{
            expect(blk.result.transactions.length).toBeGreaterThan(0);
        });
        
    });

  });
  

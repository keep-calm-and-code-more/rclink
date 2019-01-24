// import protobuf from "protobufjs";
import { rep } from "../../protos/peer";
import RestAPI from "../../lib/rest";
import Transaction from "../../lib/transaction";

describe("Restful API验证", () => {
    let ra;
    // let Message;
    const { Block } = rep.protos;
    let tx1;
    let tx2;
    let prvKeyPEM;
    let pubKeyPEM;
    let txSignedBuffer1;
    let txSignedBuffer2;

    beforeAll(() => {
        ra = new RestAPI("http://localhost:8081/");
        
        prvKeyPEM = "-----BEGIN PRIVATE KEY-----\nMIGNAgEAMBAGByqGSM49AgEGBSuBBAAKBHYwdAIBAQQgOUm2PF8apyaK1bXjKH5j\njCld/I6ExpefemRGsS0C4+WgBwYFK4EEAAqhRANCAAT6VLE/eF9+sK1ROn8n6x7h\nKsBxehW42qf1IB8quBn5OrQD3x2H4yZVDwPgcEUCjH8PcFgswdtbo8JL/7f66yEC\n-----END PRIVATE KEY-----";
        pubKeyPEM = "-----BEGIN PUBLIC KEY-----\nMFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAE+lSxP3hffrCtUTp/J+se4SrAcXoVuNqn\n9SAfKrgZ+Tq0A98dh+MmVQ8D4HBFAox/D3BYLMHbW6PCS/+3+ushAg==\n-----END PUBLIC KEY-----";

        tx1 = new Transaction({
            type: 2,
            name: "6605cef0dd8fa68492a2b0c9d27bb5aff41153f70938d8605d5999540692ae71",
            function: "set",
            args: ["{\"testKey1\":1}"],
            pubKeyPEM,
        });
        txSignedBuffer1 = tx1.createSignedTransaction(prvKeyPEM, "ecdsa-with-SHA1");

        tx2 = new Transaction({
            type: 2,
            name: "6605cef0dd8fa68492a2b0c9d27bb5aff41153f70938d8605d5999540692ae71",
            function: "set",
            args: ["{\"testKey2\":2}"],
            pubKeyPEM,
        });
        txSignedBuffer2 = tx2.createSignedTransaction(prvKeyPEM, "ecdsa-with-SHA1");
    });

    it("GET chaininfo 区块高度和交易总数应该大于0", (done) => {
        ra.chainInfo().then((ci) => {
            expect(parseInt(ci.result.height, 10)).toBeGreaterThan(0);
            expect(parseInt(ci.result.totalTransactions, 10)).toBeGreaterThan(0);
            done();
        });
    });
    it("GET block 根据区块高度可以获取区块内容", (done) => {
        ra.block(2).then((blk) => {
            expect(blk.result.transactions.length).toBeGreaterThan(0);
            done();
        });
    });
    it("json方式获得的区块内容与字节流反序列化获得区块内容一致", (done) => {
        async function awaitDemo() {
            let h;
            let blk1; let
                blk2;
            await ra.chainInfo().then((ci) => { h = parseInt(ci.result.height, 10); });
            await ra.block(h).then((blk) => { blk1 = blk.result; });
            await ra.blockStream(h).then((res) => {
                const buf = res;
                blk2 = Block.decode(buf);
            });
            expect(blk1.previousBlockHash).toEqual(Buffer.from(blk2.previousBlockHash).toString("base64"));
            expect(blk1.transactions.length).toBe(blk2.transactions.length);
            done();
        }
        awaitDemo();
    });
    it("以hex格式字符串向RepChain节点提交交易数据，应能返回接收信息并验签通过", async () => {
        const result = await ra.sendTX(txSignedBuffer1.toString("hex"));
        // console.log(result);
        expect(result.txid).toBe(tx1.getTxMsg().txid);
        expect(/^验证签名出错/.test(result.err)).toBeFalsy();
    });
    it("以字节流格式向RepChain节点提交交易数据，应能返回接收信息并验证通过", async () => {
        const result = await ra.sendTX(txSignedBuffer2);
        // console.log(result);
        expect(result.txid).toBe(tx2.getTxMsg().txid);
        expect(/^验证签名出错/.test(result.err)).toBeFalsy();
    });
});

import validator from "validator";
import _ from "lodash";
import { rep } from "../protos/peer";
import RestAPI from "../src/rest";
import Transaction from "../src/transaction";

describe("Restful API验证", () => {
    const ra = new RestAPI("http://localhost:8081");

    const { Block } = rep.protos;
        
    const prvKeyPEM = "-----BEGIN PRIVATE KEY-----\nMIGNAgEAMBAGByqGSM49AgEGBSuBBAAKBHYwdAIBAQQgOUm2PF8apyaK1bXjKH5j\njCld/I6ExpefemRGsS0C4+WgBwYFK4EEAAqhRANCAAT6VLE/eF9+sK1ROn8n6x7h\nKsBxehW42qf1IB8quBn5OrQD3x2H4yZVDwPgcEUCjH8PcFgswdtbo8JL/7f66yEC\n-----END PRIVATE KEY-----";
    const pubKeyPEM = "-----BEGIN PUBLIC KEY-----\nMFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAE+lSxP3hffrCtUTp/J+se4SrAcXoVuNqn\n9SAfKrgZ+Tq0A98dh+MmVQ8D4HBFAox/D3BYLMHbW6PCS/+3+ushAg==\n-----END PUBLIC KEY-----";
    const txToInvokeConsArgs = {
        type: "CHAINCODE_INVOKE",
        chaincodeName: "ContractAssetsTPL",
        chaincodeVersion: 2,
        chaincodeInvokeParams: {
            chaincodeFunction: "transfer",
            chaincodeFunctionArgs: [`{
                "from" : "121000005l35120456",
                "to" : "12110107bi45jh675g",
                "amount" : 5
            }`],
        },
    };

    const tx1 = new Transaction(txToInvokeConsArgs);
    const txSignedBuffer1 = tx1.sign({
        prvKey: prvKeyPEM,
        pubKey: pubKeyPEM,
        alg: "ecdsa-with-SHA1",
        creditCode: "121000005l35120456",
        certName: "node1",
    });

    const tx2 = new Transaction(txToInvokeConsArgs);
    const txSignedBuffer2 = tx2.sign({
        prvKey: prvKeyPEM,
        pubKey: pubKeyPEM,
        alg: "ecdsa-with-SHA1",
        creditCode: "121000005l35120456",
        certName: "node1",
    });

    describe("chainInfo相关方法测试", () => {
        test("使用chainInfo方法, 应能得到区块链的当前概要信息", (done) => {
            ra.chainInfo().then((ci) => {
                expect(ci.height).toBeGreaterThan(0);
                expect(ci.totalTransactions).toBeGreaterThan(0);
                expect(validator.isBase64(ci.currentBlockHash)).toBeTruthy();
                expect(validator.isBase64(ci.previousBlockHash)).toBeTruthy();
                expect(validator.isBase64(ci.currentStateHash)).toBeTruthy();
                done();
            });
        });
        test("使用chainHeight方法，应能得到区块链的最新区块高度", (done) => {
            ra.chainHeight().then((height) => {
                ra.chainInfo().then((ci) => {
                    expect(height).toBe(ci.height);
                    done();
                });
            });
        });
        test("使用chainCurrentBlockHash方法，应能得到区块链的最新区块哈希值", (done) => {
            ra.chainCurrentBlockHash().then((curHash) => {
                ra.chainInfo().then((ci) => {
                    expect(curHash).toBe(ci.currentBlockHash);
                    done();
                });
            });
        });
        test("使用chainPreviousBlockHash方法，应能得到区块链的最新区块的父区块哈希值", (done) => {
            ra.chainPreviousBlockHash().then((prevHash) => {
                ra.chainInfo().then((ci) => {
                    expect(prevHash).toBe(ci.previousBlockHash);
                    done();
                });
            });
        });
        test("使用chainCurrentStateHash方法，应能得到区块链的最新世界状态哈希值", (done) => {
            ra.chainCurrentStateHash().then((curStateHash) => {
                ra.chainInfo().then((ci) => {
                    expect(curStateHash).toBe(ci.currentStateHash);
                    done();
                });
            });
        });
        test("使用chainTotalTransactions方法，应能得到区块链的最新交易总量", (done) => {
            ra.chainTotalTransactions().then((totalTransactions) => {
                ra.chainInfo().then((ci) => {
                    expect(totalTransactions).toBe(ci.totalTransactions);
                    done();
                });
            });
        });
    });

    describe("block相关方法测试", () => {
        test("使用block方法, 根据区块高度可以获取json格式的区块数据", async () => {
            // default blockFormat
            await ra.block(1).then((blk) => {
                expect(_.isPlainObject(blk)).toBeTruthy();
                expect(blk.transactions.length).toBeGreaterThan(0);
            });
            // JSON blockFormat
            await ra.block(1, "JSON").then((blk) => {
                expect(_.isPlainObject(blk)).toBeTruthy();
                expect(blk.transactions.length).toBeGreaterThan(0);
            });
        });
        test("使用block方法, 根据区块高度可以获取stream格式的区块数据", (done) => {
            ra.block(1, "STREAM").then((blk) => {
                expect(_.isBuffer(blk)).toBeTruthy();
                const blkObj = Block.decode(blk);
                expect(blkObj.transactions.length).toBeGreaterThan(0);
                done();
            });
        });
        test("使用block方法, 根据区块哈希值可以获取json格式的区块数据", async () => {
            const blkHash = await ra.block(1).then(blk => blk.hashOfBlock);
            const blkHashBuffer = Buffer.from(blkHash, "base64");
            // string hash and default blockFormat
            await ra.block(blkHash).then((blk) => {
                expect(_.isPlainObject(blk)).toBeTruthy();
                expect(blk.transactions.length).toBeGreaterThan(0);
            });
            // string hash and JSON blockFormat
            await ra.block(blkHash, "JSON").then((blk) => {
                expect(_.isPlainObject(blk)).toBeTruthy();
                expect(blk.transactions.length).toBeGreaterThan(0);
            });
            // buffer hash and default blockFormat
            await ra.block(blkHashBuffer).then((blk) => {
                expect(_.isPlainObject(blk)).toBeTruthy();
                expect(blk.transactions.length).toBeGreaterThan(0);
            });
            // buffer hash and JSON blockFormat
            await ra.block(blkHashBuffer, "JSON").then((blk) => {
                expect(_.isPlainObject(blk)).toBeTruthy();
                expect(blk.transactions.length).toBeGreaterThan(0);
            });
        });
        // 404 yet
        // test("使用block方法, 根据区块哈希值可以获取stream格式的区块数据", async () => {
        //     const blkHash = await ra.block(1).then(blk => blk.hashOfBlock);
        //     const blkHashBuffer = Buffer.from(blkHash, "base64");
        //     await ra.block(blkHash, "STREAM").then((blk) => {
        //         expect(_.isBuffer(blk)).toBeTruthy();
        //         const blkObj = Block.decode(blk);
        //         expect(blkObj.transactions.length).toBeGreaterThan(0);
        //     });
        //     await ra.block(blkHashBuffer, "STREAM").then((blk) => {
        //         expect(_.isBuffer(blk)).toBeTruthy();
        //         const blkObj = Block.decode(blk);
        //         expect(blkObj.transactions.length).toBeGreaterThan(0);
        //     });
        // });
    });

    describe("transaction相关方法测试", () => {
        
    });
    // test("json方式获得的区块内容与字节流反序列化获得区块内容一致", (done) => {
    //     async function awaitDemo() {
    //         let h;
    //         let blk1; let
    //             blk2;
    //         await ra.chainInfo().then((ci) => { h = parseInt(ci.height, 10); });
    //         await ra.block(h).then((blk) => { blk1 = blk; });
    //         await ra.blockStream(h).then((res) => {
    //             const buf = res;
    //             blk2 = Block.decode(buf);
    //         });
    //         expect(blk1.previousBlockHash).toBe(blk2.previousBlockHash.toString("base64"));
    //         expect(blk1.transactions.length).toBe(blk2.transactions.length);
    //         done();
    //     }
    //     awaitDemo();
    // });
    // test("以hex格式字符串向RepChain节点提交交易数据，应能返回接收信息并验签通过", async () => {
    //     const result = await ra.sendTX(txSignedBuffer1.toString("hex"));
    //     // console.log(result);
    //     expect(result.txid).toBe(tx1.getTxMsg().txid);
    //     expect(/^验证签名出错/.test(result.err)).toBeFalsy();
    // });
    // test("以字节流格式向RepChain节点提交交易数据，应能返回接收信息并验证通过", async () => {
    //     const result = await ra.sendTX(txSignedBuffer2);
    //     // console.log(result);
    //     expect(result.txid).toBe(tx2.getTxMsg().txid);
    //     expect(/^验证签名出错/.test(result.err)).toBeFalsy();
    // });
});

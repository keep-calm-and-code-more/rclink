import validator from "validator";
import _ from "lodash";
import { rep } from "../protos/peer";
import RestAPI from "../src/rest";
import Transaction from "../src/transaction";
import { CreateKeypair } from "../src/crypto";
import { GetKeyPEM } from "../lib/crypto";

describe("Restful API验证", () => {
    const ra = new RestAPI("http://localhost:8081");

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
        const { Block } = rep.protos;
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
        test("使用block方法，通过相同区块id获取的json格式与stream格式区块数据应等价", async () => {
            const height = await ra.chainHeight(); 
            const blockJson = await ra.block(height);
            const blockStream = await ra.block(height, "STREAM");
            const blockObj = Block.decode(blockStream);
            expect(blockObj.hashOfBlock.toString("base64")).toBe(blockJson.hashOfBlock);
        });
    });

    describe("transaction相关方法测试", () => {
        const prvKeyPEM = `-----BEGIN PRIVATE KEY-----
            MIGNAgEAMBAGByqGSM49AgEGBSuBBAAKBHYwdAIBAQQgPtHT816wJBatnif8laVo
            yW0R5NqtMiMkmECOYEAIzSWgBwYFK4EEAAqhRANCAASlh+oDBPdwHEkpQT4/g4RX
            9ubP7jMM2QodiFtsnv+ObQ3dxfQN/S515ePssn3HjPCwfzR3S1KY4O9vFtH1Jql9
            -----END PRIVATE KEY-----`;
        const pubKeyPEM = `-----BEGIN PUBLIC KEY-----
            MFYwEAYHKoZIzj0CAQYFK4EEAAoDQgAEpYfqAwT3cBxJKUE+P4OEV/bmz+4zDNkK
            HYhbbJ7/jm0N3cX0Df0udeXj7LJ9x4zwsH80d0tSmODvbxbR9SapfQ==
            -----END PUBLIC KEY-----`;
        const txToInvokeConsArgs = {
            type: "CHAINCODE_INVOKE",
            chaincodeName: "ContractAssetsTPL",
            chaincodeVersion: 1,
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
        const kp = CreateKeypair();
        const txSignedBuffer2 = tx2.sign({
            prvKey: GetKeyPEM(kp.prvKeyObj),
            pubKey: GetKeyPEM(kp.prvKeyObj),
            alg: "ecdsa-with-SHA1",
            creditCode: "121000005l35120456",
            certName: "node1",
        });

        const tx3 = new Transaction(txToInvokeConsArgs);
        const txSignedBuffer3 = tx3.sign({
            prvKey: prvKeyPEM,
            pubKey: pubKeyPEM,
            alg: "ecdsa-with-SHA1",
            creditCode: "121000005l35120456",
            certName: "node1",
        });

        test.only("使用sendTransaction方法，以hex字符串形式提交正确的签名交易，应能返回成功信息", async () => {
            const result = await ra.sendTransaction(txSignedBuffer1.toString("hex"));
            console.log(result);
            expect(result.txid).toBe(tx1.getTxMsg().id);
            expect(result.err).toBeUndefined();
        });
        test.only("使用sendTransaction方法，以非hex编码的字符串形式提交交易，应返回交易解析错误信息", async () => {
            let result = await ra.sendTransaction(txSignedBuffer1.toString("base64"));
            expect(result.err).toMatch("transaction parser error");
            result = await ra.sendTransaction(txSignedBuffer1.toString("utf8"));
            expect(result.err).toMatch("transaction parser error");
        });
        test.only("使用sendTransaction方法，以hex字符串形式提交错误私钥签名的交易，应返回验签错误信息", async () => {
            const result = await ra.sendTransaction(txSignedBuffer2.toString("hex"));
            expect(result.err).toBe("验证签名出错");
        });
        test.only("使用sendTransaction方法，以二进制形式提交正确的签名交易，应能返回成功信息", async () => {
            const result = await ra.sendTransaction(txSignedBuffer3);
            console.log(result);
            expect(result.txid).toBe(tx3.getTxMsg().id);
            expect(result.err).toBeUndefined();
        });
        
        // test("以字节流格式向RepChain节点提交交易数据，应能返回接收信息并验证通过", async () => {
        //     const result = await ra.sendTX(txSignedBuffer2);
        //     // console.log(result);
        //     expect(result.txid).toBe(tx2.getTxMsg().txid);
        //     expect(/^验证签名出错/.test(result.err)).toBeFalsy();
        // });    
    });
});

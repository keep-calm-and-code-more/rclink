import testEnv from "./testEnvConfig";
import SHA1withECDSA from "../src/algorithmNames";

const rclink = testEnv === "production"
    ? require("../lib")
    : require("../src");

const { Transaction, Crypto } = rclink;
const { CreateKeypair, GetKeyPEM } = Crypto;

describe("测试交易生成功能", () => {
    const kp1 = CreateKeypair("EC", "secp256k1");
    const kp2 = CreateKeypair("EC", "secp256k1");
    const txToDeployConsArgs = {
        type: "CHAINCODE_DEPLOY",
        chaincodeName: "ContractAssetsTPL",
        chaincodeVersion: 2,
        chaincodeDeployParams: {
            timeout: 5000,
            codeLanguageType: "CODE_SCALA",
            legalProse: "fake-content",
            codePackage: "fake-content",
        },
    };
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
    
    const txToSetStateConsArgs = {
        type: "CHAINCODE_SET_STATE",
        chaincodeName: "ContractAssetsTPL",
        chaincodeVersion: 2,
        chaincodeSetStateParams: {
            state: false,
        },
    };
    const txToDeploy = new Transaction(txToDeployConsArgs);
    const txToInvoke = new Transaction(txToInvokeConsArgs);
    const txToSetState = new Transaction(txToSetStateConsArgs);
    const txSignedBytes = txToDeploy.sign({
        prvKey: GetKeyPEM(kp1.prvKeyObj),
        pubKey: GetKeyPEM(kp1.pubKeyObj),
        alg: SHA1withECDSA,
        creditCode: "121000005l35120456",
        certName: "node1",
    });
    txToInvoke.sign({
        prvKey: GetKeyPEM(kp1.prvKeyObj),
        pubKey: GetKeyPEM(kp1.pubKeyObj),
        alg: SHA1withECDSA,
        creditCode: "121000005l35120456",
        certName: "node1",
    });
    txToSetState.sign({
        prvKey: GetKeyPEM(kp1.prvKeyObj),
        pubKey: GetKeyPEM(kp1.pubKeyObj),
        alg: SHA1withECDSA,
        creditCode: "121000005l35120456",
        certName: "node1",
    });

    const signAlg = SHA1withECDSA;

    it("使用未加密私钥生成的签名交易信息，使用相应的公钥验证应能通过", () => {
        expect(txToDeploy.verifySignature(GetKeyPEM(kp1.pubKeyObj), signAlg)).toBeTruthy();
        expect(txToInvoke.verifySignature(GetKeyPEM(kp1.pubKeyObj), signAlg)).toBeTruthy();
        expect(txToSetState.verifySignature(GetKeyPEM(kp1.pubKeyObj), signAlg)).toBeTruthy();
    });
    it("使用未加密私钥生成的签名交易信息，使用非对应公钥验证不应通过", () => {
        expect(txToDeploy.verifySignature(GetKeyPEM(kp2.pubKeyObj), signAlg)).toBeFalsy();
        expect(txToInvoke.verifySignature(GetKeyPEM(kp2.pubKeyObj), signAlg)).toBeFalsy();
        expect(txToSetState.verifySignature(GetKeyPEM(kp2.pubKeyObj), signAlg)).toBeFalsy();
    });
    it("使用未加密私钥生成的签名交易信息，使用错误签名算法验证不应通过", () => {
        const wrongSignAlg = "sha256";
        expect(txToDeploy.verifySignature(GetKeyPEM(kp1.pubKeyObj), wrongSignAlg)).toBeFalsy();
        expect(txToInvoke.verifySignature(GetKeyPEM(kp1.pubKeyObj), wrongSignAlg)).toBeFalsy();
        expect(txToSetState.verifySignature(GetKeyPEM(kp1.pubKeyObj), wrongSignAlg)).toBeFalsy();
    });
    it("使用二进制交易数据构造交易对象实例，应能成功", () => {
        expect(new Transaction({ txBytes: txSignedBytes }).constructor.name).toBe("Transaction");
    });
    it("对已签名交易数据进行签名，应抛出异常", () => {
        const txFromSignedBytes = new Transaction({ txBytes: txSignedBytes });
        expect(() => {
            txFromSignedBytes.sign({
                prvKey: GetKeyPEM(kp1.prvKeyObj),
                pubKey: GetKeyPEM(kp1.pubKeyObj),
                alg: signAlg,
                creditCode: "121000005l35120456",
                certName: "node1",
            });
        }).toThrowError("The transaction has been signed already");
    });
    it("对未签名交易对象进行验签，应抛出异常", () => {
        const txNotSignedYet = new Transaction(txToInvokeConsArgs);
        expect(() => {
            txNotSignedYet.verifySignature(GetKeyPEM(kp1.pubKeyObj), signAlg);
        }).toThrowError("The transaction has not been signed yet");
    });
    it("使用加密私钥，输入正确密码生成的签名交易信息，使用相应公钥验证应能通过", () => {
        const txToDeployNew = new Transaction(txToDeployConsArgs);
        const pass = "123";
        const prvKeyEncrypted = GetKeyPEM(kp1.prvKeyObj, pass);
        txToDeployNew.sign({
            prvKey: prvKeyEncrypted,
            pubKey: GetKeyPEM(kp1.pubKeyObj),
            alg: signAlg,
            pass, 
            creditCode: "121000005l35120456",
            certName: "node1",
        });
        expect(txToDeploy.verifySignature(GetKeyPEM(kp1.pubKeyObj), signAlg)).toBeTruthy();
    });
    it("使用加密私钥生成签名交易信息，输入密码错误时，应该抛出异常", () => {
        const txToDeployNew = new Transaction(txToDeployConsArgs);
        const pass = "123";
        const prvKeyEncrypted = GetKeyPEM(kp1.prvKeyObj, pass);
        expect(() => {
            txToDeployNew.sign({
                prvKey: prvKeyEncrypted,
                pubKey: GetKeyPEM(kp1.pubKeyObj),
                alg: signAlg,
                pass: "456", 
                creditCode: "121000005l35120456",
                certName: "node1",
            });
        }).toThrowError("提供的私钥信息无效或解密密码无效");
        expect(() => {
            txToDeployNew.sign({
                prvKey: prvKeyEncrypted,
                pubKey: GetKeyPEM(kp1.pubKeyObj),
                alg: signAlg,
                creditCode: "121000005l35120456",
                certName: "node1",
            });
        }).toThrowError("提供的私钥信息无效或解密密码无效");
    });

    // TODO: wrong params tests
});

const rp = require("request-promise");
const fs = require("fs");
const mockFs = require("mock-fs");
const { GetHashVal } = require("./crypto");

/**
 * 实现在Node端通过RestAPI向RepChain节点提交已签名的交易数据
 *
 * @param {Object} { tx, address } 所需参数对象，其中
 * - {Buffer | String} tx 待提交的已签名交易数据，可为Buffer类型或hex编码的String类型
 * - {String} address RepChain节点的网络地址
 * @returns {Promise} * 该Promise将返回RepChain节点的反馈信息
 */
const restSendTX = ({ tx, address }) => {
    if (Buffer.isBuffer(tx)) {
        // signedTrans需要为文件流数据，没找到更好的实现方法，
        // 目前是先将tx写入文件，再获取其ReadableStream
        // 这里使用在内存中模拟的文件系统
        const fileName = `tx-${GetHashVal(tx).toString("base64")}`;
        const config = {};
        config[fileName] = tx;
        mockFs(config);
        const txStream = fs.createReadStream(fileName);
        const options = {
            method: "POST",
            uri: `${address}transaction/postTranStream`,
            formData: {
                signedTrans: txStream,
            },
            json: true,
        };
        return rp(options).then((r) => {
            mockFs.restore();
            return r;
        }).catch((e) => {
            mockFs.restore();
            throw e;
        });
    }
    if (tx.constructor.name === "String") {
        const options = {
            method: "POST",
            uri: `${address}transaction/postTranByString`,
            body: tx,
            headers: {
                "content-type": "application/json",
            },
            json: true,
        };
        return rp(options);
    }
    throw new TypeError(`Bad tx type: ${tx.constructor.name}, need Buffer or String`);
};

module.exports = restSendTX;

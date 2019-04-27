import rp from "request-promise";
import fs from "fs";
import mockFs from "mock-fs";
import _ from "lodash";
import { GetHashVal } from "./crypto";

/**
 * 实现在Node端通过RestAPI向RepChain节点提交已签名的交易数据
 *
 * @param {Object} transactionParam 签名交易参数
 * @param {Buffer | string} transactionParam.tx 待提交的已签名交易数据，可为Buffer类型或hex编码的String类型
 * @param {String} transactionParam.address RepChain节点的所提供的Restful API网络地址
 * @returns {Promise<Object>} RepChain节点的反馈信息
 */
const restSendTX = ({ tx, address }) => {
    if (!_.isBuffer(tx) && !_.isString(tx)) {
        throw new TypeError("The tx field should be a Buffer or string");
    }
    if (!_.isString(address)) {
        throw new TypeError("The address field should be a string");
    }
    if (_.isBuffer(tx)) {
        // signedTrans需要为文件流数据，没找到更好的实现方法，
        // 目前是先将tx写入文件，再获取其ReadableStream
        // 这里使用在内存中模拟的文件系统
        const fileName = `tx-${GetHashVal({ data: tx }).toString("base64")}`;
        const config = {};
        config[fileName] = tx;
        mockFs(config);
        const txStream = fs.createReadStream(fileName);
        const options = {
            method: "POST",
            uri: `${address}/transaction/postTranStream`,
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
    const options = {
        method: "POST",
        uri: `${address}/transaction/postTranByString`,
        body: tx,
        headers: {
            "content-type": "application/json",
        },
        json: true,
    };
    return rp(options);
};

export default restSendTX;

import rp from "request-promise";
import fs from "fs-extra";
import _ from "lodash";
import { GetHashVal } from "./crypto";

/**
 * 实现在Node端通过RestAPI向RepChain节点提交已签名的交易数据
 *
 * @param {Buffer | string} tx 待提交的已签名交易数据，可为Buffer类型或hex编码的String类型
 * @param {String} address RepChain节点的所提供的Restful API网络地址
 * @returns {Promise<Object>} RepChain节点的反馈信息
 * @memberof RestAPI
 * @private
 */
const restSendTX = (tx, address) => {
    if (!Buffer.isBuffer(tx) && !_.isString(tx)) {
        throw new TypeError("The tx field should be a Buffer or string");
    }
    if (!_.isString(address)) {
        throw new TypeError("The address field should be a string");
    }
    if (Buffer.isBuffer(tx)) {
        // signedTrans需要为文件流数据，没找到更好的实现方法，
        // 目前是先将tx写入文件，再获取其ReadableStream
        const fileName = `tx-${GetHashVal({ data: tx }).toString("hex")}`;
        const filePath = `/tmp/${fileName}`;
        fs.writeFileSync(filePath, tx);
        const txStream = fs.createReadStream(filePath);
        const options = {
            method: "POST",
            uri: `${address}/transaction/postTranStream`,
            formData: {
                signedTrans: txStream,
            },
            json: true,
        };
        return rp(options).then((r) => {
            fs.removeSync(filePath);
            return r;
        }).catch((e) => {
            fs.removeSync(filePath);
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

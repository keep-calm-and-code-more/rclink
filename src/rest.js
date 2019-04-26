// 在package.json中的browser属性中设置{lib/rest.js : lib/browser/rest.js}以使用相应环境下的实现
import rp from "request-promise";
import _ from "lodash";
import restSendTX from "./restSendTX";

class RestAPI {
    /**
     * Creates an instance of RestAPI.
     * <br />
     * 与RepChain网络节点交互的Restful API客户端.
     * 
     * @param {!string} address RepChain节点Restful API服务地址
     * @returns {RestAPI} RestAPI对象实例
     */
    constructor(address) {
        if (!_.isString(address)) throw new TypeError("The address param should be a string");
        this._address = address;
    }

    /**
     * 区块链的概要信息
     * 
     * @typedef {Object} ChainInfo 
     * @property {number} height - 最新区块高度
     * @property {string} currentBlockHash - 最新区块哈希值(base64编码字符串)
     * @property {string} previousBlockHash - 最新区块的父区块哈希值(base64编码字符串)
     * @property {string} currentStateHash - 世界状态哈希值(base64编码字符串)
     * @property {number} totalTransactions - 交易总量
     * @memberof RestAPI
     */
    /**
     * 获取区块链的当前概要信息
     *
     * @returns {Promise<ChainInfo>} Json格式信息[ChainInfo]{@link RestAPI.ChainInfo}
     * @memberof RestAPI
     */
    chainInfo() {
        const url = `${this._address}/chaininfo`;
        return rp({
            method: "GET",
            uri: url,
            json: true,
        }).then((chainInfo) => {
            const r = chainInfo.result;
            r.height = parseInt(r.height, 10);
            r.totalTransactions = parseInt(r.totalTransactions, 10);
            return r;
        });
    }

    /**
     * 获取区块链最新区块高度
     * @returns {Promise<number>} 区块高度
     * @memberof RestAPI
     */
    chainHeight() {
        return this.chainInfo().then(chainInfo => chainInfo.height);
    }

    /**
     * 获取最新区块哈希值
     *
     * @returns {Promise<string>} 区块哈希值(base64编码字符串)
     * @memberof RestAPI
     */
    chainCurrentBlockHash() {
        return this.chainInfo().then(chainInfo => chainInfo.currentBlockHash);
    }

    /**
     * 获取最新区块的父区块哈希值
     *
     * @returns {Promise<string>} 最新区块的父区块哈希值(base64编码字符串)
     * @memberof RestAPI
     */
    chainPreviousBlockHash() {
        return this.chainInfo().then(chainInfo => chainInfo.previousBlockHash);
    }

    /**
     * 获取当前的世界状态哈希值
     *
     * @returns {Promise<string>} 世界状态哈希值(base64编码字符串)
     * @memberof RestAPI
     */
    chainCurrentStateHash() {
        return this.chainInfo().then(chainInfo => chainInfo.currentStateHash);
    }

    /**
     * 获取区块链中的交易总数量
     *
     * @returns {Promise<number>} 交易总量
     * @memberof RestAPI
     */
    chainTotalTransactions() {
        return this.chainInfo().then(chainInfo => chainInfo.totalTransactions);
    }

    /**
     * 获取区块数据
     * 
     * @param {number | string | Buffer} id 区块唯一标识，可为区块高度(number)或区块哈希值(base64编码字符串或二进制数据)
     * @param {string} [blockFormat="JSON"] 期望返回的区块数据的格式，可为JSON或STREAM
     * @returns {Promise<Object> | Promise<Buffer>} 区块数据
     * @memberof RestAPI
     */
    block(id, blockFormat = "JSON") {
        let blockID = id;
        if (!_.isInteger(blockID) && !_.isString(blockID) && !_.isBuffer(blockID)) {
            throw new TypeError("The id param should be an integer/string/Buffer");
        }
        const blockEnumFormats = ["JSON", "STREAM"];
        if (_.indexOf(blockEnumFormats, blockFormat) === -1) {
            throw new RangeError(`The blockFormat param should be one of ${blockEnumFormats}`);
        }

        let url = `${this._address}/block`;
        if (blockFormat === "STREAM") {
            url = `${url}/stream`;
        }
        if (_.isString(blockID) || _.isBuffer(blockID)) {
            url = `${url}/hash`;
            if (_.isBuffer(blockID)) blockID = blockID.toString("base64");
        }
        url = `${url}/${blockID}`;

        if (blockFormat === "JSON") {
            return rp({
                method: "GET",
                uri: url,
                json: true,
            }).then(block => block.result);
        } 
        return rp({
            method: "GET",
            uri: url,
            encoding: null,
        }).then(block => Buffer.from(block));
    }

    /**
     * 获取交易数据
     *
     * @param {string} id 交易唯一标识，即txid
     * @param {string} [txFormat="JSON"] 期望返回的交易数据的格式
     * @returns {Promise<Object> | Promise<Buffer>}
     */
    transaction(id, txFormat = "JSON") {
        if (!_.isString(id)) {
            throw new TypeError("The id param should be a string");
        }
        const txEnumFormats = ["JSON", "STREAM"];
        if (_.indexOf(txEnumFormats, txFormat) === -1) {
            throw new RangeError(`The txFormat param should be one of ${txEnumFormats}`);
        }
        let url = `${this._address}/transaction`;
        if (txFormat === "STREAM") {
            url = `${url}/stream`;
        }
        url = `${url}/${id}`;

        if (txFormat === "JSON") {
            return rp({
                method: "GET",
                uri: url,
                json: true,
            }).then(tx => tx.result);
        }
        return rp({
            method: "GET",
            uri: url,
            encoding: null,
        }).then(tx => Buffer.from(tx)); 
    }

    /**
     * 发送签名交易
     * 
     * @param {Buffer | String} tx 待发送的已签名交易数据，支持使用Buffer类型数据或其hex编码的String数据
     * @returns {Promise<{txid: string}> | Promise<{err: string}>} 接收交易后RepChain节点的返回信息
     */
    sendTransaction(tx) {
        return restSendTX({ tx, address: this._address });
    }
}

export default RestAPI;

import restSendTX from "./restSendTX";

class RestAPI {
    /**
     * 
     * @param {*} address 服务地址
     */
    constructor(address) {
        this._address = address;
    }

    /**
     * 返回含区块高度的概要信息
     */
    chainInfo() {
        const url = `${this._address}chaininfo`;
        return fetch(url)
            .then(res => res.json());
    }

    // TODO repChain应该提供流式接口,走protobuf序列化
    /**
     * 根据区块高度获取区块数据
     * @param {*} height 区块高度
     */
    block(height) {
        const url = `${this._address}block/${height}`;
        return fetch(url).then(res => res.json());
    }

    blockStream(height) {
        const url = `${this._address}block/stream/${height}`;
        return fetch(url).then(res => res.arrayBuffer()).then(res => new Uint8Array(res));
    }

    transaction(id) {
        const url = `${this._address}transaction/${id}`;
        return fetch(url).then(res => res.json());
    }

    transactionStream(id) {
        const url = `${this._address}transaction/stream/${id}`;
        return fetch(url).then(res => res.arrayBuffer()).then(res => new Uint8Array(res));
    }

    /**
     * 发送签名交易给RepChain节点
     * 
     * @param {Buffer | String} tx 待发送的已签名交易数据，支持使用Buffer类型或对其hex编码后的String
     * @returns {Promise} 接收交易后RepChain节点的返回信息
     */
    sendTX(tx) {
        return restSendTX({ tx, address: this._address });
    }
}
export default RestAPI;

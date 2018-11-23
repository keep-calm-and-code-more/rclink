var rp = require('request-promise');

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
    chaininfo(){
        var url = this._address+'chaininfo';
        return rp({
            "method":"GET", 
            "uri": url,
            "json": true
        })
    }
    //TODO repChain应该提供流式接口,走protobuf序列化
    /**
     * 根据区块高度获取区块数据
     * @param {*} height 区块高度
     */
    block(height){
        var url = this._address+'block/'+height;
        return rp({
            "method":"GET", 
            "uri": url,
            "json": true
        })
    }

    blockStream(height){
        var url = this._address+'block/stream/'+height;
        return rp({
            "method":"GET", 
            "uri": url,
            encoding: null
        })
    }

/**
 * 发送签名交易给RepChain节点
 * @param {Buffer | String} tx 待发送的交易，支持使用交易字节流数据或对其hex格式编码后的字符串
 * @returns {Promise} rp 接收交易后RepChain节点的返回信息
 */
    sendTX(tx){
        let options
        if (Buffer.isBuffer(tx)){
           // Todo: 待完成提交字节流形式的交易数据
           options = {
               method: 'POST',
               uri: this._address + 'transaction/postTranStream',
               formData: {
                    signedTrans: tx,
               }, 
           }
        }
        else{
            options = {
                method: 'POST',
                uri: this._address + 'transaction/postTranByString',
                body: tx,
                headers: {
                    'content-type': 'application/json', 
                },
                json: true,
            }
        }
        return rp(options);
    }
 }
module.exports.RestAPI = RestAPI;
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
        var url = this._address+'blockstream/'+height;
        return rp({
            "method":"GET", 
            "uri": url,
            encoding: null
        })
    }

/**
 * 发送签名交易，流式提交
 * @param {*} tx 待发送的交易
 */
    sendTX(tx){
        var url = this._address+'/postTran';
        return rp({
            method: 'POST',
            uri: url,
            formData: {
                // Like <input type="text" name="name">
                name: 'Jenn',
                // Like <input type="file" name="file">
                file: {
                    value: fs.createReadStream('test/test.jpg'),
                    options: {
                        filename: 'test.jpg',
                        contentType: 'image/jpg'
                    }
                }
            },
            headers: {
                /* 'content-type': 'multipart/form-data' */ // Is set automatically
            }
        });
    }
 }
module.exports = RestAPI;
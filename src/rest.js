var rp = require('request-promise');

class RestAPI {
    /**
     * 
     * @param {*} address 服务地址
     * @param {*} protocols 协议
     * @param {*} cb 回调函数
     */
    constructor(address) {
        this._address = address;
    }
    chaininfo(){
        var url = this._address+'chaininfo';
        return rp({
            "method":"GET", 
            "uri": url,
            "json": true
        })
    }
    //TODO repChain应该提供流式接口,走protobuf序列化
    block(height){
        var url = this._address+'block/'+height;
        return rp({
            "method":"GET", 
            "uri": url,
            "json": true
        })
    }
 }
module.exports = RestAPI;
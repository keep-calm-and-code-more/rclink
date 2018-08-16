import WebSocket from 'ws';

class EventTube {
    /**
     * 
     * @param {*} address 服务地址
     * @param {*} protocols 协议
     * @param {*} cb 回调函数
     */
    constructor (address, cb) {
        var ws = new WebSocket(address);
        ws.onmessage = function(m) {
            cb(m);
        }
    }
}
module.exports = EventTube;
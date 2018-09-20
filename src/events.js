import WebSocket from 'ws';

class EventTube {
    /**
     * 
     * @param {*} address 服务地址
     * @param {*} protocols 协议
     * @param {*} cb 回调函数
     */
    constructor(address, cb, timeout) {
        this._address = address;
        this._cb = cb;
        this._timeout = timeout || 5000;
        this.timer = null;
        this.connect();
    }
    reconnect(){
        var me = this;
        var timeout = me._timeout;
        if(!me.timer){
            me.timer = setTimeout(function() {
                me.connect();
              }, timeout);    
        }
    }
    connect() {
        var me = this;
        me.timer = null;
        console.log('connecting '+me._address);
        var ws;        
        ws = new WebSocket(me._address);        
        ws.onerror=function(evt) {
            console.log('error:'+evt.message);
            me.reconnect();
        };
        ws.onmessage = function (m) {
            me._cb(m);
        }
        ws.onopen=function() {
            console.log('connected');
        };
        ws.onclose=function() {
            console.log('disconnected');
            me.reconnect();
        };
    }
}
export default EventTube;
// 使用w3cwebsocket对象，兼容Browser和Node环境
const WebSocket = require("websocket").w3cwebsocket;

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

    reconnect() {
        const me = this;
        const timeout = me._timeout;
        if (!me.timer) {
            me.timer = setTimeout(() => {
                me.connect();
            }, timeout);
        }
    }

    connect() {
        const me = this;
        me.timer = null;
        console.log(`connecting ${me._address}`);
        const ws = new WebSocket(me._address);
        ws.onerror = (evt) => {
            console.log(`error:${evt.message}`);
            me.reconnect();
        };
        ws.onmessage = (m) => {
            me._cb(m);
        };
        ws.onopen = () => {
            console.log("connected");
        };
        ws.onclose = () => {
            console.log("disconnected");
            me.reconnect();
        };
    }
}
module.exports.EventTube = EventTube;

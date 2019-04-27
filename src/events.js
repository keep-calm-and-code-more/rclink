// 使用w3cwebsocket对象，兼容Browser和Node环境
import { w3cwebsocket as WebSocket } from "websocket";

class EventTube {
    /**
     * @callback websocketCallback
     * @param {Object} eventMessage
    */
    /**
     * 构建事件订阅对象实例
     * 
     * @param {string} address websocket服务地址
     * @param {websocketCallback} cb 处理返回信息的回调函数
     * @param {number} timeout 重连的时间间隔
     */
    constructor(address, cb, timeout) {
        this._address = address;
        this._cb = cb;
        this._timeout = timeout || 5000;
        this.timer = null;
        this.ws = null;
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
        me.ws = ws;
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
        ws.onclose = (e) => {
            console.log("disconnected");
            if (e.code !== 4000) { 
                me.reconnect(); 
            } else {
                console.log(`for the reason: ${e.reason}`);
            }
        };
    }

    /**
     * 主动关闭websocket连接
     * 
     * @param {String} reason 解释主动关闭连接的原因，不超过123字节
     */
    close(reason) {
        this.ws.close(4000, reason);
    }
}
export default EventTube;

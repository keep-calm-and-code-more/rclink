"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _websocket = require("websocket");

// 使用w3cwebsocket对象，兼容Browser和Node环境
var EventTube =
/*#__PURE__*/
function () {
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
  function EventTube(address, cb, timeout) {
    (0, _classCallCheck2.default)(this, EventTube);
    this._address = address;
    this._cb = cb;
    this._timeout = timeout || 5000;
    this.timer = null;
    this.ws = null;
    this.connect();
  }

  (0, _createClass2.default)(EventTube, [{
    key: "reconnect",
    value: function reconnect() {
      var me = this;
      var timeout = me._timeout;

      if (!me.timer) {
        me.timer = setTimeout(function () {
          me.connect();
        }, timeout);
      }
    }
  }, {
    key: "connect",
    value: function connect() {
      var me = this;
      me.timer = null;
      console.log("connecting ".concat(me._address));
      var ws = new _websocket.w3cwebsocket(me._address);
      me.ws = ws;

      ws.onerror = function (evt) {
        console.log("error:".concat(evt.message));
        me.reconnect();
      };

      ws.onmessage = function (m) {
        me._cb(m);
      };

      ws.onopen = function () {
        console.log("connected");
      };

      ws.onclose = function (e) {
        console.log("disconnected");

        if (e.code !== 4000) {
          me.reconnect();
        } else {
          console.log("for the reason: ".concat(e.reason));
        }
      };
    }
    /**
     * 主动关闭websocket连接
     * 
     * @param {String} reason 解释主动关闭连接的原因，不超过123字节
     */

  }, {
    key: "close",
    value: function close(reason) {
      this.ws.close(4000, reason);
    }
  }]);
  return EventTube;
}();

var _default = EventTube;
exports.default = _default;
//# sourceMappingURL=events.js.map
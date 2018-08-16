"use strict";

var _ws = _interopRequireDefault(require("ws"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var EventTube =
/*#__PURE__*/
function () {
  /**
   * 
   * @param {*} address 服务地址
   * @param {*} protocols 协议
   * @param {*} cb 回调函数
   */
  function EventTube(address, cb, timeout) {
    _classCallCheck(this, EventTube);

    this._address = address;
    this._cb = cb;
    this._timeout = timeout || 5000;
    this.timer = null;
    this.connect();
  }

  _createClass(EventTube, [{
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
      console.log('connecting ' + me._address);
      var ws;
      ws = new _ws.default(me._address);

      ws.onerror = function (evt) {
        console.log('error:' + evt.message);
        me.reconnect();
      };

      ws.onmessage = function (m) {
        me._cb(m);
      };

      ws.onopen = function () {
        console.log('connected');
      };

      ws.onclose = function () {
        console.log('disconnected');
        me.reconnect();
      };
    }
  }]);

  return EventTube;
}();

module.exports = EventTube;
//# sourceMappingURL=events.js.map
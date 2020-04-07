"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _lodash = _interopRequireDefault(require("lodash"));

var _restSendTX = _interopRequireDefault(require("./restSendTX"));

var _restGet = _interopRequireDefault(require("./restGet"));

// 在package.json中的browser属性中设置{lib/rest.js : lib/browser/rest.js}以使用相应环境下的实现
var RestAPI =
/*#__PURE__*/
function () {
  /**
   * Creates an instance of RestAPI.
   * <br />
   * 与RepChain网络节点交互的Restful API客户端.
   * 
   * @param {!string} address RepChain节点Restful API服务地址
   * @returns {RestAPI} RestAPI对象实例
   */
  function RestAPI(address) {
    (0, _classCallCheck2.default)(this, RestAPI);
    if (!_lodash.default.isString(address)) throw new TypeError("The address param should be a string");
    this._address = address;
  }
  /**
   * 区块链的概要信息
   * 
   * @typedef {Object} ChainInfo 
   * @property {number} height - 最新区块高度
   * @property {string} currentBlockHash - 最新区块哈希值(base64编码字符串)
   * @property {string} previousBlockHash - 最新区块的父区块哈希值(base64编码字符串)
   * @property {string} currentStateHash - 世界状态哈希值(base64编码字符串)
   * @property {number} totalTransactions - 交易总量
   * @memberof RestAPI
   */

  /**
   * 获取区块链的当前概要信息
   *
   * @returns {Promise<ChainInfo>} Json格式信息[ChainInfo]{@link RestAPI.ChainInfo}
   * @memberof RestAPI
   */


  (0, _createClass2.default)(RestAPI, [{
    key: "chainInfo",
    value: function chainInfo() {
      var url = "".concat(this._address, "/chaininfo");
      return (0, _restGet.default)(url).then(function (chainInfo) {
        var r = chainInfo;
        r.height = parseInt(r.height, 10);
        r.totalTransactions = parseInt(r.totalTransactions, 10);
        return r;
      });
    }
    /**
     * 获取区块链最新区块高度
     * @returns {Promise<number>} 区块高度
     * @memberof RestAPI
     */

  }, {
    key: "chainHeight",
    value: function chainHeight() {
      return this.chainInfo().then(function (chainInfo) {
        return chainInfo.height;
      });
    }
    /**
     * 获取最新区块哈希值
     *
     * @returns {Promise<string>} 区块哈希值(base64编码字符串)
     * @memberof RestAPI
     */

  }, {
    key: "chainCurrentBlockHash",
    value: function chainCurrentBlockHash() {
      return this.chainInfo().then(function (chainInfo) {
        return chainInfo.currentBlockHash;
      });
    }
    /**
     * 获取最新区块的父区块哈希值
     *
     * @returns {Promise<string>} 最新区块的父区块哈希值(base64编码字符串)
     * @memberof RestAPI
     */

  }, {
    key: "chainPreviousBlockHash",
    value: function chainPreviousBlockHash() {
      return this.chainInfo().then(function (chainInfo) {
        return chainInfo.previousBlockHash;
      });
    }
    /**
     * 获取当前的世界状态哈希值
     *
     * @returns {Promise<string>} 世界状态哈希值(base64编码字符串)
     * @memberof RestAPI
     */

  }, {
    key: "chainCurrentStateHash",
    value: function chainCurrentStateHash() {
      return this.chainInfo().then(function (chainInfo) {
        return chainInfo.currentStateHash;
      });
    }
    /**
     * 获取区块链中的交易总数量
     *
     * @returns {Promise<number>} 交易总量
     * @memberof RestAPI
     */

  }, {
    key: "chainTotalTransactions",
    value: function chainTotalTransactions() {
      return this.chainInfo().then(function (chainInfo) {
        return chainInfo.totalTransactions;
      });
    }
    /**
     * 获取区块数据
     * 
     * @param {number | string | Buffer} id 区块唯一标识，可为区块高度(number)或区块哈希值(base64编码字符串或二进制数据)
     * @param {string} [blockFormat="JSON"] 期望返回的区块数据的格式，可为JSON或STREAM
     * @returns {Promise<Object> | Promise<Buffer>} 区块数据
     * @memberof RestAPI
     */

  }, {
    key: "block",
    value: function block(id) {
      var blockFormat = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "JSON";
      var blockID = id;

      if (!_lodash.default.isInteger(blockID) && !_lodash.default.isString(blockID) && !Buffer.isBuffer(blockID)) {
        throw new TypeError("The id param should be an integer/string/Buffer");
      }

      var blockEnumFormats = ["JSON", "STREAM"];

      if (_lodash.default.indexOf(blockEnumFormats, blockFormat) === -1) {
        throw new RangeError("The blockFormat param should be one of ".concat(blockEnumFormats));
      }

      var url = "".concat(this._address, "/block");

      if (blockFormat === "STREAM") {
        url = "".concat(url, "/stream");
      }

      if (_lodash.default.isString(blockID) || Buffer.isBuffer(blockID)) {
        url = "".concat(url, "/hash");
        if (Buffer.isBuffer(blockID)) blockID = blockID.toString("base64");
      }

      url = "".concat(url, "/").concat(blockID);
      return (0, _restGet.default)(url);
    }
    /**
     * 获取交易数据
     *
     * @param {string} id 交易唯一标识，即txid
     * @param {string} [txFormat="JSON"] 期望返回的交易数据的格式
     * @returns {Promise<Object> | Promise<Buffer>}
     */

  }, {
    key: "transaction",
    value: function transaction(id) {
      var txFormat = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "JSON";

      if (!_lodash.default.isString(id)) {
        throw new TypeError("The id param should be a string");
      }

      var txEnumFormats = ["JSON", "STREAM"];

      if (_lodash.default.indexOf(txEnumFormats, txFormat) === -1) {
        throw new RangeError("The txFormat param should be one of ".concat(txEnumFormats));
      }

      var url = "".concat(this._address, "/transaction");

      if (txFormat === "STREAM") {
        url = "".concat(url, "/stream");
      }

      url = "".concat(url, "/").concat(id);
      return (0, _restGet.default)(url);
    }
    /**
     * 发送签名交易
     * 
     * @param {Buffer | String} tx 待发送的已签名交易数据，支持使用Buffer类型数据或其hex编码的String数据
     * @returns {Promise<{txid: string}> | Promise<{err: string}>} 接收交易后RepChain节点的返回信息
     */

  }, {
    key: "sendTransaction",
    value: function sendTransaction(tx) {
      return (0, _restSendTX.default)(tx, this._address);
    }
  }]);
  return RestAPI;
}();

var _default = RestAPI;
exports.default = _default;
//# sourceMappingURL=rest.js.map
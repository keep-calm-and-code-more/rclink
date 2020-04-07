"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _requestPromise = _interopRequireDefault(require("request-promise"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _lodash = _interopRequireDefault(require("lodash"));

var _crypto = require("./crypto");

/**
 * 实现在Node端通过RestAPI向RepChain节点提交已签名的交易数据
 *
 * @param {Buffer | string} tx 待提交的已签名交易数据，可为Buffer类型或hex编码的String类型
 * @param {String} address RepChain节点的所提供的Restful API网络地址
 * @returns {Promise<Object>} RepChain节点的反馈信息
 * @memberof RestAPI
 * @private
 */
var restSendTX = function restSendTX(tx, address) {
  if (!Buffer.isBuffer(tx) && !_lodash.default.isString(tx)) {
    throw new TypeError("The tx field should be a Buffer or string");
  }

  if (!_lodash.default.isString(address)) {
    throw new TypeError("The address field should be a string");
  }

  if (Buffer.isBuffer(tx)) {
    // signedTrans需要为文件流数据，没找到更好的实现方法，
    // 目前是先将tx写入文件，再获取其ReadableStream
    var fileName = "tx-".concat((0, _crypto.GetHashVal)({
      data: tx
    }).toString("hex"));
    var filePath = "/tmp/".concat(fileName);

    _fsExtra.default.writeFileSync(filePath, tx);

    var txStream = _fsExtra.default.createReadStream(filePath);

    var _options = {
      method: "POST",
      uri: "".concat(address, "/transaction/postTranStream"),
      formData: {
        signedTrans: txStream
      },
      json: true
    };
    return (0, _requestPromise.default)(_options).then(function (r) {
      _fsExtra.default.removeSync(filePath);

      return r;
    }).catch(function (e) {
      _fsExtra.default.removeSync(filePath);

      throw e;
    });
  }

  var options = {
    method: "POST",
    uri: "".concat(address, "/transaction/postTranByString"),
    body: tx,
    headers: {
      "content-type": "application/json"
    },
    json: true
  };
  return (0, _requestPromise.default)(options);
};

var _default = restSendTX;
exports.default = _default;
//# sourceMappingURL=restSendTX.js.map
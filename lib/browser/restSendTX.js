"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

/**
 * 实现在Browser端通过RestAPI向RepChain节点提交已签名的交易数据
 *
 * @param {Buffer | string} tx 待提交的已签名交易数据，可为Buffer类型或hex编码的String类型
 * @param {string} address RepChain节点的Restful API服务地址
 * @returns {Promise<{txid: string}> | Promise<{err: string}>} * 该Promise将返回RepChain节点的反馈信息
 * @memberof RestAPI
 * @private
 */
var restSendTX = function restSendTX(tx, address) {
  if (!_lodash.default.isString(tx) && !Buffer.isBuffer(tx)) {
    throw new TypeError("The tx filed should be a hex string or BUffer");
  }

  if (!_lodash.default.isString(address)) throw new TypeError("The address should be a string"); // let xhr = new XMLHttpRequest();
  // fetch支持promise，且其使用比XMLHttpRequest更简单

  if (Buffer.isBuffer(tx)) {
    var formData = new FormData();
    formData.append("signedTrans", new Blob([tx]));
    return fetch("".concat(address, "/transaction/postTranStream"), {
      method: "POST",
      mode: "cors",
      body: formData
    }).then(function (r) {
      return r.json();
    });
  }

  return fetch("".concat(address, "/transaction/postTranByString"), {
    method: "POST",
    mode: "cors",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(tx)
  }).then(function (r) {
    return r.json();
  });
};

var _default = restSendTX;
exports.default = _default;
//# sourceMappingURL=restSendTX.js.map
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _requestPromise = _interopRequireDefault(require("request-promise"));

var _lodash = _interopRequireDefault(require("lodash"));

var _validator = _interopRequireDefault(require("validator"));

/**
 * 实现在Node端通过RestAPI从Repchain节点获取数据信息
 * 
 * @param {string} url RepChain Restful API url
 * @returns {Promise<Object> | Promise<Buffer>} 返回json对象或二进制数据
 * @memberof RestAPI
 * @private
 */
var restGet = function restGet(url) {
  if (!_lodash.default.isString(url) || !_validator.default.isURL(url, {
    require_tld: false
  })) {
    throw new Error("The url param should be a string url");
  }

  if (/\/stream\//.test(url)) {
    return (0, _requestPromise.default)({
      method: "GET",
      uri: url,
      encoding: null,
      timeout: 15000
    }).then(function (res) {
      return Buffer.from(res);
    });
  }

  return (0, _requestPromise.default)({
    method: "GET",
    uri: url,
    json: true,
    timeout: 15000
  }).then(function (res) {
    return res.result;
  });
};

var _default = restGet;
exports.default = _default;
//# sourceMappingURL=restGet.js.map
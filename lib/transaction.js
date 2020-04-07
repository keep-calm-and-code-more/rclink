"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _long = _interopRequireDefault(require("long"));

var _lodash = _interopRequireDefault(require("lodash"));

var _peer = require("./protos/peer");

var _crypto = require("./crypto");

// use generated static js code
var txEnumTypes = ["CHAINCODE_DEPLOY", "CHAINCODE_INVOKE", "CHAINCODE_SET_STATE"];
var chaincodeLanguageEnumTypes = ["CODE_SCALA", "CODE_JAVASCRIPT"]; // Private properties

var txMsgCollection = new WeakMap();
var txMsgType = _peer.rep.protos.Transaction;
var signatureMsgType = _peer.rep.protos.Signature; // Private methods

var getTimestamp = function getTimestamp(millis) {
  var timestampMillis = millis || Date.now();
  var timestampJsonObj = {
    seconds: new _long.default(timestampMillis / 1000),
    nanos: timestampMillis % 1000 * 1000000
  };
  return timestampJsonObj;
};

var Transaction =
/*#__PURE__*/
function () {
  /**
   * 构建RepChain交易对象
   * @param {Object} consArgs - 交易对象实例构造参数
   * @param {Buffer|Uint8Array} [consArgs.txBytes] - 二进制交易数据，当使用该参数时，将忽略其他参数
   * @param {string} consArgs.type - 交易类型，需与RepChain的交易类型定义一致，可为CHAINCODE_DEPLOY，
   * CHAINCODE_INVOKE, CHAINCODE_SET_STATE
   * @param {string} consArgs.chaincodeName - 目标合约的名称
   * @param {number} consArgs.chaincodeVersion - 目标合约的版本号
   * @param {Object} consArgs.chaincodeDeployParams - 部署合约时(即type为CHAINCODE_DEPLOY)所需参数
   * @param {number} consArgs.chaincodeDeployParams.timeout
   * @param {string} consArgs.chaincodeDeployParams.codePackage - 待部署合约的代码内容
   * @param {string} consArgs.chaincodeDeployParams.legalProse - 待部署合约的法律文本
   * @param {string} consArgs.chaincodeDeployParams.codeLanguageType - 待部署合约代码语言类型，
   * 目前只支持CODE_SCALA和CODE_JAVASCRIPT
   * @param {Object} consArgs.chaincodeInvokeParams - 调用合约时(即type为CHAINCODE_INVOKE)所需参数
   * @param {string} consArgs.chaincodeInvokeParams.chaincodeFunction - 待被调用的合约方法名
   * @param {Array.<string>} consArgs.chaincodeInvokeParams.chaincodeFunctionArgs - 给待调用的合约方法的参数
   * @param {Object} consArgs.chaincodeSetStateParams - 设置合约状态时(即type为CHAINCODE_SET_STATE)所需参数
   * @param {boolean} consArgs.chaincodeSetStateParams.state - 目标合约的新状态，当值为false时表示使该合约无效
   * @returns {Transaction} Transaction对象实例
   */
  function Transaction(_ref) {
    var txBytes = _ref.txBytes,
        type = _ref.type,
        chaincodeName = _ref.chaincodeName,
        chaincodeVersion = _ref.chaincodeVersion,
        _ref$chaincodeDeployP = _ref.chaincodeDeployParams;
    _ref$chaincodeDeployP = _ref$chaincodeDeployP === void 0 ? {
      timeout: 1000
    } : _ref$chaincodeDeployP;
    var timeout = _ref$chaincodeDeployP.timeout,
        codePackage = _ref$chaincodeDeployP.codePackage,
        legalProse = _ref$chaincodeDeployP.legalProse,
        codeLanguageType = _ref$chaincodeDeployP.codeLanguageType,
        _ref$chaincodeInvokeP = _ref.chaincodeInvokeParams;
    _ref$chaincodeInvokeP = _ref$chaincodeInvokeP === void 0 ? {} : _ref$chaincodeInvokeP;
    var chaincodeFunction = _ref$chaincodeInvokeP.chaincodeFunction,
        chaincodeFunctionArgs = _ref$chaincodeInvokeP.chaincodeFunctionArgs,
        _ref$chaincodeSetStat = _ref.chaincodeSetStateParams;
    _ref$chaincodeSetStat = _ref$chaincodeSetStat === void 0 ? {} : _ref$chaincodeSetStat;
    var state = _ref$chaincodeSetStat.state;
    (0, _classCallCheck2.default)(this, Transaction);

    if (txBytes) {
      // 此时直接使用该参数构造交易对象
      if (Buffer.isBuffer(txBytes) || txBytes.constructor.name === "Uint8Array") {
        try {
          var msg = txMsgType.decode(txBytes);
          txMsgCollection.set(this, msg);
        } catch (e) {
          throw e;
        }
      } else {
        throw new TypeError("The txBytes field should be a Buffer or Uint8array");
      }
    } else {
      if (_lodash.default.indexOf(txEnumTypes, type) === -1) {
        throw new Error("The type field should be one of ".concat(txEnumTypes));
      }

      if (!_lodash.default.isString(chaincodeName)) {
        throw new TypeError("The chaincodeName field should be a string");
      }

      if (!_lodash.default.isInteger(chaincodeVersion)) {
        throw new TypeError("The chaincodeversion field should be an integer");
      }

      var txJsonObj = {
        id: "",
        cid: {
          chaincodeName: chaincodeName,
          version: chaincodeVersion
        }
      };

      switch (type) {
        case "CHAINCODE_DEPLOY":
          {
            if (!_lodash.default.isInteger(timeout)) {
              throw new TypeError("The timeout field should be an integer");
            }

            if (!_lodash.default.isString(codePackage)) {
              throw new TypeError("The codePackage field should be a string");
            }

            if (!_lodash.default.isString(legalProse)) {
              throw new TypeError("The legalProse field should be a string");
            }

            if (_lodash.default.indexOf(chaincodeLanguageEnumTypes, codeLanguageType) === -1) {
              throw new Error("The codeLanguageType field should be one of ".concat(chaincodeLanguageEnumTypes));
            }

            txJsonObj.type = 1;
            txJsonObj.spec = {
              timeout: timeout,
              codePackage: codePackage,
              legalProse: legalProse
            };

            switch (codeLanguageType) {
              case "CODE_JAVASCRIPT":
                txJsonObj.spec.ctype = 1;
                break;

              case "CODE_SCALA":
                txJsonObj.spec.ctype = 2;
                break;

              default:
                break;
            }

            break;
          }

        case "CHAINCODE_INVOKE":
          {
            if (!_lodash.default.isString(chaincodeFunction)) {
              throw new TypeError("The chaincodeFunction field should be a string");
            }

            if (!_lodash.default.isArray(chaincodeFunctionArgs)) {
              throw new TypeError("The chaincodeFunctionArgs field should be an Array<string>");
            }

            for (var i = 0; i < chaincodeFunctionArgs.length; i++) {
              if (!_lodash.default.isString(chaincodeFunctionArgs[i])) {
                throw new TypeError("The chaincodeFunctionArgs field should be an Array<string>");
              }
            }

            txJsonObj.type = 2;
            txJsonObj.ipt = {
              function: chaincodeFunction,
              args: chaincodeFunctionArgs
            };
            break;
          }

        case "CHAINCODE_SET_STATE":
          {
            if (!_lodash.default.isBoolean(state)) {
              throw new TypeError("The state field should be a Boolean");
            }

            txJsonObj.type = 3;
            txJsonObj.state = state;
            break;
          }

        default:
          throw new Error("Wrong Transaction type");
      }

      var err = txMsgType.verify(txJsonObj);
      if (err) throw err; // 计算txid

      var _msg = txMsgType.create(txJsonObj); // 在Browser环境下protobufjs中的encode().finish()返回原始的Uint8Array，
      // 为了屏蔽其与Buffer经browserify或webpack转译后的Uint8Array的差异，这里需转为Buffer


      var txBuffer = Buffer.from(txMsgType.encode(_msg).finish());
      var timeStampBuffer = Buffer.from(new Date().toISOString());
      var dataBuffer = Buffer.concat([txBuffer, timeStampBuffer], txBuffer.length + timeStampBuffer.length);
      _msg.id = (0, _crypto.GetHashVal)({
        data: dataBuffer,
        alg: "sha256"
      }).toString("hex");
      txMsgCollection.set(this, _msg);
    }
  }

  (0, _createClass2.default)(Transaction, [{
    key: "getTxMsg",
    value: function getTxMsg() {
      return txMsgCollection.get(this);
    }
    /**
     * 对新创建的交易实例进行签名
     * @param {Object} signArgs - 签名所需参数
     * @param {string} signArgs.prvKey - 签名者的pem格式私钥
     * @param {string} signArgs.pubKey - 签名者的pem格式公钥
     * @param {string} signArgs.alg - 使用的签名算法名称
     * @param {string} [signArgs.pass] - 私钥解密密码，如果prvKey为已加密的pem格式私钥，则需要提供此解密密码
     * @param {string} signArgs.creditCode - 签名者的信用代码
     * @param {string} signArgs.certName - 代表签名者的证书名
     * @returns {Buffer} - 已签名交易数据
     */

  }, {
    key: "sign",
    value: function sign(_ref2) {
      var prvKey = _ref2.prvKey,
          pubKey = _ref2.pubKey,
          alg = _ref2.alg,
          pass = _ref2.pass,
          creditCode = _ref2.creditCode,
          certName = _ref2.certName;
      if (!_lodash.default.isString(prvKey)) throw new Error("The prvKey field should be a string");
      if (!_lodash.default.isString(pubKey)) throw new Error("The pubKey field should be a string");
      if (!_lodash.default.isString(alg)) throw new Error("The alg field should be a string");
      if (pass && !_lodash.default.isString(pass)) throw new Error("The pass field should be a string");
      if (!_lodash.default.isString(creditCode)) throw new Error("The creditCode field should be a string");
      if (!_lodash.default.isString(certName)) throw new Error("The certName field should be a string");
      var msg = txMsgCollection.get(this);

      if (msg.signature && msg.signature.signature) {
        throw new Error("The transaction has been signed already");
      } // 签名


      var txBuffer = Buffer.from(txMsgType.encode(msg).finish());
      var prvKeyObj = (0, _crypto.ImportKey)(prvKey, pass); // 私钥解密

      if (prvKeyObj.pubKeyHex === undefined) {
        // 当使用ImportKey方法从pem格式转object格式时，若其pubKeyHex为undefined则需在该object中补充pubKeyHex
        // 否则签名将出错
        prvKeyObj.pubKeyHex = (0, _crypto.ImportKey)(pubKey).pubKeyHex;
      }

      var prvkeyPEM = (0, _crypto.GetKeyPEM)(prvKeyObj);
      var signature = (0, _crypto.Sign)({
        prvKey: prvkeyPEM,
        data: txBuffer,
        alg: alg
      });
      var signatureJsonObj = {
        certId: {
          creditCode: creditCode,
          certName: certName
        },
        tmLocal: getTimestamp(),
        signature: signature
      };
      var err = signatureMsgType.verify(signatureJsonObj);
      if (err) throw err;
      msg.signature = signatureMsgType.create(signatureJsonObj);
      txBuffer = Buffer.from(txMsgType.encode(msg).finish());
      return txBuffer;
    }
    /**
     * 对已签名的交易对象进行签名验证
     * @param {String} pubKey pem格式的公钥
     * @param {String} alg 使用的签名算法
     * @returns {boolean} 验签是否成功
     */

  }, {
    key: "verifySignature",
    value: function verifySignature(pubKey, alg) {
      var msg = _lodash.default.cloneDeep(txMsgCollection.get(this));

      var signature = _lodash.default.cloneDeep(msg.signature);

      if (!signature || !signature.signature) {
        throw new Error("The transaction has not been signed yet");
      }

      msg.signature = null;
      var msgBuffer = Buffer.from(txMsgType.encode(msg).finish());
      var valid = (0, _crypto.VerifySign)({
        pubKey: pubKey,
        sigValue: signature.signature,
        data: msgBuffer,
        alg: alg
      });
      return valid;
    }
  }]);
  return Transaction;
}();

var _default = Transaction;
exports.default = _default;
//# sourceMappingURL=transaction.js.map
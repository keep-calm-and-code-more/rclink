"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _websocket = require("websocket");

// Private property
var websocketClientCollection = new WeakMap(); // Private methods

/* eslint-disable no-use-before-define */

var websocketConnect = function websocketConnect(instance) {
  console.log("gm websocket connecting");
  var websocketClient = new _websocket.w3cwebsocket(instance.websocketServerAddress);

  websocketClient.onopen = function () {
    instance.timer = null;
    console.log("gm websocket connected");

    if (instance.sendMessageArray.length > 0) {
      var _arr = Object.keys(instance.sendMessageArray);

      var _loop = function _loop() {
        var i = _arr[_i];
        // 目前中宇提供的websocket服务不能间隔很短发送消息(其server端的处理是同步方式的？)，否则连接会关闭
        // ，我在这里使用等一段时间再发送下一消息的方法去避免:-(
        var m = instance.sendMessageArray[i];
        setTimeout(function () {
          websocketClient.send(m);
          console.log("have sent message ".concat(decodeURIComponent(m), " to gm websocket server"));
        }, parseInt(i, 10) * 50);
      };

      for (var _i = 0; _i < _arr.length; _i++) {
        _loop();
      }

      instance.sendMessageArray = [];
    }
  };

  websocketClient.onerror = function (evt) {
    instance.timer = null;
    console.log("gm websocket error: ".concat(evt.message));
    websocketReconnect(instance);
  };

  websocketClient.onclose = function () {
    return console.log("gm websocket closed");
  };

  websocketClient.onmessage = function (evt) {
    return websocketClientCallback(instance, evt.data);
  };

  websocketClientCollection.set(instance, websocketClient);
};

var websocketReconnect = function websocketReconnect(instance) {
  if (!instance.timer) {
    instance.timer = setTimeout(function () {
      return websocketConnect(instance);
    }, 5000);
  }
};
/* eslint-disable no-use-before-define */


var getGMBase = function getGMBase(instance, message) {
  var websocketClient = websocketClientCollection.get(instance);
  var sendMessage = encodeURIComponent(message);

  if (websocketClient && websocketClient.readyState === websocketClient.OPEN) {
    websocketClient.send(sendMessage);
    console.log("have sent message ".concat(decodeURIComponent(sendMessage), " to gm websocket server"));
  } else {
    instance.sendMessageArray.push(sendMessage);
    websocketReconnect(instance);
  }
};

var callbacks = {
  sm3InitCB: function sm3InitCB(instance, result) {
    console.log("in sm3InitCB received: ", result);
    var ctx = result.substring(4);
    instance.sm3Ctx = ctx;
    var sendMessage = "910|{\"method\":\"sm3update\",\"arguments\":\"plainsm3data=".concat(instance.sm3PlainData, "|ctx=").concat(instance.sm3Ctx, "\",\"callback\":\"sm3UpdateCB\"}");
    getGMBase(instance, sendMessage);
  },
  sm3UpdateCB: function sm3UpdateCB(instance, result) {
    console.log("in sm3UpdateCB received: ", result);
    var sendMessage = "910|{\"method\":\"sm3finish\",\"arguments\":\"ctx=".concat(instance.sm3Ctx, "\",\"callback\":\"sm3FinishCB\"}");
    getGMBase(instance, sendMessage);
  },
  sm3FinishCB: function sm3FinishCB(instance, result) {
    console.log("in sm3FinishCB received: ", result);
    var sm3HashVal = result.substring(result.lastIndexOf("=") + 1);
    instance.getGMSm3HashValCB(sm3HashVal);
  },
  getPublicKeyCerCB: function getPublicKeyCerCB(instance, result) {
    console.log("in getPublickKeyCerCB received: ", result);

    if (result === "failed") {
      var sendMessage = "910|{\"method\":\"reqCert\",\"arguments\":\"ID=".concat(instance.certUserID, "\",\"callback\":\"reqCertCB\"}");
      getGMBase(instance, sendMessage);
    } else {
      var certPrefix = "-----BEGIN CERTIFICATE-----\r\n";
      var certSuffix = "\r\n-----END CERTIFICATE-----";
      instance.getGMCertificateCB(certPrefix + result + certSuffix);
    }
  },
  reqCertCB: function reqCertCB(instance, result) {
    console.log("in reqCertCB received: ", result);

    if (result === "failed") {
      throw new Error("reqCert failed");
    }

    var sendMessage = "910|{\"method\":\"getPublicKeyCer\",\"arguments\":\"ID=".concat(instance.certUserID, "\",\"callback\":\"getPublicKeyCerCB\"}");
    getGMBase(instance, sendMessage);
  },
  signMessageCB: function signMessageCB(instance, result) {
    console.log("in signMessageCB received: ", result);
    instance.getGMSignatureCB(result);
  }
};

var websocketClientCallback = function websocketClientCallback(instance, message) {
  var decodedMsg = decodeURIComponent(message);
  console.log("have received messge ".concat(decodedMsg, " from gm websocket server"));
  var objStr = decodedMsg.substring(4);

  if (objStr !== "") {
    var obj = JSON.parse(objStr);

    if (obj.errMessage !== "") {
      console.log("gm websocket server return error message", obj.errMessage);
    } else {
      callbacks[obj.callback](instance, obj.result);
    }
  }
};

var GMCryptoUtils =
/*#__PURE__*/
function () {
  function GMCryptoUtils(gmWebsocketServerAddress) {
    (0, _classCallCheck2.default)(this, GMCryptoUtils);
    this.websocketServerAddress = gmWebsocketServerAddress; // save sendMessage to an array as a messages queue incase of websocket connection error
    // , to ensure send each message on exact one websocket connection 

    this.sendMessageArray = [];
  }

  (0, _createClass2.default)(GMCryptoUtils, [{
    key: "getGMHashVal",
    value: function getGMHashVal(plainData, cb) {
      this.getGMSm3HashValCB = cb;
      this.sm3PlainData = plainData;
      var sendMessage = "910|{\"method\":\"sm3init\",\"arguments\":\"\",\"callback\":\"sm3InitCB\"}";
      getGMBase(this, sendMessage);
    }
  }, {
    key: "getGMCertificate",
    value: function getGMCertificate(userID, cb) {
      this.getGMCertificateCB = cb;
      this.certUserID = userID;
      var sendMessage = "910|{\"method\":\"getPublicKeyCer\",\"arguments\":\"ID=".concat(this.certUserID, "\",\"callback\":\"getPublicKeyCerCB\"}");
      getGMBase(this, sendMessage);
    }
  }, {
    key: "getGMSignature",
    value: function getGMSignature(userID, plainData, cb) {
      this.getGMSignatureCB = cb;
      var sendMessage = "910|{\"method\":\"signMessage\",\"arguments\":\"ID=".concat(userID, "|Data=").concat(plainData, "\",\"callback\":\"signMessageCB\"}");
      getGMBase(this, sendMessage);
    }
  }]);
  return GMCryptoUtils;
}();

var _default = GMCryptoUtils;
exports.default = _default;
//# sourceMappingURL=gmCryptoUtils.js.map
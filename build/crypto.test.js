"use strict";

var _crypto = require("./crypto");

var _jsrsasign = require("jsrsasign");

describe('签名及签名验证测试', function () {
  //生成密钥对
  var kp1 = (0, _crypto.CreateKeyPair)("EC", "secp256r1");
  var kp2 = (0, _crypto.CreateKeyPair)("EC", "secp256r1");
  var ct1 = 'hello repchain1';
  var ct2 = 'hello repchain2';
  var alg = 'SHA1withECDSA';
  var s11 = (0, _crypto.Sign)(alg, kp1.prvKeyObj, ct1);
  var s12 = (0, _crypto.Sign)(alg, kp1.prvKeyObj, ct2); // 仅应用到当前 describe 块中的测试

  beforeEach(function () {});
  test('同一对密钥对相同内容的签名验证可以通过', function () {
    var r = (0, _crypto.verifySign)(alg, kp1.pubKeyObj, s11, ct1);
    expect(r).toBeTruthy();
  });
  test('同一对密钥对不同内容的签名验证不应通过', function () {
    var r = (0, _crypto.verifySign)(alg, kp1.pubKeyObj, s11, ct2);
    expect(r).toBeFalsy();
  });
  test('不同的密钥对相同内容的签名验证不应通过', function () {
    var r = (0, _crypto.verifySign)(alg, kp2.pubKeyObj, s11, ct1);
    expect(r).toBeFalsy();
  });
});
//# sourceMappingURL=crypto.test.js.map
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImportCertificate = exports.VerifyCertificateSignature = exports.CreateSelfSignedCertificate = exports.CreateCertificate = exports.GetCSRInfoFromPEM = exports.CreateCSR = exports.CalculateAddr = exports.VerifySign = exports.Sign = exports.GetKeyPEM = exports.ImportKey = exports.CreateKeypair = exports.GetHashVal = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _crypto = _interopRequireDefault(require("crypto"));

var _jsrsasign = require("jsrsasign");

var _moment = _interopRequireDefault(require("moment"));

var _coinstring = _interopRequireDefault(require("coinstring"));

var _lodash = _interopRequireDefault(require("lodash"));

var _gmCryptoUtils = _interopRequireDefault(require("./gmCryptoUtils"));

var _algorithmNames = _interopRequireDefault(require("./algorithmNames"));

var gmCUs = new _gmCryptoUtils.default("wss://localhost:9003");
/**
 * @callback gmGetHashCallback 
 * @param {string} sm3HashVal hex格式的国密算法哈希值
 */

/**
 * 根据指定的密码学哈希算法为给定数据计算哈希值
 * 
 * @param {!Object} getHashParams 计算哈希值所需参数
 * @param {Buffer | string} getHashParams.data 待对其计算哈希值的原数据
 * @param {string} [getHashParams.alg] 待使用的密码学哈希算法，默认为sha256
 * @param {string} [getHashParams.provider] 密码学哈希算法的提供者，支持nodecrypto、jsrsasign以及gm
 * <li>nodecrypto，NodeJS内建的crypto工具，默认使用该provider，支持openssl提供的hash算法，
 *   可在终端使用命令`openssl list-message-digest-algorithms`(1.0.2版)
 *   或`openssl list -digest-algorithms`(1.1.0版)查看支持的哈希算法
 * </li>
 * <li>jsrsasign，开源js加密工具(https://kjur.github.io/jsrsasign),
 *   支持的哈希算法如<a href=https://kjur.github.io/jsrsasign/api/symbols/KJUR.crypto.MessageDigest.html>
 * https://kjur.github.io/jsrsasign/api/symbols/KJUR.crypto.MessageDigest.html<a/>所示
 * </li>
 * <li>gm，国密算法加密工具，支持sm3哈希算法
 * </li>
 * @param {gmGetHashCallback} [getHashParams.cb] sm3计算服务为异步实现，当使用sm3时需提供回调方法
 * @returns {Buffer} digest 结果哈希值，若使用sm3将返回undefined
 */

var GetHashVal = function GetHashVal(_ref) {
  var data = _ref.data,
      _ref$alg = _ref.alg,
      alg = _ref$alg === void 0 ? "sha256" : _ref$alg,
      _ref$provider = _ref.provider,
      provider = _ref$provider === void 0 ? "nodecrypto" : _ref$provider,
      cb = _ref.cb;

  if (!Buffer.isBuffer(data) && !_lodash.default.isString(data)) {
    throw new TypeError("The data field should be a Buffer or string");
  }

  if (!_lodash.default.isString(alg)) throw new TypeError("The alg field should be a string");
  var providerEnumVals = ["nodecrypto", "jsrsasign", "gm"];

  if (_lodash.default.indexOf(providerEnumVals, provider) === -1) {
    throw new RangeError("The provider field should be one of ".concat(providerEnumVals));
  }

  var hash;
  var digest;
  if (alg === "sm3" && provider !== "gm") throw new Error("当使用sm3时，必须指定provider为gm");
  if (alg !== "sm3" && provider === "gm") throw new Error("gm provider只支持sm3算法");

  switch (provider) {
    case "nodecrypto":
      // 使用NodeJS自带crypto工具计算哈希值
      // 支持的哈希算法更多
      hash = _crypto.default.createHash(alg);
      hash.update(data);
      digest = hash.digest();
      break;

    case "jsrsasign":
      hash = new _jsrsasign.KJUR.crypto.MessageDigest({
        alg: alg,
        prov: "cryptojs"
      }); // data = Buffer.isBuffer(data) ? data.toString() : data;
      // 兼容经browserify或webpack处理后，Buffer在Browser (Uint8Array)端的相关操作
      // data = data.constructor.name !== 'String' ? Buffer.from(data).toString() : data;

      hash.updateString(Buffer.from(data).toString());
      digest = Buffer.from(hash.digest(), "hex");
      break;

    case "gm":
      // data = Buffer.isBuffer(data) ? data.toString('hex') :
      //     Buffer.from(data).toString('hex');
      gmCUs.getGMHashVal(Buffer.from(data).toString("hex"), cb);
      break;

    default:
      throw new Error("Not supported hash algorithm provider");
  }

  return digest;
};
/**
 * 创建非对称密钥对，支持RSA与EC密钥对生成
 * 
 * @param {string} [alg] 密钥对生成算法，RSA或EC，默认使用EC
 * @param {string | number} [keyLenOrCurve] 指定密钥长度（针对RSA）或曲线名（针对EC），
 * 默认使用EC secp256k1曲线
 * @returns {Object} keypair 含有jsrsasign提供的prvKeyObj与pubKeyObj对象
 */


exports.GetHashVal = GetHashVal;

var CreateKeypair = function CreateKeypair() {
  var alg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "EC";
  var keyLenOrCurve = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "secp256k1";
  var algEnumTypes = ["EC", "RSA"];

  if (_lodash.default.indexOf(algEnumTypes, alg) === -1) {
    throw new RangeError("The alg param should be one of ".concat(algEnumTypes));
  }

  if (alg === "EC" && !_lodash.default.isString(keyLenOrCurve)) {
    throw new TypeError("The keyLenOrCurve param should be a string when use EC alg");
  }

  if (alg === "RSA" && !_lodash.default.isInteger(keyLenOrCurve)) {
    throw new TypeError("The keyLenOrCurve param should be an integer when use RSA alg");
  }

  var keypair = _jsrsasign.KEYUTIL.generateKeypair(alg, keyLenOrCurve);

  return keypair;
};
/**
 * 导入已有非对称密钥
 * 
 * @param {string} keyPEM 使用符合PKCS#8标准的pem格式私钥信息获取私钥对象，支持导入使用PBKDF2_HmacSHA1_3DES加密的pem格式私钥信息
 * 使用符合PKCS#8标准的pem格式公钥信息或符合X.509标准的pem格式证书信息获取公钥对象
 * @param {string} [passWord] 私钥保护密码, 当导入已加密私钥时，需要提供该参数
 * @returns {Object} keyObj密钥对象，prvkeyObj或pubKeyObj
 */


exports.CreateKeypair = CreateKeypair;

var ImportKey = function ImportKey(keyPEM, passWord) {
  if (!_lodash.default.isString(keyPEM)) throw new TypeError("The keyPEM param should be a string");
  if (passWord && !_lodash.default.isString(keyPEM)) throw new TypeError("The passWord param should be a string");
  var keyObj;

  try {
    keyObj = _jsrsasign.KEYUTIL.getKey(keyPEM, passWord);
  } catch (e) {
    if (e === "malformed plain PKCS8 private key(code:001)" || e.message === "Cannot read property 'sigBytes' of undefined" || e.message === "Cannot read property 'sigBytes' of null") {
      throw new Error("提供的私钥信息无效或解密密码无效");
    } else throw e;
  }

  return keyObj;
};
/**
 * 获得PEM格式的私钥或公钥信息
 * 
 * @param {Object} keyObj prvKeyObj或pubKeyObj
 * @param {string} [passWord] 私钥保护密码，当需要生成加密私钥信息时需提供该参数, 
 * 目前是由jsrsasign使用PBKDF2_HmacSHA1_3DES算法对私钥进行加密
 * @returns {string} keyPEM 符合PKCS#8标准的密钥信息
 */


exports.ImportKey = ImportKey;

var GetKeyPEM = function GetKeyPEM(keyObj, passWord) {
  if (passWord && !_lodash.default.isString(passWord)) throw new TypeError("The passWord param should be a string");
  var keyPEM;
  var key = keyObj;

  if (key.isPrivate) {
    keyPEM = _jsrsasign.KEYUTIL.getPEM(keyObj, "PKCS8PRV", passWord);
  } else {
    keyPEM = _jsrsasign.KEYUTIL.getPEM(keyObj);
  }

  return keyPEM;
};
/**
 * 
 * @callback gmSignCallback
 * @param {string} signature hex格式签名信息
 */

/**
 * 根据指定私钥和签名算法，对给定数据进行签名
 * 
 * @param {Object} signParams 签名所需参数
 * @param {Object | string} signParams.prvKey 私钥信息，支持使用jsrsasign提供的私钥对象，
 * 或直接使用符合PKCS#5的未加密pem格式DSA/RSA私钥，符合PKCS#8的未加密pem格式RSA/ECDSA私钥，当使用gm签名算法时该参数应为null
 * @param {string | Buffer} signParams.data 待被签名的数据
 * @param {string} [signParams.alg] 签名算法，默认使用"SHA1"(NodeJS)或"ecdsa-with-SHA1"(Browser)，
 * 国密签名算法为sm2-with-SM3
 * @param {string} [signParams.provider] 签名算法的提供者，支持使用jsrsasign或node内建的crypto(默认使用)，以及gm国密签名算法工具
 * @param {string} [signParams.gmUserID] 国密签名算法需要的用户标识，该标识是到gm websocket server查找到其对应国密私钥的唯一标识
 * @param {gmSignCallback} [signParams.cb] 国密签名算法支持为异步实现，当使用国密签名算法时，需要使用该回调方法
 * @returns {Buffer} signature 签名结果值，当使用非国密签名时，会返回该结果
 */


exports.GetKeyPEM = GetKeyPEM;

var Sign = function Sign(_ref2) {
  var prvKey = _ref2.prvKey,
      data = _ref2.data,
      _ref2$alg = _ref2.alg,
      alg = _ref2$alg === void 0 ? _algorithmNames.default : _ref2$alg,
      _ref2$provider = _ref2.provider,
      provider = _ref2$provider === void 0 ? "nodecrypto" : _ref2$provider,
      gmUserID = _ref2.gmUserID,
      cb = _ref2.cb;

  if (!Buffer.isBuffer(data) && !_lodash.default.isString(data)) {
    throw new TypeError("The data field should be a Buffer or string");
  }

  if (!_lodash.default.isString(alg)) throw new TypeError("The alg field should be a string");
  var providerEnumVals = ["nodecrypto", "jsrsasign", "gm"];

  if (_lodash.default.indexOf(providerEnumVals, provider) === -1) {
    throw new RangeError("The provider field should be one of ".concat(providerEnumVals));
  }

  if (gmUserID && !_lodash.default.isString(gmUserID)) throw new TypeError("The gmUserID should be a string");
  var sig;
  var signature;

  switch (provider) {
    case "nodecrypto":
      // 使用Node自带的crypto包进行签名
      // ps: 发现jsrsasign提供的签名工具包有bug:
      // 对普通数据签名时，在本地和RepChain端验签都ok,
      // 但是，当对一个哈希值进行签名时，在本地验签成功，但在RepChain端验签失败
      sig = _crypto.default.createSign(alg);
      sig.update(data);
      signature = sig.sign((0, _typeof2.default)(prvKey) === "object" ? GetKeyPEM(prvKey) : prvKey);
      break;

    case "jsrsasign":
      sig = new _jsrsasign.KJUR.crypto.Signature({
        alg: alg
      }); // alg = <hash>wth<crypto> like: SHA1withECDSA

      sig.init(prvKey); // let dataTBS = Buffer.isBuffer(data) ? data.toString() : data;
      // 兼容经browserify或webpack处理后，Buffer在Browser (Uint8Array)端的相关操作

      sig.updateString(Buffer.from(data).toString());
      signature = Buffer.from(sig.sign(), "hex");
      break;

    case "gm":
      // data = Buffer.isBuffer(data) ? data.toString('base64') :
      //     Buffer.from(data).toString('base64');
      // 兼容经browserify或webpack处理后，Buffer在Browser (Uint8Array)端的相关操作
      gmCUs.getGMSignature(gmUserID, Buffer.from(data).toString("base64"), cb);
      break;

    default:
      throw new Error("Not supported sign provider");
  }

  return signature;
};
/**
 * 验证签名
 * 
 * @param {Object} verifySignatureParams 验证签名所需参数
 * @param {Object | string} verifySignatureParams.pubKey 公钥信息，支持使用jsrsasign提供的公钥对象，
 * 或直接使用符合PKCS#8的pem格式DSA/RSA/ECDSA公钥，符合X.509的PEM格式包含公钥信息的证书
 * @param {Buffer} verifySignatureParams.sigValue 签名结果
 * @param {string | Buffer} verifySignatureParams.data 被签名的原数据
 * @param {string} [verifySignatureParams.alg] 签名算法，默认使用"SHA1"(NodeJS)或"ecdsa-with-SHA1"(Browser)
 * @param {string} [verifySignatureParams.provider] 签名算法的提供者，
 * 支持使用jsrsasign或node内建的crypto(默认使用)，待支持使用国密算法提供者
 * @returns {boolean} isValid 签名真实性鉴定结果
 */


exports.Sign = Sign;

var VerifySign = function VerifySign(_ref3) {
  var pubKey = _ref3.pubKey,
      sigValue = _ref3.sigValue,
      data = _ref3.data,
      _ref3$alg = _ref3.alg,
      alg = _ref3$alg === void 0 ? _algorithmNames.default : _ref3$alg,
      _ref3$provider = _ref3.provider,
      provider = _ref3$provider === void 0 ? "nodecrypto" : _ref3$provider;

  if (!Buffer.isBuffer(sigValue)) {
    throw new TypeError("The sigValue field should be a Buffer");
  }

  if (!Buffer.isBuffer(data) && !_lodash.default.isString(data)) {
    throw new TypeError("The data field should be a Buffer or string");
  }

  if (!_lodash.default.isString(alg)) throw new TypeError("The alg field should be a string");
  var providerEnumVals = ["nodecrypto", "jsrsasign"];

  if (_lodash.default.indexOf(providerEnumVals, provider) === -1) {
    throw new RangeError("The provider field should be one of ".concat(providerEnumVals));
  }

  var isValid;

  switch (provider) {
    case "nodecrypto":
      isValid = _crypto.default.createVerify(alg).update(data).verify((0, _typeof2.default)(pubKey) === "object" ? GetKeyPEM(pubKey) : pubKey, sigValue);
      break;

    case "jsrsasign":
      isValid = new _jsrsasign.KJUR.crypto.Signature({
        alg: alg
      });
      isValid.init(pubKey);
      isValid.updateString(Buffer.from(data).toString());
      isValid = isValid.verify(sigValue.toString("hex"));
      break;
    // Todo: case '国密'

    default:
      throw new Error("Not supported sign provider");
  }

  return isValid;
};
/**
 * 根据公钥信息计算其bitcoin地址
 * 
 * @param {!string} pubKeyPEM 符合PKCS#8标准的pem格式公钥信息，或符合X.509标准的公钥证书信息，目前只支持EC-secp256k1曲线
 * @returns {Buffer} bitcoin地址的Buffer数据
 */


exports.VerifySign = VerifySign;

var CalculateAddr = function CalculateAddr(pubKeyPEM) {
  // TODO: 支持其它非对称算法公钥的地址计算
  if (!_lodash.default.isString(pubKeyPEM)) throw new TypeError("The pubKeyPEM param should be a string");
  var pubKeySha256 = GetHashVal({
    data: Buffer.from(ImportKey(pubKeyPEM).pubKeyHex, "hex"),
    alg: "sha256"
  });
  var pubKeyRmd160 = GetHashVal({
    data: pubKeySha256,
    alg: "rmd160"
  });

  var addr = _coinstring.default.encode(pubKeyRmd160, 0x00);

  return Buffer.from(addr);
};
/**
 * 生成PEM格式的证书签名请求(Certificate Signing Request, CSR)信息
 * 
 * @param {Object} params 生成csr所需参数
 * @param {string} params.subject 证书拥有者唯一标识名
 * @param {string} params.subjectPubKey 证书拥有者PEM格式的公钥信息
 * @param {string} params.signAlg 生成csr的签名算法 
 * @param {string} params.subjectPrvKey 证书拥有者PEM格式的私钥信息(无加密)
 * @returns {string} PEM格式的csr信息
 */


exports.CalculateAddr = CalculateAddr;

var CreateCSR = function CreateCSR(_ref4) {
  var subject = _ref4.subject,
      subjectPubKey = _ref4.subjectPubKey,
      signAlg = _ref4.signAlg,
      subjectPrvKey = _ref4.subjectPrvKey;
  return _jsrsasign.KJUR.asn1.csr.CSRUtil.newCSRPEM({
    subject: {
      str: subject
    },
    sbjpubkey: subjectPubKey,
    sigalg: signAlg,
    sbjprvkey: subjectPrvKey
  });
};
/**
 * 从PEM格式的csr中获取csr信息 
 * 
 * @param {string} csrPEM PEM格式的csr信息
 * @returns {Object} csrInfo 解析后的csr信息(JSON)
 * csrInfo.pubkey.obj - 证书拥有者公钥对象(jsrsasign提供的RSAKey, KJUR.crypto.{ECDSA,DSA}) 
 * csrInfo.pubkey.hex - 证书拥有者公钥的hex格式
 * csrInfo.subject.name - 证书拥有者唯一标识名
 * csrInfo.subject.hex - 证书拥有者唯一标识名的hex格式
 */


exports.CreateCSR = CreateCSR;

var GetCSRInfoFromPEM = function GetCSRInfoFromPEM(csrPEM) {
  return _jsrsasign.KJUR.asn1.csr.CSRUtil.getInfo(csrPEM);
};
/**
 * @callback gmCertificateCallback
 * @param {string} certPEM pem格式证书
 */

/**
 * 生成符合X.509标准的证书信息
 * 
 * @param {Object} certFields 证书的具体信息，
 * @param {number} certFields.serialNumber 证书序列号
 * @param {string} certFields.sigAlg 签发证书时使用的签名算法
 * @param {string} certFields.issuerDN 符合X500标准的代表证书发行方身份标识的Distinguished Name
 * @param {string} certFields.subjectDN 符合X500标准的代表证书拥有方标识的Distinguished Name
 * @param {number} certFields.notBefore 代表证书有效性起始时间的unix时间戳（秒）
 * @param {number} certFields.notAfter 代表证书有效性终止时间的unix时间戳（秒）
 * @param {Object} certFields.subjectPubKey 证书拥有方的公钥对象，使用jsrsasign提供的pubKeyObj
 * @param {Object} certFields.issuerPrvKey 证书发行方的私钥对象，使用jsrsasign提供的prvKeyObj
 * @param {Object} [certFields.extensions] 证书扩展，jsrsasign支持的扩展属性(https://kjur.github.io/jsrsasign/api/symbols/KJUR.asn1.x509.TBSCertificate.html#appendExtension)，
 * 如：
 * {
 *     BasicConstraints: { cA: true, critical: true }, 
 *     KeyUsage: { names: ["digitalSignature", "keyCertSign"] },
 *     AuthorityKeyIdentifier: {kid: "1234ab..."},
 *     SubjectAltName: {critical: true, array: [{uri: "http://aaa.com"}, {uri: "http://bbb.com"}]}
 * } 
 * @param {string} [certFields.gmUserID] 证书拥有者的id标识, 当creator为gm时，需要该属性，并且不需要其他属性；
 * 当creator为jsrsasign时，不需要该属性
 * @param {string} [creator] 证书生成者，支持使用jsrsasign或gm(即国密)，默认使用jsrsasign
 * @param {gmCertificateCallback} [cb] 回调函数，gm证书生成实现是异步的，所以当creator为gm时，需要提供该参数
 * @returns {string} certPEM pem格式的证书信息，当creator为jsrsasign时，将返回该信息
 */


exports.GetCSRInfoFromPEM = GetCSRInfoFromPEM;

var CreateCertificate = function CreateCertificate(certFields) {
  var creator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "jsrsasign";
  var cb = arguments.length > 2 ? arguments[2] : undefined;
  var tbs = new _jsrsasign.KJUR.asn1.x509.TBSCertificate();
  var cert;

  switch (creator) {
    case "jsrsasign":
      tbs.setSerialNumberByParam({
        int: certFields.serialNumber
      });
      tbs.setSignatureAlgByParam({
        name: certFields.sigAlg
      });
      tbs.setIssuerByParam({
        str: certFields.issuerDN
      });
      tbs.setSubjectByParam({
        str: certFields.subjectDN
      });
      tbs.setNotBeforeByParam({
        str: "".concat(_moment.default.unix(certFields.notBefore).utc().format("YYYYMMDDHHmmss"), "Z")
      });
      tbs.setNotAfterByParam({
        str: "".concat(_moment.default.unix(certFields.notAfter).utc().format("YYYYMMDDHHmmss"), "Z")
      });
      tbs.setSubjectPublicKey(certFields.subjectPubKey);

      for (var extField in certFields.extensions) {
        if (Object.prototype.hasOwnProperty.call(certFields.extensions, extField)) {
          tbs.appendExtensionByName(extField, certFields.extensions[extField]);
        }
      }

      cert = new _jsrsasign.KJUR.asn1.x509.Certificate({
        tbscertobj: tbs,
        prvkeyobj: certFields.issuerPrvKey
      });
      cert.sign();
      return cert.getPEMString();

    case "gm":
      gmCUs.getGMCertificate(certFields.gmUserID, cb);
      return null;

    default:
      throw new Error("Not supported certificate creator ", creator);
  }
};
/**
 * 生成符合X.509标准的自签名证书信息
 * 
 * @param {Object} certFields 证书具体信息
 * @param {number} certFields.serialNumber 证书序列号
 * @param {string} certFields.sigAlg 证书签名算法
 * @param {string} certFields.DN 符合X500标准的代表证书所有者身份标识的Distinguished Name
 * @param {number} certFields.notBefore 代表证书有效性起始时间的unix时间戳
 * @param {number} certFields.notAfter 代表证书有效性终止时间的unix时间戳
 * @param {Object} certFields.keypair 证书拥有方的密钥对，含有jsrsasign提供的prvKeyObj和pubKeyObj对象
 * @param {Object} [certFields.extensions] v3证书扩展属性
 * @returns {string} certPEM pem格式的自签名证书信息
 */


exports.CreateCertificate = CreateCertificate;

var CreateSelfSignedCertificate = function CreateSelfSignedCertificate(certFields) {
  var certFieldsCoverted = {
    serialNumber: certFields.serialNumber,
    sigAlg: certFields.sigAlg,
    subjectDN: certFields.DN,
    issuerDN: certFields.DN,
    notBefore: certFields.notBefore,
    notAfter: certFields.notAfter,
    subjectPubKey: certFields.keypair.pubKeyObj,
    issuerPrvKey: certFields.keypair.prvKeyObj,
    extensions: certFields.extensions
  };
  var certPEM = CreateCertificate(certFieldsCoverted);
  return certPEM;
};
/**
 * 导入已有的公钥证书信息
 * 
 * @param {string} certPEM 符合X.509标准的公钥证书信息
 * @returns {Object} x509 jsrsasign提供的X509对象实例
 */


exports.CreateSelfSignedCertificate = CreateSelfSignedCertificate;

var ImportCertificate = function ImportCertificate(certPEM) {
  var x509 = new _jsrsasign.X509();
  x509.readCertPEM(certPEM);

  var getUnixTimestamp = function getUnixTimestamp(notBeforeOrNotAfterFormatTimestampStr) {
    var format = notBeforeOrNotAfterFormatTimestampStr.length === 15 ? "YYYYMMDDHHmmssZ" : "YYMMDDHHmmssZ";
    return _moment.default.utc(notBeforeOrNotAfterFormatTimestampStr, format).unix();
  };

  x509.getNotBeforeUnixTimestamp = function () {
    return getUnixTimestamp(x509.getNotBefore());
  };

  x509.getNotAfterUnixTimestamp = function () {
    return getUnixTimestamp(x509.getNotAfter());
  };

  return x509;
};
/**
 * 验证证书签名信息
 * 
 * @param {string} certPEM 符合X509标准的公钥证书信息
 * @param {Object} pubKey 证书签发者的公钥对象
 * @returns {boolean} 证书签名验证结果
 */


exports.ImportCertificate = ImportCertificate;

var VerifyCertificateSignature = function VerifyCertificateSignature(certPEM, pubKey) {
  var x509 = ImportCertificate(certPEM);
  return x509.verifySignature(pubKey);
};

exports.VerifyCertificateSignature = VerifyCertificateSignature;
//# sourceMappingURL=crypto.js.map
"use strict";

var _crypto = _interopRequireDefault(require("crypto"));

var _jsrsasign = _interopRequireWildcard(require("jsrsasign"));

var _jsrsasignUtil = _interopRequireDefault(require("jsrsasign-util"));

var _v = _interopRequireDefault(require("uuid/v1"));

var _moment = _interopRequireDefault(require("moment"));

var _setting = _interopRequireDefault(require("./setting"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var settings = new _setting.default();

var getHashBytes = function getHashBytes(alg, data) {
  var hash = _crypto.default.createHash(alg);

  hash.update(data);
  return hash.digest();
};

exports.Sum = function sum(a, b) {
  return a + b;
};
/**
 * Sign data with private key
 * @param alg 算法
 * @param prvKey 私钥
 * @param data 签名的数据
 * @return
 */


exports.Sign = function (alg, prvKey, data) {
  var sig = new _jsrsasign.KJUR.crypto.Signature({
    'alg': alg
  });
  sig.init(prvKey);
  sig.updateString(data);
  var sigValueHex = sig.sign();
  return sigValueHex;
};
/**
 * 鉴定签名是否正确
 * @param alg 算法
 * @param pubKey 公钥
 * @param sigValueHex 签名后的数据
 * @param data 签名的数据
 * @return result true or false
 */


exports.verifySign = function (alg, pubKey, sigValueHex, data) {
  var sig = new _jsrsasign.KJUR.crypto.Signature({
    'alg': alg
  });
  sig.init(pubKey);
  sig.updateString(data);
  var isValid = sig.verify(sigValueHex);
  return isValid;
};

var savePrvKeyFile = function savePrvKeyFile(file_name, prv_key_hex) {
  _jsrsasignUtil.default.saveFileBinByHex(file_name, prv_key_hex);
};

var saveCertFile = function saveCertFile(file_name, cert_pem) {
  _jsrsasignUtil.default.saveFile(file_name, cert_pem);
}; //鉴定私钥的密码是否正确


var VerifyPrvKeyWithPass = function VerifyPrvKeyWithPass(prv_key_pem, password) {
  var result;

  try {
    _jsrsasign.KEYUTIL.getKey(prv_key_pem, password);

    result = true;
  } catch (e) {
    console.log(e);
    result = false;
  }

  return result;
}; //Create key pair with ECCDSA (secp256r1)
//Meanwhile save encrypted PSK#8 PEM private key in a local binary file 


var CreateKeyPair = function CreateKeyPair(alg, keylenOrCurve) {
  var key_pair = _jsrsasign.KEYUTIL.generateKeypair(alg, keylenOrCurve);

  return key_pair;
};

var CreatePrvKeyByImport = function CreatePrvKeyByImport(prv_key_pem2hex, identity) {
  return _jsrsasign.default.hextopem(prv_key_pem2hex, 'ENCRYPTED PRIVATE KEY');
}; //Generate X509 PEM certificate signed by self
//With keyPair info created within CreateKeyPair functionality


var GenCertificateWithPemPrvKey = function GenCertificateWithPemPrvKey(password, user_info, prv_key_pem) {
  var certificate_file_save_location = settings.certificate_file_location;
  if (!VerifyPrvKeyWithPass(prv_key_pem, password)) throw new Error('解密私钥失败');

  var prv_key_obj = _jsrsasign.KEYUTIL.getKey(prv_key_pem, password);

  var pub_key_obj = _jsrsasign.KEYUTIL.getKey({
    xy: prv_key_obj.pubKeyHex,
    curve: 'secp256k1'
  });

  var tbs = new _jsrsasign.KJUR.asn1.x509.TBSCertificate();
  tbs.setSerialNumberByParam({
    'int': parseInt((0, _v.default)().replace(/-/g, ''), 16)
  });
  tbs.setSignatureAlgByParam({
    'name': 'SHA256withECDSA'
  });
  var issuer_str = '/CN=PicCopyRightRegisterAPP/C=China/OU=SDR/O=ISCAS/L=BJ';
  var uer_str = '/CN=PicCopyRightRegisterUer/C=China';
  tbs.setIssuerByParam({
    'str': issuer_str
  });
  tbs.setSubjectByParam({
    'str': uer_str
  });
  tbs.setSubjectPublicKey(pub_key_obj);

  var time = _moment.default.utc();

  tbs.setNotBeforeByParam({
    'type': 'gen',
    'str': time.format('YYYYMMDDhhmmss') + 'Z'
  });
  time = _moment.default.utc(time).year(time.year() + 1);
  tbs.setNotAfterByParam({
    'type': 'gen',
    'str': time.format('YYYYMMDDhhmmss') + 'Z'
  });
  var cert = new _jsrsasign.KJUR.asn1.x509.Certificate({
    'tbscertobj': tbs,
    'prvkeyobj': prv_key_obj
  });
  cert.sign();
  var cert_pem = cert.getPEMString();
  console.log("cert_pem: ", cert_pem);
  var identity = user_info.phone;
  return cert_pem;
};

var GenCertificateWithBinPrvkeyFile = function GenCertificateWithBinPrvkeyFile(password, user_info) {
  var identity = user_info.phone;

  var prv_key_hex = _jsrsasignUtil.default.readFileHexByBin(settings.prvkey_file_location + '/' + identity + '.prvkey');

  var prv_key_pem = _jsrsasign.default.hextopem(prv_key_hex, 'ENCRYPTED PRIVATE KEY');

  return GenCertificateWithPemPrvKey(password, user_info, prv_key_pem);
};

exports.VerifyPrvKeyWithPass = VerifyPrvKeyWithPass;
exports.CreateKeyPair = CreateKeyPair;
exports.CreatePrvKeyByImport = CreatePrvKeyByImport;
exports.GenCertificateWithPemPrvKey = GenCertificateWithPemPrvKey;
exports.GenCertificateWithBinPrvkeyFile = GenCertificateWithBinPrvkeyFile;
//# sourceMappingURL=crypto.js.map
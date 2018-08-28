import crypto from 'crypto';
import {KEYUTIL, KJUR} from 'jsrsasign';
import Jsrsasign from 'jsrsasign';
import JsrsasignUtil from 'jsrsasign-util';
import Uuidv1 from 'uuid/v1';
import Moment from 'moment';
import Settings from './setting';

let settings = new Settings();

/**
 * To apply some specific cryptography hash algorithm on given data
 * @param alg the specific cryptography hash algorithm
 * @param data the given data
 * @return the cryptography hash value in Bytes/Buffer format
 */
exports.GetHashBytes = function (alg, data) {
    let hash = crypto.createHash(alg);
    hash.update(data);
    return hash.digest();
}

exports.Sum = function sum(a, b) {
    return a + b;
}

/**
 * To sign the given data with specific signature algorithm and private key
 * @param alg 算法
 * @param prvKey 私钥
 * @param data 待签名的数据
 * @return the signature result in hex string format
 */
exports.Sign = function (alg, prvKey, data) {
    let sig = new KJUR.crypto.Signature({'alg':alg});
    sig.init(prvKey);
    sig.updateString(data);
    let sigHexValue = sig.sign();
    return sigHexValue;
}

// For test
exports.SignBytes = function (alg, prvKeyPem, bytesData){
    let sig = crypto.createSign(alg)
    sig.update(bytesData)
    let sigBytesValue = sig.sign({key: prvKeyPem})
    return sigBytesValue
}

/**
 * 鉴定签名是否正确
 * @param alg 签名算法
 * @param pubKey 公钥
 * @param sigValue 签名后的数据
 * @param data 被签名的原数据
 * @return result true or false
 */
exports.VerifySign = function (alg, pubKey, sigValue, data) {
    let sig = new KJUR.crypto.Signature({'alg':alg});
    sig.init(pubKey);
    sig.updateString(data);
    let isValid = sig.verify(sigValue);
    return isValid;
}

const SavePrvKeyFile = function (file_name, prv_key_hex) {
    JsrsasignUtil.saveFileBinByHex(file_name, prv_key_hex);
}

const SaveCertFile = function (file_name, cert_pem) {
    JsrsasignUtil.saveFile(file_name, cert_pem);
}

//鉴定私钥的密码是否正确
const VerifyPrvKeyWithPass = function (prv_key_pem, password) {
    let result;
    try {
        KEYUTIL.getKey(prv_key_pem, password)
        result = true;
    }
    catch (e) {
        console.log(e)
        result = false;
    }
    return result;
}

//Create key pair with ECCDSA (secp256r1)
//Meanwhile save encrypted PSK#8 PEM private key in a local binary file 
const CreateKeyPair = function (alg, keylenOrCurve) {
    let key_pair = KEYUTIL.generateKeypair(alg, keylenOrCurve);
    return key_pair;
}

const CreatePrvKeyByImport = function (prv_key_pem2hex, identity) {
    return Jsrsasign.hextopem(prv_key_pem2hex, 'ENCRYPTED PRIVATE KEY');
}

//Generate X509 PEM certificate signed by self
//With keyPair info created within CreateKeyPair functionality
const GenCertificateWithPemPrvKey = function (password, user_info, prv_key_pem) {
    let certificate_file_save_location = settings.certificate_file_location;
    if (!VerifyPrvKeyWithPass(prv_key_pem, password))
        throw new Error('解密私钥失败');
    let prv_key_obj = KEYUTIL.getKey(prv_key_pem, password);

    let pub_key_obj = KEYUTIL.getKey({xy: prv_key_obj.pubKeyHex, curve: 'secp256k1'});
    let tbs = new KJUR.asn1.x509.TBSCertificate();
    tbs.setSerialNumberByParam({'int': parseInt(Uuidv1().replace(/-/g, ''), 16)});
    tbs.setSignatureAlgByParam({'name': 'SHA256withECDSA'});
    let issuer_str = '/CN=PicCopyRightRegisterAPP/C=China/OU=SDR/O=ISCAS/L=BJ';
    let uer_str = '/CN=PicCopyRightRegisterUer/C=China';
    tbs.setIssuerByParam({'str': issuer_str});
    tbs.setSubjectByParam({'str': uer_str});
    tbs.setSubjectPublicKey(pub_key_obj);
    let time = Moment.utc();
    tbs.setNotBeforeByParam({'type': 'gen', 'str': time.format('YYYYMMDDhhmmss') + 'Z'});
    time = Moment.utc(time).year(time.year() + 1);
    tbs.setNotAfterByParam({'type': 'gen', 'str': time.format('YYYYMMDDhhmmss') + 'Z'});

    let cert = new KJUR.asn1.x509.Certificate({'tbscertobj': tbs, 'prvkeyobj': prv_key_obj});
    cert.sign();
    let cert_pem = cert.getPEMString();

    console.log("cert_pem: ", cert_pem);

    const identity = user_info.phone;
    return cert_pem;
}


const GenCertificateWithBinPrvkeyFile = function (password, user_info) {

    const identity = user_info.phone;
    let prv_key_hex = JsrsasignUtil.readFileHexByBin(settings.prvkey_file_location + '/' + identity + '.prvkey');
    let prv_key_pem = Jsrsasign.hextopem(prv_key_hex, 'ENCRYPTED PRIVATE KEY');

    return GenCertificateWithPemPrvKey(password, user_info, prv_key_pem);
}


exports.VerifyPrvKeyWithPass = VerifyPrvKeyWithPass;
exports.CreateKeyPair = CreateKeyPair;
exports.CreatePrvKeyByImport = CreatePrvKeyByImport;
exports.GenCertificateWithPemPrvKey = GenCertificateWithPemPrvKey;
exports.GenCertificateWithBinPrvkeyFile = GenCertificateWithBinPrvkeyFile;
var rp = require('request-promise');
const fs = require('fs');

class RestAPI {
    /**
     * 
     * @param {*} address 服务地址
     */
    constructor(address) {
        this._address = address;
    }
    /**
     * 返回含区块高度的概要信息
     */
    chaininfo() {
        var url = this._address + 'chaininfo';
        return rp({
            "method": "GET",
            "uri": url,
            "json": true
        })
    }
    //TODO repChain应该提供流式接口,走protobuf序列化
    /**
     * 根据区块高度获取区块数据
     * @param {*} height 区块高度
     */
    block(height) {
        var url = this._address + 'block/' + height;
        return rp({
            "method": "GET",
            "uri": url,
            "json": true
        })
    }

    blockStream(height) {
        var url = this._address + 'block/stream/' + height;
        return rp({
            "method": "GET",
            "uri": url,
            encoding: null
        })
    }

    /**
     * 发送签名交易给RepChain节点
     * @param {Buffer | String} tx 待发送的交易，支持使用交易字节流数据或对其hex格式编码后的字符串
     * @returns {Promise} rp 接收交易后RepChain节点的返回信息
     */
    sendTX(tx) {
        let options
        if (Buffer.isBuffer(tx)) {
            // Todo: 待完成提交字节流形式的交易数据

             // 判断运行环境
             if (typeof window !== 'undefined' && typeof window.document !== 'undefined') {
                const signedTrans = new Blob([tx]);
                let xhr = new XMLHttpRequest();
                let formData = new FormData();
                formData.append('signedTrans', signedTrans, false);

                return new Promise((resolve, reject) => {
                    xhr.open('POST', this._address + 'transaction/postTranStream');
                    xhr.onload = () => {
                        if (xhr.status === 200)
                            resolve(xhr.response);
                        else
                            reject(xhr.statusText);
                    };
                    xhr.onerror = () => {
                        reject(xhr.statusText);
                    };
                    xhr.send(formData);
                });
            }
            else {
                // signedTrans需要为文件流数据，但没找到更好的实现方法，
                // 目前是先将tx写入本地文件，再获取其ReadStream
                fs.writeFileSync('tx', tx);
                const signedTrans = fs.createReadStream('tx');
                options = {
                    method: 'POST',
                    uri: this._address + 'transaction/postTranStream',
                    formData: {
                        signedTrans: signedTrans
                    },
                }
            }
        }
        else {
            options = {
                method: 'POST',
                uri: this._address + 'transaction/postTranByString',
                body: tx,
                headers: {
                    'content-type': 'application/json',
                },
                json: true,
            }
        }
        return rp(options);
    }
}
module.exports.RestAPI = RestAPI;
/**
 * 实现在Browser端通过RestAPI向RepChain节点提交已签名的交易数据
 *
 * @param {Object} { tx, address } 所需参数对象，其中
 * - {Buffer | String} tx 待提交的已签名交易数据，可为Buffer类型或hex编码的String类型
 * - {String} address RepChain节点的网络地址
 * @returns {Promise} * 该Promise将返回RepChain节点的反馈信息
 */
const restSendTX = ({ tx, address }) => {
    // let xhr = new XMLHttpRequest();
    // fetch支持promise，且其使用比XMLHttpRequest更简单
    if (Buffer.isBuffer(tx)) {
        let formData = new FormData();
        formData.append('signedTrans', new Blob([tx]));
        return fetch(address + 'transaction/postTranStream', {
            method: 'POST',
            mode: 'cors',
            body: formData
        }).then(r => r.json()); 
    }
    else if (tx.constructor.name === 'String'){
        return fetch(address + 'transaction/postTranByString', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(tx) // Note: 如果先JSON.stringify()，直接使用原数据的话会返回400（Bad Request), why?
        }).then(r => r.json());
    }
    else
        throw new TypeError(`Bad tx type: ${tx.constructor.name}, need Buffer or String`);
}

module.exports = restSendTX;

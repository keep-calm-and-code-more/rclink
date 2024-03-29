import rp from "request-promise";
import _ from "lodash";
import validator from "validator";


/**
 * 实现在Node端通过RestAPI从Repchain节点获取数据信息
 * 
 * @param {string} url RepChain Restful API url
 * @returns {Promise<Object> | Promise<Buffer>} 返回json对象或二进制数据
 * @memberof RestAPI
 * @private
 */
const restGet = (url) => {
    if (!_.isString(url) || !validator.isURL(url, { require_tld: false })) {
        throw new Error("The url param should be a string url");
    }

    if (/\/stream\//.test(url)) {
        return rp({
            method: "GET",
            uri: url,
            encoding: null,
            timeout: 15000,
        }).then(res => Buffer.from(res));
    }
    return rp({
        method: "GET",
        uri: url,
        json: true,
        timeout: 15000,
    }).then(res => res.result); 
};

export default restGet;

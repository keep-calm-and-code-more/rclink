import _ from "lodash";
import validator from "validator";

/**
 * 实现在Browser端通过RestAPI从Repchain节点获取数据信息
 * 
 * @param {string} url RepChain Restful API url
 * @returns {Promise<Object> | Promise<Buffer>} 返回json对象或二进制数据
 * @memberof RestAPI
 * @private
 */
const restGet = (url) => {
    if (!_.isString(url) || !validator.isURL(url, { require_tld: false })) {
        throw new Error("The url param should be a url string");
    }

    if (/\/stream\//.test(url)) {
        return fetch(url).then(res => res.arrayBuffer()).then(res => Buffer.from(res));
    }
    return fetch(url).then(res => res.json()).then(res => res.result);
};

export default restGet;

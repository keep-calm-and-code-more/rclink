# RCNode

#### 项目介绍
RepChain Client library for Node.js，本项目是采用Node.js实现的DApp与[RepChain](https://gitee.com/BTAJL/repchain)组网之间的connector，
它对RepChain提供的websocket方式的Event订阅，以及Restful的API进行了封装，
帮助DApp开发者更容易实现：
- 与RepChain的数据同步：以Event订阅监听和同步新出块，以RestfulAPI主动发起缺失块同步
- 构造和提交签名交易：提供对符合RepChain的交易内容构造和签名提交

#### 使用说明（TODO)

1. `yarn add rclink` 或 `npm i --save rclink`
2. 事件订阅：const {EventTube} = require('rclink')

#### 软件架构
软件架构说明
![数据同步](https://gitee.com/BTAJL/RCNode/raw/master/doc/sync.png)
![提交交易](https://gitee.com/BTAJL/RCNode/raw/master/doc/commit.png)


#### 开发教程

1. 安装node.js和yarn
2. `yarn install`

#### 使用说明
1. 本机多节点方式启动RepChain组网
2. 生成与非es6标准兼容的生产代码: `yarn build`
3. 运行测试用例：
    - `yarn test:node` node环境下运行测试用例
    - `yarn test:browser` browser环境下运行测试用例
    - `yarn test` 在node与browser环境下分别运行测试用例
>>Note: 在test/testEnvConfig.js中可修改待测试的目标代码: testEnv="dev"(表示测试位于src/下的开发代码)；testEnv="production"(表示测试位于lib/下的生产代码)
4. 也支持VSCode下的test调试
5. API文档参考[这里](http://jaytsang.gitee.io/rcnodeapi/)



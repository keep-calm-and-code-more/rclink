# RCNode

#### 项目介绍
RepChain Client library for Node.js，本项目是采用Node.js实现的DApp与[RepChain](https://gitee.com/BTAJL/repchain)组网之间的connector，
它对RepChain提供的websocket方式的Event订阅，以及Restful的API进行了封装，
帮助DApp开发者更容易实现：
- 与RepChain的数据同步：以Event订阅监听和同步新出块，以RestfulAPI主动发起缺失块同步
- 构造和提交签名交易：提供对符合RepChain的交易内容构造和签名提交

#### 软件架构
软件架构说明
![数据同步](https://gitee.com/BTAJL/RCNode/raw/master/doc/sync.png)
![提交交易](https://gitee.com/BTAJL/RCNode/raw/master/doc/commit.png)


#### 安装教程

1. 安装node.js和yarn
2. yarn install

#### 使用说明

1. 运行测试用例：yarn test
2. 支持VSCode下的test调试


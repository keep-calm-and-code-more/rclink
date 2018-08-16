"use strict";

var _events = _interopRequireDefault(require("./events"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var protobuf = require("protobufjs");

var root = protobuf.loadSync("protos/peer.proto");
var Message = root.lookupType("rep.protos.Event");
var Block = root.lookupType("rep.protos.Block");
var et = new _events.default('ws://localhost:8081/event', function (evt) {
  //console.log(m);
  var ed = new Uint8Array(evt.data);
  var msg = Message.decode(ed);
  console.log(msg);
});
//# sourceMappingURL=index.js.map
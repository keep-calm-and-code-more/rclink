"use strict";

var protobuf = require("protobufjs");

var EventTube = require('./events');

var root = protobuf.loadSync("protos/peer.proto");
var Message = root.lookupType("rep.protos.Event");
var Block = root.lookupType("rep.protos.Block");
var et = new EventTube('ws://localhost:8081/event', function (evt) {
  //console.log(m);
  var ed = new Uint8Array(evt.data);
  var msg = Message.decode(ed);
  console.log(msg);
});
//# sourceMappingURL=index.js.map
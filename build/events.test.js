"use strict";

var _events = _interopRequireDefault(require("./events"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var protobuf = require("protobufjs");

describe('事件订阅与数据获取', function () {
  var Message, Block;
  beforeAll(function (done) {
    protobuf.load("protos/peer.proto", function (err, root) {
      if (err) {
        throw err;
      }

      Message = root.lookupType("rep.protos.Event");
      Block = root.lookupType("rep.protos.Block");
      done();
    });
  });
  test('订阅RepChain事件', function (done) {
    var cout = 0;
    var et = new _events.default('ws://localhost:8081/event', function (evt) {
      //console.log(m);
      var ed = new Uint8Array(evt.data);
      var msg = Message.decode(ed);
      console.log(msg);
      expect(msg.action).toBeGreaterThan(0);
      expect(msg.action).toBeLessThan(12);
      cout++;
      if (cout > 2) done();
    });
    expect(1 + 1).toBe(2);
  });
});
//# sourceMappingURL=events.test.js.map
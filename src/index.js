/*
const protobuf = require("protobufjs");
import EventTube from './events';

var root = protobuf.loadSync("protos/peer.proto");
var Message = root.lookupType("rep.protos.Event");
var Block = root.lookupType("rep.protos.Block");


var et = new EventTube('ws://localhost:8081/event',function(evt){
    //console.log(m);
    var ed = new Uint8Array(evt.data);
    var msg = Message.decode(ed);
    console.log(msg)
})            
*/
module.exports = {
    EventTube :  require('./events').default,
    Crypto: require('./crypto'),
    Transaction: require('./transaction').default,
    Rest: require('./rest').default
}
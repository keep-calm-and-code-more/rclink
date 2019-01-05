const EventT = require("./events").EventTube;
const Cryp = require("./crypto");
const Tx = require("./transaction").Transaction;
const { RestAPI } = require("./rest");

module.exports = {
    EventTube: EventT, 
    Crypto: Cryp,
    Transaction: Tx, 
    Rest: RestAPI,
};

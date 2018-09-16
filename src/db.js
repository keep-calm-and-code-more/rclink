let Dexie = require('dexie')

let db = new Dexie("BAR")

db.version(1).stores({
    users: "++id, &userName, &email",
    keypairs: "++id, &sn, alg, createdAt, status, ownerID",
    certificates: "++id, &sn, ownerID, &accountAddr, &keypairSN",
})

db.open().catch(e => {
    console.log("IndexDB open failed: ", e.stack)
})

// Init for test 
db.on('populate', () => {
    db.keypairs.add({sn: '9316EC91876CDEE5', alg: 'EC-scep256k1', createdAt: new Date(), status: true, ownerID: 1})
    db.keypairs.add({sn: '9416EC91876CDEE5', alg: 'EC-scep256k1', createdAt: new Date(), status: true, ownerID: 1})
    db.keypairs.add({sn: '9616EC91876CDEE5', alg: 'EC-scep256k1', createdAt: new Date(), status: true, ownerID: 2})
})


module.exports = db
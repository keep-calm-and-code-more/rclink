const {GetHashVal, CreateCertificate, Sign} = require('../src/crypto');

let sm3PlainData = "123";
GetHashVal(sm3PlainData, 'sm3', 'gm', (sm3HashVal) => {
    console.log(`got sm3 hash value: ${sm3HashVal} for plain data: ${sm3PlainData}`);
});

let userID = "user_test";
CreateCertificate({gmUserID: userID}, 'gm', (certPEM) => {
    console.log(`got gmCertPEM: ${certPEM} for user: ${userID}`);
});

let plainData = "plain text";
Sign(null, plainData, 'sm2-with-SM3', 'gm', userID, (signature) => {
    console.log(`got gmSignature: ${signature} for plainData: ${plainData} with userID: ${userID}`);
});

userID = "notRegYet";
Sign(null, plainData, 'sm2-with-SM3', 'gm', userID, (signature) => {
    console.log(`got gmSignature: ${signature} for plainData: ${plainData} with userID: ${userID}`);
});


 



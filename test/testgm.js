import testEnv from "./testEnvConfig";

const rclink = testEnv === "production"
    ? require("../lib")
    : require("../src");

const {
    GetHashVal,
    CreateCertificate,
    Sign,
    ImportCertificate,
} = rclink.Crypto;

$("button#get-sm3-hash-val-test").on("click", () => {
    const sm3PlainData = $("#sm3-plaindata").val();
    GetHashVal({ 
        data: sm3PlainData,
        alg: "sm3",
        provider: "gm",
        cb: (sm3HashVal) => {
            console.log(`got sm3 hash value: ${sm3HashVal} for plain data: ${sm3PlainData}`);
            $("#sm3-hash-val").val(sm3HashVal);
        }, 
    });
});

$("button#get-gm-cert-test").on("click", () => {
    const userID = $("#userid-get-gm-cert").val();
    CreateCertificate({ gmUserID: userID }, "gm", (certPEM) => {
        console.log(`got gmCertPEM: ${certPEM} for user: ${userID}`);
        const x509 = ImportCertificate(certPEM);
        $("#gm-cert-pem").val(certPEM);
        $("table#gm-cert-info tbody").empty();
        $("table#gm-cert-info tbody").append(`<tr class="table-warning"><td>版本</td><td style="word-wrap: break-word;">${x509.getVersion()}</td></tr>`);
        $("table#gm-cert-info tbody").append(`<tr class="table-active"><td>序列号Hex</td><td style="word-wrap: break-word;">${x509.getSerialNumberHex()}</td></tr>`);
        $("table#gm-cert-info tbody").append(`<tr class="table-success"><td>发行者</td><td style="word-wrap: break-word;">${x509.getIssuerString()}</td></tr>`);
        $("table#gm-cert-info tbody").append(`<tr class="table-active"><td>拥有者</td><td style="word-wrap: break-word;">${x509.getSubjectString()}</td></tr>`);
        $("table#gm-cert-info tbody").append(`<tr class="table-warning"><td>有效期起始时间</td><td style="word-wrap: break-word;">${x509.getNotBefore()}</td></tr>`);
        $("table#gm-cert-info tbody").append(`<tr class="table-active"><td>有效期终止时间</td><td style="word-wrap: break-word;">${x509.getNotAfter()}</td></tr>`);
        $("table#gm-cert-info tbody").append(`<tr class="table-success"><td>公钥Hex</td><td style="word-wrap: break-word;">${x509.getPublicKeyHex()}</td></tr>`);
        $("table#gm-cert-info tbody").append(`<tr class="table-warning"><td>签名算法</td><td style="word-wrap: break-word;">${x509.getSignatureAlgorithmField()}</td></tr>`);
        $("table#gm-cert-info tbody").append(`<tr class="table-danger"><td>签名Hex</td><td style="word-wrap: break-word;">${x509.getSignatureValueHex()}</td></tr>`);
    });
});

$("button#get-gm-signature-test").on("click", () => {
    const userID = $("#userid-get-gm-signature").val();
    const plainData = $("#plaindata-get-gm-signature").val();
    Sign({
        prvKey: null, 
        data: plainData, 
        alg: "sm2-with-SM3", 
        provider: "gm", 
        gmUserID: userID, 
        cb: (signature) => {
            console.log(`got gmSignature: ${signature} for plainData: ${plainData} with userID: ${userID}`);
            $("#gm-signature").val(signature);
        },
    });
});

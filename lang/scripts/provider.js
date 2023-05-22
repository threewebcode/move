const {JsonRpcProvider, TransactionBlock} = require("@mysten/sui.js");

const provider = new JsonRpcProvider();

const main = async () => {
    const tb = new TransactionBlock();
    tb.moveCall({
        target: "0x985fbb999e12f1c6956d8dafa0baab720a444473cd4705a882f24ec0b48454dc::devnet::get",
        arguments: []
    })
    const result = await provider.devInspectTransactionBlock({
        transactionBlock: tb,
        sender: "0x365cf841688cb756968b6c434f096a630377ef7e5e4fa7ff0c6583c888c961eb"
    });
    console.log(Buffer.from(result.results[0].returnValues[0][0]).toString());
}

main();
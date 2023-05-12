const {JsonRpcProvider, TransactionBlock} = require("@mysten/sui.js");

const provider = new JsonRpcProvider();

const main = async () => {
    const tb = new TransactionBlock();
    tb.moveCall({
        target: "0x34b5876122d0bfbb92fab2da0570880f9bb04b117867ec58c12e59e738859a9e::devnet::get",
        arguments: []
    })
    const result = await provider.devInspectTransactionBlock({
        transactionBlock: tb,
        sender: "0x365cf841688cb756968b6c434f096a630377ef7e5e4fa7ff0c6583c888c961eb"
    });
    console.log(Buffer.from(result.results[0].returnValues[0][0]).toString());
}

main();
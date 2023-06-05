const { JsonRpcProvider, devnetConnection,TransactionBlock, Ed25519Keypair, RawSigner, testnetConnection } = require("@mysten/sui.js");

function getProvider() {
    return new JsonRpcProvider(
        devnetConnection
        // testnetConnection
    );
}

function deriveKeyPair(mnemonics) {
    return Ed25519Keypair.deriveKeypair(mnemonics);
}

function getAddress(keypair) {
    return keypair.getPublicKey().toSuiAddress();
}

function getSigner(keypair, provider) {
    return new RawSigner(keypair, provider);
}

async function call() {
    const mnemonics = "path dawn point mass hollow surge identify pet velvet hover bar soccer";
    const keypair = deriveKeyPair(mnemonics);
    const address = getAddress(keypair);
    console.log("address: ", address);
    const provider = getProvider();
    const signer = getSigner(keypair, provider);
    const tx = new TransactionBlock();
    let target = "0xa42dcbc7cc86a14098dd8820fa05d6b191be043b7259ea02f26c66893cd137e0::devnet::get_name"
    tx.moveCall({
        target: target,
        typeArguments: ["0x2::sui::SUI"],
        arguments: [tx.pure("a42dcbc7cc86a14098dd8820fa05d6b191be043b7259ea02f26c66893cd137e0::devnet::Coin<0000000000000000000000000000000000000000000000000000000000000002::sui::SUI>")],
    });
    const txn = await signer.signAndExecuteTransactionBlock({
        transactionBlock: tx,
        options: {
        showEffects: false,
        showEvents: true,
        showObjectChanges: false,
        },
    });
    console.log(txn.events[0].parsedJson);
}

call();

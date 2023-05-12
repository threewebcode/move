const {JsonRpcProvider, RawSigner, Ed25519Keypair, TransactionBlock} = require("@mysten/sui.js");

const provider = new JsonRpcProvider();
const mnemonics = "stereo cattle target shoulder orbit tiny clown twin input phone green lake";
const keypair = Ed25519Keypair.deriveKeypair(mnemonics);
const signer = new RawSigner(keypair, provider);

const main = async () => {
    const tx = new TransactionBlock();
    // const result = await signer.dryRunTransactionBlock({
    //     transactionBlock: tx
    // });
    // console.log(result);
    // const result = await signer.devInspectTransactionBlock({
    //     transactionBlock: tx,
    //     sender: signer.getAddress()
    // })
    // console.log(result);
    const result = await signer.signAndExecuteTransactionBlock({
        transactionBlock: tx
    })
    console.log(result);
}

main();
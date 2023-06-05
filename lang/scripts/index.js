const { JsonRpcProvider, devnetConnection,TransactionBlock, Ed25519Keypair, RawSigner, testnetConnection } = require("@mysten/sui.js");

function getProvider() {
    return new JsonRpcProvider(
        devnetConnection
        // testnetConnection
    );
}

function getKeyPair() {
    return Ed25519Keypair.generate();
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

async function getGasObjectsOwnedByAddress(address, provider) {
    const objects = await provider.getOwnedObjects({
        owner: address,
        options: {
            showType: true,
            showContent: true,
            showOwner: true,
        },
    });
    return objects.data.filter((obj) => Coin.isSUI(obj));
}


async function faucet(address, provider) {
    const resp = await provider.requestSuiFromFaucet(address);
    console.log(resp);
}

async function call(target) {
    const tx = new TransactionBlock();
    const signer = getSigner(keypair, provider);
    tx.moveCall({
        target: target,
        typeArguments: [],
        arguments: [],
    });
    const txn = await signer.signAndExecuteTransactionBlock({
    transactionBlock: tx,
    options: {
      showEffects: true,
      showObjectChanges: true,
    },
  });
  return txn;
}

async function info(provider) {
    let info = await provider.getRpcApiVersion();
    console.log("info", info);
}

//const mnemonics = "stereo cattle target shoulder orbit tiny clown twin input phone green lake";

const mnemonics = "path dawn point mass hollow surge identify pet velvet hover bar soccer";
const keypair = deriveKeyPair(mnemonics);
const address = getAddress(keypair);
const provider = getProvider();
info(provider);
// faucet(address, provider);
console.log("debug message", address);
// address = "0x84c123fcd0e19ddd994c22f21d3e2074fe2b6f5fe9fb9c8871ae6eaf8a8b7931";
// console.log("testnet message", address);
// faucet(address, provider);
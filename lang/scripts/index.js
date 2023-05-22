const { JsonRpcProvider, Connection, devnetConnection,TransactionBlock, Ed25519Keypair, RawSigner } = require("@mysten/sui.js");

const DEFAULT_FAUCET_URL = devnetConnection.faucet;
const DEFAULT_FULLNODE_URL = devnetConnection.fullnode;
const DEFAULT_GAS_BUDGET = 10000000;

function getProvider() {
    return new JsonRpcProvider(
        new Connection({
            fullnode: DEFAULT_FULLNODE_URL,
            faucet: DEFAULT_FAUCET_URL,
        }),
        {},
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

//const mnemonics = "stereo cattle target shoulder orbit tiny clown twin input phone green lake";
const mnemonics = "path dawn point mass hollow surge identify pet velvet hover bar soccer";
const keypair = deriveKeyPair(mnemonics);
const address = getAddress(keypair);
const provider = getProvider();
faucet(address, provider);
console.log("debug message", address);
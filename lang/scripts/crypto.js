const { Ed25519Keypair } = require("@mysten/sui.js");
const { fromB64 } = require('@mysten/bcs');

//const mnemonics = "stereo cattle target shoulder orbit tiny clown twin input phone green lake";
const mnemonics = "path dawn point mass hollow surge identify pet velvet hover bar soccer";
const keypair = Ed25519Keypair.deriveKeypair(mnemonics);
console.log(keypair.getPublicKey().toSuiAddress());
let privateKey = "0x" + Buffer.from(fromB64(keypair.export().privateKey)).toString("hex");
console.log(privateKey);
let kp = Ed25519Keypair.fromSecretKey(Buffer.from(privateKey.slice(2), "hex"), { skipValidation: true });
console.log("sui address: " + kp.getPublicKey().toSuiAddress());


const { MerkleTree } = require('merkletreejs');
const SHA256 = require('crypto-js/sha256');
const fs = require("fs/promises");

const demo = async () => {
    const leaves = ['a', 'b', 'c'].map(x => SHA256(x));
    const tree = new MerkleTree(leaves, SHA256);
    const root = tree.getRoot().toString('hex');
    console.log(root);
    const leaf = SHA256('a');
    const proof = tree.getProof(leaf);
    console.log(leaf.toString());
    console.log(tree.verify(proof, leaf, root));
    console.log(tree.toString());
}

const test = async () => {
    let data = await fs.readFile("data/list.json").then((rawData) => JSON.parse(rawData));
    console.log(data);
}

test();





